const ToDo = require("../models/todoData");
const CompletedToDo = require("../models/completedTodos");
const { catchAsyncErrors } = require("../utils/catchAsyncErrors");

/////////////////// ROUTES ///////////////////////

// GET: Render Index Page (All to-dos)
module.exports.renderAlltodos = catchAsyncErrors(async (req, res) => {
    const todos = await ToDo.find({ author: { _id: req.user._id } });

    res.render("todos/index", { todos });
});

// POST: Create new to-do
module.exports.createTodo = catchAsyncErrors(async (req, res) => {
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
});

// PUT: Update selected to-do
module.exports.updateTodo = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;

    await ToDo.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });

    req.flash("success", "To-do successfully updated!");
    res.redirect("/todos");
});
