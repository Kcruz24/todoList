const { todoJoiSchema, completedTodoJoiSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");

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

module.exports.validateTodos = (req, res, next) => {
    const { error } = todoJoiSchema.validate(req.body);
    const succes = !error;

    if (succes) {
        next();
    } else if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
};

module.exports.validateCompletedTodos = (req, res, next) => {
    const { error } = todoJoiSchema.validate(req.body);
    const succes = !error;

    if (succes) {
        next();
    } else if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
};
