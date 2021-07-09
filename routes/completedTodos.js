const express = require("express");
const router = express.Router();

const {
    isLoggedIn,
    validateTodos,
    validateCompletedTodos
} = require("../middleware");

const {
    renderCompletedTodos,
    updatedCompletedTodoField,
    deleteCompletedTodo
} = require("../controllers/completedTodos");

/////////////////// ROUTES ///////////////////////

// GET: Render completed to-do's
router.get(
    "/completedTodos",
    isLoggedIn,
    validateCompletedTodos,
    renderCompletedTodos
);

// POST: Update completed to-do field from false to true.
// DELETE: Selected to-do.
router
    .route("/:id")
    .post(
        isLoggedIn,
        validateTodos,
        validateCompletedTodos,
        updatedCompletedTodoField
    )
    .delete(isLoggedIn, validateCompletedTodos, deleteCompletedTodo);

module.exports = router;
