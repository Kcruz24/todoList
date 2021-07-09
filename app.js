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

// Routes
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const completedTodosRouter = require("./routes/completedTodos");

// Controllers
const { sessionConfig } = require("./controllers/users");

// Models
const User = require("./models/user");

// DB Connection
mongoose
    .connect("mongodb://localhost:27017/todoList", {
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

app.use("/todos", completedTodosRouter, todosRouter);
app.use("/", usersRouter);

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
const port = 3000;
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`);
});
