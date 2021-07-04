const express = require("express");
const route = express.Router();

route.get("/login", (req, res) => {

    res.render("auth/login");
});


route.get("/signup", (req, res) => {
    res.render("auth/signup");
})

module.exports = route;