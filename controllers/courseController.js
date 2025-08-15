const Course = require('../models/Course');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Create a new course (with optional first lesson video)
exports.createCourse = async (req, res) => {
  try {
    const courseData = JSON.parse(req.body.courseData || JSON.stringify(req.body));

    // Check if a video file is uploaded for the first lesson
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video'
      });
      fs.unlinkSync(req.file.path); // remove temp file

      // Attach the uploaded video URL to the first lesson (if exists)
      if (courseData.modules && courseData.modules[0]?.lessons) {
        courseData.modules[0].lessons[0].contentUrl = result.secure_url;
      }
    }

    const course = await Course.create(courseData);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update course
exports.updateCourse = async (req, res) => {
  try {
    const courseData = JSON.parse(req.body.courseData || JSON.stringify(req.body));


    // If a video is uploaded for update, attach to first lesson
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video'
      });
      fs.unlinkSync(req.file.path);

      if (courseData.modules && courseData.modules[0]?.lessons) {
        courseData.modules[0].lessons[0].contentUrl = result.secure_url;
      }
    }

    const course = await Course.findByIdAndUpdate(req.params.id, courseData, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
