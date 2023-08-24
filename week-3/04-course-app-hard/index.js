const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
app.use(express.json());
app.use(cors());
dotenv.config();


//impliment mongoDB

//MONGODB MODELS

//ADMIN MODEL

const ADMIN = new mongoose.Schema ({
  
  username : {type: String , required: true},
  password : {type: String , required: true}
  
})
const userSchema = new mongoose.Schema ({
  
  username : {type: String , required: true},
  password : {type: String , required: true},
  purchasedCourses : [{type : mongoose.Schema.Types.ObjectId , ref : 'Course'}]
  
})


const courseSchema = new mongoose.Schema ({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const AdminSchema = mongoose.model('ADMIN' , ADMIN);
const User = mongoose.model('User' , userSchema);
const Course = mongoose.model("Course" ,  courseSchema);

//DB connect
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })
                                    .then(() => {console.log('Mongoose online')})
                                    .catch((err) => {console.log(err);});

//Authenticate JWT

const authenticateJwt = (req , res , next) => {
  
  const token = req.headers.authorization;
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

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  let username  = req.headers.username;
  let password  = req.headers.password;
  const user = await AdminSchema.findOne({username ,  password});

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
  let {username , password } = req.body;
 
 let userSave = async (admin) => {
   if(admin)  return res.status(403).json({msg:"User already exists"})
   
  let user = {username ,  password};
  let newUser = new User(user)
  await newUser.save();
  const token = jwt.sign({username} , process.env.SECRET , {expiresIn : '1h'});
  res.status(201).json({msg:"User created successfully", token});
 }

 User.findOne({username}).then(userSave);
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  let username  = req.body.username;
  let password  = req.body.password;
  const user = await User.findOne({username ,  password});

  if( user ){

    const token = jwt.sign({username} , process.env.SECRET , {expiresIn : '1h'});

    return res.status(200).json({msg:"User LoggedIn" , token})
  }
   return res.status(403).json({msg:"Wrong Credentials"}) ;
});

app.get('/users/courses', async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({});
    return res.json({courses});
});

app.post('/users/courses/:courseId',authenticateJwt ,  async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if(course) {
    const user = await User.findOne({username : req.user.username})
    if(user){
      user.purchasedCourses.push(course)
      await user.save();
      return res.json({ message: 'Course purchased successfully' });
    } else {
      return res.status(403).json({ message: 'User not found' });
    } 
  } else {
    return res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses',authenticateJwt , async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({username : req.user.username}).populate('purchasedCourses');
  if (user) {
    return res.json({PurchasedCourses : user.purchasedCourses || []})
  }
  return res.status(403).json({msg : "User not found"});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
