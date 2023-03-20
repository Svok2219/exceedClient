import React, { useContext, useEffect, useState } from "react";
import HeroFooter from "../Asset/Footer";
import Navbar from "../Asset/Navbar";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useParams } from "react-router-dom";
import { Context } from "../App";
import axios from "axios";

const DashBoard = ({ Courses }) => {
  // const params = useParams();
  // console.log(params.id);
  const [Loggedin, setLoggedin] = useContext(Context);

  // const [Courses, setCourses] = useState([]);

  // const fetchDataCourse = async () => {
  //   const response = await axios.get(
  //     `http://localhost:5000/ProgressRouter/${Loggedin.Email}`
  //   );
  //   return setCourses(response.data);
  // };
  // useEffect(() => {
  // fetch(`http://localhost:5000/ProgressRouter/${Loggedin.Email}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data);
  //     setCourses(data);
  //   });
  // }, []);
  // console.log(Courses);
  return (
    <div>
      <Navbar />

      <section
        style={{ backgroundColor: "#F58634" }}
        className="my-5 px-5 py-3"
      >
        <div className="row justify-content-center align-items-center mx-5 ">
          <div className="col-md-2">
            <img src="163827.png" className="circler bg-white  w-100 m-2" />
          </div>
          <div className="col-md-8 text-left text-light">
            <h3 className="font-weight-bold">Student Name</h3>
            <h5 className="my-3">
              Student ID: <span>{Loggedin ? Loggedin.UName : ""}</span>
            </h5>
            <h5 className="my-3">
              Class: <span>{Loggedin ? Loggedin.Class : ""}</span>
            </h5>
            <h5>
              Course Assigned: <span>3</span>
            </h5>
          </div>
          <div className="col-md-2 text-center text-light">
            <h2>
              <u>Achievements</u>
            </h2>
            <h5 className="my-3">
              Points: <span>{Loggedin ? Loggedin.Points : ""}</span>
            </h5>
            <h5 className="my-3">
              <u>BADGES</u>
            </h5>
            <img src="images.jpg" className="w-50 img-fluid circler" />
          </div>
        </div>
      </section>

      <section className="my-3 mx-5">
        <div className="row gap-5 justify-content-center align-items-center">
          <div
            className="col-md-3 text-center text-light py-3 px-1 overflow-hidden"
            style={{ backgroundColor: "#F58634" }}
          >
            <h2 className="my-3">
              <b>Exceed Robotics LMS</b>
            </h2>
            <h5 className="my-3 mx-3">
              Wellcome to Exceed Robotics LMS.src\DashBoard DashBoard.js Line
              16:13: img elements must have an alt prop, either with meaningful
              text, or an empty string for decorative images jsx-a11y/alt-text
              Line 40:13: img elements must have an alt prop, either with
              meaningful text, or an empty string for decorative images
              jsx-a11y/alt-text
            </h5>
            <div className="btn btn-light px-5 my-3 py-2 font-weight-bold">
              Talk With Us
            </div>
            <h6 className="text-light">
              <u>Report a Problem</u>
            </h6>
          </div>

          <div className="col-md-8">
            {Courses.length > 0
              ? Courses.map((Courses) => (
                  <div
                    className="  px-4 py-3 text-black my-"
                    style={{ backgroundColor: "#FBCBA8", borderRadius: "12px" }}
                  >
                    <div>
                      <h1>
                        <b> {Courses ? Courses.CourseID.Title : "no title"}</b>
                      </h1>
                      <h6>
                        <>
                          {" "}
                          {Courses
                            ? Courses.CourseID.description
                            : "no description"}
                        </>
                      </h6>

                      <div className="row mt-4 justify-content-center align-items-center">
                        <div className="col-md-2 d-flex ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            class="bi bi-clock-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                          </svg>
                          <span className="ml-2">
                            <b>
                              {Courses
                                ? Courses.CourseID.Duration
                                : "no Duration"}
                            </b>
                          </span>
                        </div>
                        <div className="col-md-3  d-flex ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            class="bi bi-share-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                          </svg>{" "}
                          <span className="ml-2">
                            <b>5 Projects</b>
                          </span>
                        </div>
                        <div className="col-md-4 d-flex text-center justify-content-center align-items-center">
                          <span className=" text-center">
                            <b>Progress:</b>
                          </span>
                          {/* <ProgressBar now={60} />{" "} */}
                          <div class="progress w-100 mx-2">
                            <div
                              class="progress-bar bg-dark"
                              role="progressbar"
                              style={{ width: Courses ? Courses.Progress : 0 }}
                              aria-valuenow={Courses ? Courses.Progress : ""}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <span className="">
                            <b>{Courses ? Courses.Progress : "no progress"}%</b>
                          </span>
                        </div>
                        <div className="col-md-3  ">
                          <Link to={`/Courses/${Courses.CourseID._id}`}>
                            <div className="btn btn-secondary text-black px-4 py-2">
                              <b> Go To Course </b>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : "LOADING"}
          </div>
        </div>
      </section>

      <HeroFooter />
    </div>
  );
};

export default DashBoard;
