const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const mongoose = require("mongoose");
const ejs = require("ejs");
const methodOverride = require("method-override");

const ToDo = require("./models/todoData");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "partials")));

const dataExamples = [
    "Gym",
    "Clean Room",
    "Look for passport",
    "Go to sleep at 11:00pm"
];

app.get("/todos", async (req, res) => {
    console.log(req.query);
    const { todoData } = req.query;

    const todos = await ToDo.find({ todoData });

    res.render("todos/index", { todos, dataExamples });
});

app.get("/todos/new", (req, res) => {
    res.render("todos/new");
});

app.post("/todos", async (req, res) => {
    console.log("hola Post");
    console.log("This is req.body:", req.body);

    const newTodo = new ToDo(req.body);
    await newTodo.save();

    console.log(newTodo);
    res.redirect("/todos");
});

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;

    const todos = await ToDo.findById(id);
    console.log(todos);

    res.render("todos/show", { todos });
});

app.get("/todos/:id/edit", async (req, res) => {
    const { id } = req.params;

    const todos = await ToDo.findById(id);
    console.log(todos);

    res.render("todos/edit", { todos });
});

app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;

    const todos = await ToDo.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });

    console.log(req.body);
    res.redirect(`/todos/${todos._id}`);
});

app.delete("/todos/:id", async (req, res) => {
    const {id} = req.params;
    await ToDo.findByIdAndDelete(id);

    res.redirect("/todos")
})

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`);
});
