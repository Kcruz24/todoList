// While in development mode require dotenv
const onDevelopment = process.env.NODE_ENV !== "production";
if (onDevelopment) {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");

// Routes
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const completedTodosRouter = require("./routes/completedTodos");

// Models
const User = require("./models/user");
const { constants } = require("perf_hooks");

// DB Connection
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/todoList";
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("MONGOOSE CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH NO MONGOOSE CONNECTION ERROR!!!");
        console.log(err);
    });

// Config //
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

/////////////////// AUTH ///////////////////
// Session //
const secret = process.env.SECRET || "thisshouldbeasecret";

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store,
    name: "session",
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //                    ms     s    m    h   d
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
};

app.use(session(sessionConfig));

// Passport //
app.use(passport.initialize());
app.use(passport.session());

// // Use username and password to auth
passport.use(new LocalStrategy(User.authenticate()));

// // Serialization refers to how do we store a user in a session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//////////////// MIDDLEWARES ///////////////////

// Handle Common Security issues //
app.use(
    mongoSanitize({
        replaceWith: "_"
    })
);

// Helmet
app.use(helmet({ contentSecurityPolicy: false }));

app.use(flash());

// Locals //
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});

/////////////////// ROUTES ////////////////////
// Home
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/", usersRouter);
app.use("/todos", todosRouter, completedTodosRouter);

/////////////// ERROR HANDLERS ////////////////////
// Detect unknown routes
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// Basic error handling //
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    const noErrorMessage = !err.message;

    if (noErrorMessage) {
        err.message = "Se jodio algo aqui.";
    }

    res.status(statusCode).render("error", { err });
});

/////////////////// PORT ////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`);
});
