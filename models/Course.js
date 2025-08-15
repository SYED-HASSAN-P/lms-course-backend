const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'pdf', 'text'], required: true },
  contentUrl: { type: String, required: true },
  duration: { type: Number, required: true } // in minutes
});

const QuizQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ['mcq', 'true_false'], required: true },
  options: [String],
  correctAnswer: { type: String, required: true }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  passingScore: { type: Number, required: true },
  questions: [QuizQuestionSchema]
});

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  sequence: { type: Number, required: true },
  lessons: [LessonSchema],
  quizzes: [QuizSchema]
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true }, // total hours
  modules: [ModuleSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
