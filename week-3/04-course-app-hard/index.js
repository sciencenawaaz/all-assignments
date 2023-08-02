const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config();
//impliment mongoDB
let ADMINS = [];
let USERS = [];
let COURSES = [];


//MONGODB MODELS

//ADMIN MODEL

const ADMIN = new mongoose.Schema ({
  
  username : {type: String , required: true},
  password : {type: String , required: true}
  
})

const AdminSchema = mongoose.model('ADMIN' , ADMIN);

//DB connect
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })
                                    .then(() => {console.log('Mongoose online')})
                                    .catch((err) => {console.log(err);});

// Admin routes
app.post('/admin/signup',  (req, res) => {
  // logic to sign up admin
 let {username , password } = req.body;
 
 let adminSave = async (admin) => {
   if(admin)  return res.status(403).json({msg:"Admin already exists"})
   
  let user = {username ,  password};
  let newAdmin = new AdminSchema(user)
  await newAdmin.save();
  res.status(201).json({msg:"Admin created successfully"});
 }

 AdminSchema.findOne({username}).then(adminSave);
 
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let username  = req.headers.username;
  let password  = req.headers.password;
  let user = {username ,  password};
  let exists = userExists(user);
  let verify = userVerify(password);
  if(exists && verify ) return res.status(200).json({msg:"Admin LoggedIn"})
   return res.status(403).json({msg:"Wrong Credentials"}) ;
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
