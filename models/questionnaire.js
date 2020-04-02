const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: String,
    input: Object,
}, {timestamps: true});

const QuestionnaireSchema = new mongoose.Schema({
    type: { type: String, enum: ['daily', 'one_time'], required: true},
    questions: [QuestionSchema]
}, {timestamps: true});

exports.Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema);
exports.Question = mongoose.model("Question", QuestionSchema);