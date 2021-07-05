const passport = require("passport");

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
