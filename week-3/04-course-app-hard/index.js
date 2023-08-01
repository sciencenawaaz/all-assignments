const express = require('express');
const app = express();

app.use(express.json());
//impliment mongoDB
let ADMINS = [];
let USERS = [];
let COURSES = [];

let userExists = (user) => {
  
  let exists = ADMINS.filter((u) => u.username === user.username);

  if(exists[0]) return true;
  return false;
}
let userVerify = (password) => {
  
  let exists = ADMINS.filter((u) => u.password === password);

  if(exists[0]) return true;
  return false;
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
 let {username , password } = req.body;
 let user = {username ,  password};
 let exists = userExists(user);
if(exists){ return res.status(403).json({msg:"User already exists"})}
 ADMINS.push(user);
 res.status(201).json(ADMINS);
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
