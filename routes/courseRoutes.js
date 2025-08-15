const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

router.post('/', createCourse);        // Create course
router.get('/', getCourses);           // Get all courses
router.get('/:id', getCourseById);     // Get single course
router.put('/:id', updateCourse);      // Update course
router.delete('/:id', deleteCourse);   // Delete course

const upload = multer({ dest: 'uploads/' }); // temporary storage

router.post('/upload-video', upload.single('video'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video"
    });

    fs.unlinkSync(req.file.path); // delete temp file

    res.json({ videoUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
