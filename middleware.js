module.exports.isLoggedIn = (req, res, next) => {
    const authenticated = req.isAuthenticated();

    if (authenticated) {
        next();
    } else {
        // Return to the requested page after signing in.
        req.session.returnTo = req.originalUrl;

        req.flash("error", "You Must Be Signed In!");
        return res.redirect("/login");
    }
};
