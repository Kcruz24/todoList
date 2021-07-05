const express = require("express");
const route = express.Router();
const ToDo = require("../models/todoData");
const { isLoggedIn } = require("../middleware");

// READ: Show index page where all the To-Do's are listed
route.get("/", isLoggedIn, async (req, res) => {
    console.log(req.query);
    const { todoData } = req.query;

    console.log("REQ BODY: => ", req.body);

    const todos = await ToDo.find({ todoData });

    res.render("todos/index", { todos });
});

// CREATE: New To-Do
// Save new to-do created in the database
route.post("/", isLoggedIn, async (req, res) => {
    const newTodo = new ToDo(req.body);
    await newTodo.save();

    console.log(newTodo);
    res.redirect("/");
});

// UPDATE: Selected to-do
route.put("/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;

    await ToDo.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });

    console.log(req.body);
    res.redirect("/");
});

// DELETE: Selected to-do
route.delete("/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await ToDo.findByIdAndDelete(id);

    res.redirect("/");
});

module.exports = route;
