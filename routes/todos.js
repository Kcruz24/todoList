const express = require("express");
const route = express.Router();
const ToDo = require("../models/todoData");
const { isLoggedIn } = require("../middleware");
const { catchAsyncErrors } = require("../utils/catchAsyncErrors");

// READ: Show index page where all the To-Do's are listed based on the user logged in
route.get("/", isLoggedIn, async (req, res) => {
    const todos = await ToDo.find({ author: { _id: req.user._id } });

    res.render("todos/index", { todos });
});

// CREATE: New To-Do
// Save new to-do created in the database
route.post(
    "/",
    isLoggedIn,
    catchAsyncErrors(async (req, res) => {
        const newTodo = new ToDo(req.body);
        newTodo.author = req.user._id;

        await newTodo.save();

        console.log(newTodo);
        res.redirect("/todos");
    })
);

// UPDATE: Selected to-do
route.put(
    "/:id",
    isLoggedIn,
    catchAsyncErrors(async (req, res) => {
        const { id } = req.params;

        await ToDo.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        });

        console.log(req.body);

        req.flash("success", "To-do successfully updated!");
        res.redirect("/todos");
    })
);

// DELETE: Selected to-do
route.delete(
    "/:id",
    isLoggedIn,
    catchAsyncErrors(async (req, res) => {
        const { id } = req.params;
        const todoData = await ToDo.findById(id);

        await ToDo.findByIdAndDelete(id);

        console.log("Data:", todoData);
        req.flash("success", `${todoData.data} successfully deleted`);
        res.redirect("/todos");
    })
);

module.exports = route;
