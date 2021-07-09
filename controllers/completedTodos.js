const ToDo = require("../models/todoData");
const CompletedToDo = require("../models/completedTodos");
const { catchAsyncErrors } = require("../utils/catchAsyncErrors");

/////////////////// ROUTES ///////////////////////

// GET: Render completed to-dos
module.exports.renderCompletedTodos = catchAsyncErrors(async (req, res) => {
    const todos = await CompletedToDo.find({
        author: { _id: req.user._id }
    });

    res.render("todos/completedTodos", { todos });
});

// POST: Update the boolean completed to-do field from false to true.
module.exports.updatedCompletedTodoField = catchAsyncErrors(
    async (req, res) => {
        const { id } = req.params;
        const todo = await ToDo.findById(id);

        await CompletedToDo.findOneAndUpdate(
            { data: todo.data },
            { $set: { completed: true } }
        );

        await ToDo.findByIdAndDelete(id);

        req.flash("success", `${todo.data} successfully completed!`);
        res.redirect("/todos");
    }
);

// DELETE: Selected to-do
module.exports.deleteCompletedTodo = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const todoData = await CompletedToDo.findById(id);

    await CompletedToDo.findByIdAndDelete(id);

    req.flash("success", `${todoData.data} successfully deleted`);
    res.redirect("/todos/completedTodos");
});
