const express = require("express");
const { authenticate } = require("../controllers/users");
const route = express.Router();
const User = require("../models/user");
const { catchAsyncErrors } = require("../utils/catchAsyncErrors");

// GET: Render login
route.get("/login", (req, res) => {
    res.render("auth/login");
});

route.post("/login", authenticate, (req, res) => {
    const redirectUrl = req.session.returnTo || "/todos";

    delete req.session.returnTo;

    req.flash("success", `Welcome ${req.user.username}!`);
    res.redirect(redirectUrl);
});

// GET: Render signup
route.get("/signup", (req, res) => {
    res.render("auth/signup");
});

// POST: Create user
route.post("/signup", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ email, username });

        const registeredUser = await User.register(user, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash(
                "success",
                `Thanks for signing up ${username}! Hope you enjoy your new to-do list!`
            );
            res.redirect("/todos");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

route.get("/logout", (req, res) => {
    req.logout();

    req.flash("success", "Successfully logged out");
    res.redirect("/login");
});

module.exports = route;
