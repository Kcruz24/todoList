const express = require("express");
const route = express.Router();
const ToDo = require("../models/todoData");
const CompletedToDo = require("../models/completedTodos");
const { catchAsyncErrors } = require("../utils/catchAsyncErrors");

const {
    isLoggedIn,
    validateTodos,
    validateCompletedTodos
} = require("../middleware");

// GET: Render completed to-do's
route.get(
    "/completedTodos",
    isLoggedIn,
    validateCompletedTodos,
    catchAsyncErrors(async (req, res) => {
        const todos = await CompletedToDo.find({
            author: { _id: req.user._id }
        });

        console.log("REQUEST: ", req.path);

        res.render("todos/completedTodos", { todos });
    })
);

// ADD completed todo field
route.post(
    "/:id",
    isLoggedIn,
    validateTodos,
    validateCompletedTodos,
    catchAsyncErrors(async (req, res) => {
        const { id } = req.params;
        const todo = await ToDo.findById(id);

        await CompletedToDo.findOneAndUpdate(
            { data: todo.data },
            { $set: { completed: true } }
        );

        await ToDo.findByIdAndDelete(id);

        req.flash("success", `${todo.data} successfully completed!`);
        res.redirect("/todos");
    })
);

// DELETE: Selected to-do
route.delete(
    "/:id",
    isLoggedIn,
    validateCompletedTodos,
    catchAsyncErrors(async (req, res) => {
        const { id } = req.params;
        const todoData = await CompletedToDo.findById(id);

        await CompletedToDo.findByIdAndDelete(id);

        console.log("Data:", todoData);
        req.flash("success", `${todoData.data} successfully deleted`);
        res.redirect("/todos/completedTodos");
    })
);

module.exports = route;
