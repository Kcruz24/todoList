const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ToDo = require("./models/todoData");
const ejsMate = require("ejs-mate");

mongoose
    .connect("mongodb://localhost:27017/todoList", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MONGOOSE CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH NO MONGOOSE CONNECTION ERROR!!!");
        console.log(err);
    });

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// READ: Show index page where all the To-Do's are listed
app.get("/todos", async (req, res) => {
    console.log(req.query);
    const { todoData } = req.query;

    const todos = await ToDo.find({ todoData });

    res.render("todos/index", {todos});
});

// CREATE: New To-Do's
app.get("/todos/new", (req, res) => {
    res.render("todos/new");
});

// Save new to-do created in the database
app.post("/todos", async (req, res) => {
    console.log("hola Post");
    console.log("This is req.body:", req.body);

    const newTodo = new ToDo(req.body);
    await newTodo.save();

    console.log(newTodo);
    res.redirect("/todos");
});

// Show edit page of a single to-do
app.get("/todos/:id/edit", async (req, res) => {
    const { id } = req.params;

    const todos = await ToDo.findById(id);
    console.log(todos);

    res.render("todos/edit", { todos });
});

// UPDATE: Selected to-do
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;

    await ToDo.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });

    console.log(req.body);
    res.redirect("/todos");
});

// DELETE: Selected to-do
app.delete("/todos/:id", async (req, res) => {
    const {id} = req.params;
    await ToDo.findByIdAndDelete(id);

    res.redirect("/todos")
})

const port = 3000;
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`);
});
