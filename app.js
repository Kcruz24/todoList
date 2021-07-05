const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const { sessionConfig } = require("./controllers/users");

// Models
const User = require("./models/user");

// DB Connection
mongoose
    .connect("mongodb://localhost:27017/todoList", {
        useNewUrlParser: true,
        useUnifiedTopology: true
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

//////////////// AUTH ///////////////////
// Session //
app.use(session(sessionConfig));

// Passport //
app.use(passport.initialize());
app.use(passport.session());

// // Use username and passsword to auth
passport.use(new LocalStrategy(User.authenticate()));

// // Serialization refers to how do we store a user in a session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes //
app.use("/", todosRouter);
app.use("/", usersRouter);

// Port //
const port = 3000;
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`);
});
