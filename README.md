# lms-course-backend


LMS Backend Setup Guide
Project Overview

This backend handles the Course section of a Learning Management System (LMS), including:

Course CRUD (Create, Read, Update, Delete)

Modules, Lessons, and Quizzes

Lesson video uploads to Cloudinary

Tech stack:

Node.js + Express

MongoDB (Atlas or local)

Cloudinary (for video hosting)

Multer (file upload middleware)

1️⃣ Prerequisites

Node.js installed (Download Node.js)

npm installed (comes with Node.js)

MongoDB Atlas account or local MongoDB server (MongoDB Download)

Cloudinary account (Sign up Cloudinary)

2️⃣ Clone the Project
git clone <your-repo-url>
cd <project-folder>

3️⃣ Install Dependencies
npm install


Dependencies used:

express → Server framework

mongoose → MongoDB ODM

dotenv → Environment variables

multer → File uploads

cloudinary → Video storage

nodemon → Auto-restart server during development

4️⃣ Environment Variables

Create a .env file in the project root:

# Server Port
PORT=5000

# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://<your_mongo_user>:<your_mongo_password>@<your_cluster>.mongodb.net/<your_db_name>?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUD_NAME=<your_cloud_name>
CLOUD_API_KEY=<your_api_key>
CLOUD_API_SECRET=<your_api_secret>


Notes:

Replace placeholders with actual values from MongoDB Atlas and Cloudinary.

For MongoDB passwords with special characters, use URL encoding:

@ → %40

# → %23

$ → %24

5️⃣ MongoDB Setup
Option 1: MongoDB Atlas

Create an account → MongoDB Atlas

Create a cluster → free tier is fine

Create a database and user with password

Whitelist your IP or allow access from anywhere (for testing)

Copy connection string → replace in .env

Option 2: Local MongoDB

Install MongoDB Community Edition

Start MongoDB service (mongod)

Use connection string:

MONGO_URI=mongodb://localhost:27017/lms

6️⃣ Cloudinary Setup

Sign up → Cloudinary

Go to Dashboard → API Environment Variables

Copy cloud_name, api_key, api_secret → add to .env

Test connection with script:

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

cloudinary.api.ping()
  .then(() => console.log('✅ Cloudinary connected'))
  .catch(err => console.error('❌ Cloudinary error:', err.message));

7️⃣ Running the Server
nodemon server.js


If everything is correct, you should see:

✅ MongoDB Connected
✅ Server running on port 5000

8️⃣ API Endpoints
Method	URL	Body
POST	/api/courses	form-data: lessonVideo (file), courseData (JSON string)
GET	/api/courses	None
GET	/api/courses/:id	None
PUT	/api/courses/:id	form-data: lessonVideo (optional), courseData (JSON string)
DELETE	/api/courses/:id	None
9️⃣ Testing

Use Postman or Thunder Client

Send form-data for course creation and updates

Check MongoDB to see the saved courses

Cloudinary will host uploaded lesson videos; contentUrl in lessons will store the video link

10️⃣ Notes

Lesson.contentUrl is required for video lessons. Backend can attach the URL automatically after uploading.

For multiple lessons or modules, extend the JSON structure in courseData.

Keep .env secure — never push to GitHub with real credentials.

This README covers MongoDB, Cloudinary, Node setup, dependencies, environment variables, and API testing.
