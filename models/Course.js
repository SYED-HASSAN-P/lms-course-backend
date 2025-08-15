const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: String,
    type: { type: String, enum: ['video', 'pdf', 'text'] },
    contentUrl: String,
    duration: Number
});

const QuizQuestionSchema = new mongoose.Schema({
    questionText: String,
    questionType: { type: String, enum: ['mcq', 'true_false'] },
    options: [String],
    correctAnswer: String
});

const QuizSchema = new mongoose.Schema({
    title: String,
    passingScore: Number,
    questions: [QuizQuestionSchema]
});

const ModuleSchema = new mongoose.Schema({
    title: String,
    description: String,
    sequence: Number,
    lessons: [LessonSchema],
    quizzes: [QuizSchema]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    startDate: Date,
    endDate: Date,
    modules: [ModuleSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
