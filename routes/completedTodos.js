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
router
    .route("/:id")
    .post(
        isLoggedIn,
        validateTodos,
        validateCompletedTodos,
        updatedCompletedTodoField
    );

// Delete completed to-do's
router.delete(
    "/completedTodos/:id",
    isLoggedIn,
    validateCompletedTodos,
    deleteCompletedTodo
);

module.exports = router;
