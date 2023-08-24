import React from 'react';
import { useState } from 'react';
import axios from 'axios';


const Test = (props) => {
  let x = 0;
  async function getCourses() {
     x++
    const Data = await axios.get("http://localhost:3000/users/courses");
    const Courses = Data.data;
    // console.log(Courses.courses[x].title);
    const Course = Courses.courses[x];
    console.log(Course);
    setCourse(Course._id);
    setDescription(Course.description);
     return 
  }
  
  const [Course, setCourse] = useState("None");
  const [Description , setDescription] = useState("None-Description");
  
  return (
    <>
      <h1>{Course}</h1>
      <p>{Description}</p>
      <button onClick={getCourses} >Click Me</button>
    </>
)
}

export default Test