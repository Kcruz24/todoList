const mongoose = require("mongoose");

const todoDataSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
});

// Compiling model
const ToDo = mongoose.model("ToDo", todoDataSchema);

// exporting model so it can be used somewhere else
module.exports = ToDo;