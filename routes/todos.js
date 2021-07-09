const express = require("express");
const router = express.Router();

const {
    isLoggedIn,
    validateTodos,
    validateCompletedTodos
} = require("../middleware");

const {
    renderAlltodos,
    createTodo,
    updateTodo
} = require("../controllers/todos");

/////////////////// ROUTES ///////////////////////

// READ (GET): Show index page where all the To-Do's are listed based on the user logged in
// CREATE (POST): New To-Do
router
    .route("/")
    .get(isLoggedIn, renderAlltodos)
    .post(isLoggedIn, validateTodos, validateCompletedTodos, createTodo);

// UPDATE: Selected to-do
router.put("/:id", isLoggedIn, validateTodos, updateTodo);

module.exports = router;
