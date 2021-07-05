const express = require("express");
const { authenticate } = require("../controllers/users");
const route = express.Router();
const User = require("../models/user");

// GET: Render login
route.get("/login", (req, res) => {
    res.render("auth/login");
});

route.post("/login", authenticate, (req, res) => {
    const redirectUrl = req.session.returnTo || "/";

    delete req.session.returnTo;
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

            res.redirect("/");
        });
    } catch (e) {
        res.redirect("/signup");
    }
});

route.get("/logout", (req, res) => {
    res.send("<h1>LOGGED OUT!</h1>");
});

route.post("/logout", (req, res) => {
    req.logout();

    res.redirect("/");
});

module.exports = route;
