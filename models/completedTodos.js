const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const completedTodoSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    author: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    completed: {
        type: Boolean,
        default: false
    }
});

// Compiling model
const CompletedToDo = mongoose.model("CompletedToDo", completedTodoSchema);

// exporting model so it can be used somewhere else
module.exports = CompletedToDo;
