import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import DashBoard from "./DashBoard/DashBoard";
import Course from "./Course/Course";
import "./App.css";
import Signup from "./Sign Up/Signup";
import CoursePage from "./CoursePage/CoursePage";
import PaymentSuccess from "./PaymentSuccess/PaymentSuccess";
import CourseModule from "./CourseModule/CourseModule";
import axios from "axios";

export const Context = createContext({});
function App() {
  const [Loggedin, setLoggedin] = useState([]);
  console.log(Loggedin);

  // const [Loggedin, setLoggedin] = useContext(Context);

  const [Courses, setCourses] = useState([]);

  const fetchDataCourse = async () => {
    const response = await axios.get(
      `https://server-exceed-lms.onrender.com/ProgressRouter/${Loggedin.Email}`
    );
    return setCourses(response.data);
  };
  useEffect(() => {
    fetchDataCourse();
  }, [Loggedin.Email]);
  console.log(Courses);
  return (
    <div>
      <div>
        <Context.Provider value={[Loggedin, setLoggedin]}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="Login" element={<Login />}></Route>
            <Route
              path="/dashboard"
              element={<DashBoard Courses={Courses} />}
            ></Route>
            <Route path="Courses/:id" element={<Course />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="/:id" element={<CoursePage />}></Route>
            <Route
              path="coursemodule/:id"
              element={<CourseModule Courses={Courses} />}
            ></Route>
            <Route path="success" element={<PaymentSuccess />}></Route>
          </Routes>
        </Context.Provider>
      </div>
    </div>
  );
}

// export const Home = () => {
//   return <div>You are in Home page</div>;
// };
export const About = () => {
  return <div>This is the page where you put details about yourself</div>;
};
export const NotFound = () => {
  return <div>This is a 404 page</div>;
};

export default App;
