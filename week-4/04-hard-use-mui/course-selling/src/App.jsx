import { BrowserRouter,Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Course, Courses, Login, Purchased, SignUp, Test } from "./pages/";



function App() {

  return (
   <BrowserRouter>
     <Routes>
       <Route path ="/" element = {<Login/>} />
       <Route path ="/signup" element = {<SignUp/>} />
       <Route path ="/courses" element = {<Courses/>} />
       <Route path ="/course/:id" element = {<Course/>} />
       <Route path ="/courses/purchased" element = {<Purchased/>} />
       <Route path ="/test" element = {<Test/>} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
