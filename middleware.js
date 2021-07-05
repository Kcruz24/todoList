module.exports.isLoggedIn = (req, res, next) => {
    const authenticated = req.isAuthenticated();

    if (authenticated) {
        next();
    } else {
        // Return to the requested page after signing in.
        req.session.returnTo = req.originalUrl;

        // res.send("<h1>You must be signed in first!</h1>");
        res.redirect("/");
    }
};
