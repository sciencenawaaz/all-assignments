const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config();


//impliment mongoDB

//MONGODB MODELS

//ADMIN MODEL

const ADMIN = new mongoose.Schema ({
  
  username : {type: String , required: true},
  password : {type: String , required: true}
  
})


const courseSchema = new mongoose.Schema ({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const AdminSchema = mongoose.model('ADMIN' , ADMIN);
const Course = mongoose.model("Course" ,  courseSchema);

//DB connect
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })
                                    .then(() => {console.log('Mongoose online')})
                                    .catch((err) => {console.log(err);});

//Authenticate JWT

const authenticateJwt = (req , res , next) => {
  const token = req.headers.token;
  if(token) {
    jwt.verify(token,  process.env.SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}


// Admin routes
app.post('/admin/signup',  (req, res) => {
  // logic to sign up admin
 let {username , password } = req.body;
 
 let adminSave = async (admin) => {
   if(admin)  return res.status(403).json({msg:"Admin already exists"})
   
  let user = {username ,  password};
  let newAdmin = new AdminSchema(user)
  await newAdmin.save();
  const token = jwt.sign({username} , process.env.SECRET , {expiresIn : '1h'});
  res.status(201).json({msg:"Admin created successfully", token});
 }

 AdminSchema.findOne({username}).then(adminSave);
 
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let username  = req.headers.username;
  let password  = req.headers.password;
  const user = AdminSchema.findOne({username ,  password});

  if( user ){

    const token = jwt.sign({username} , process.env.SECRET , {expiresIn : '1h'});

    return res.status(200).json({msg:"Admin LoggedIn" , token})
  }
   return res.status(403).json({msg:"Wrong Credentials"}) ;
});

app.post('/admin/courses', authenticateJwt , async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
 
  return res.status(201).json({msg:"Course created successfully" , courseId: course.id})
});

app.put('/admin/courses/:courseId',authenticateJwt , async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId , req.body , {new:true});
  if(course) {
      return res.json({msg:"Course Updated"});
  } else {
    return res.status(404).json({msg:"Course not found"});
  }
});

app.get('/admin/courses',authenticateJwt, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
    return res.json({courses});
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
