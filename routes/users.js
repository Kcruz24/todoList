const express = require("express");
const router = express.Router();

const {
    authenticate,
    pageBeforeLogin,
    renderLogin,
    renderSignup,
    createUser,
    logout
} = require("../controllers/users");

/////////////////// ROUTES ///////////////////////

// GET: Render login & send back to last page before login
router.route("/login").get(renderLogin).post(authenticate, pageBeforeLogin);

// GET: Render signup
// POST: Create user
router.route("/signup").get(renderSignup).post(createUser);

// GET: Logout user
router.get("/logout", logout);

module.exports = router;
