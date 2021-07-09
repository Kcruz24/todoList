const Joi = require("joi");

// Validate todo schema before attemting to save it with mongoose
module.exports.todoJoiSchema = Joi.object({
    data: Joi.string()
});

module.exports.completedTodoJoiSchema = Joi.object({
    data: Joi.string()
});
