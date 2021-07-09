const passport = require("passport");
const User = require("../models/user");
const { catchAsyncErrors } = require("../utils/catchAsyncErrors");

///////////////// MIDDLEWARE //////////////////////
module.exports.sessionConfig = {
    name: "session",
    secret: "shouldbeabettersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        //                    ms     s    m    h   d
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
};

module.exports.authenticate = passport.authenticate("local", {
    failureFlash: false,
    failureRedirect: "/login"
});

///////////////// ROUTES //////////////////////

// GET: Render login page
module.exports.renderLogin = (req, res) => {
    res.render("auth/login");
};

// POST: Send back user to the last page he was before login
module.exports.pageBeforeLogin = (req, res) => {
    const redirectUrl = req.session.returnTo || "/todos";

    delete req.session.returnTo;

    req.flash("success", `Welcome ${req.user.username}!`);
    res.redirect(redirectUrl);
};

// GET: Render signup page
module.exports.renderSignup = (req, res) => {
    res.render("auth/signup");
};

// POST: Create user
module.exports.createUser = catchAsyncErrors(async (req, res) => {
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

// GET: Logout user
module.exports.logout = (req, res) => {
    req.logout();

    req.flash("success", "Successfully logged out");
    res.redirect("/");
};
