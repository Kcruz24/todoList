const express = require("express");
const route = express.Router();
const ToDo = require("../models/todoData");
const CompletedToDo = require("../models/completedTodos");
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
        const completedTodo = new CompletedToDo(req.body);
        newTodo.author = req.user._id;
        completedTodo.author = req.user._id;

        if (newTodo.data.length > 0) {
            await newTodo.save();
            await completedTodo.save();

            return res.redirect("/todos");
        } else {
            req.flash("error", "Can't add an empty to-do! Try Again!");
            return res.redirect("/todos");
        }
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

        req.flash("success", "To-do successfully updated!");
        res.redirect("/todos");
    })
);

module.exports = route;
