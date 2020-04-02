const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    question: String,
    answer: Boolean || [String],
}, {timestamps: true});

const AnswersSchema = new mongoose.Schema({
    type: { type: String, enum: ['daily', 'one_time'], required: true},
    answers: [AnswerSchema]
}, {timestamps: true});

exports.Answers = mongoose.model("Answers", AnswersSchema);
exports.Answer = mongoose.model("Answer", AnswerSchema);