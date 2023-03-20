import React, { useState, useRef, useEffect, useContext } from "react";
import HeroFooter from "../Asset/Footer";
import Navbar from "../Asset/Navbar";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import axios from "axios";

const CourseModule = ({ Courses }) => {
  console.log(Courses);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const params = useParams();

  console.log(params.id);

  const [Loggedin, setLoggedin] = useContext(Context);
  const [Progress, setProgress] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [VideoUrl, setVideoUrl] = useState();
  const [defaultVideoUrl, defaultsetVideoUrl] = useState("");
  const [title, settitle] = useState("");
  const [Instructor, setInstructor] = useState("");

  const fetchDataCourse = async () => {
    const response = await axios.get(
      `http://localhost:5000/ModulesRouter/${params.id}`
    );
    return setProgress(response.data);
  };
  useEffect(() => {
    fetchDataCourse();
  }, [Loggedin.Email]);
  // console.log(Progress[0].VideoUrl);

  const moduleOpen = (e) => {
    setClicked(true);
    setVideoUrl(e.VideoUrl);
    settitle(e.ModuleName);
    setInstructor(e.Instructor);
  };
  console.log(Progress);
  return (
    <div>
      <Navbar />
      <div className="row mx-auto my-3 d-flex justify-content-center align-items-center">
        <div className="col-md-7">
          <div>
                  
            <div>
                          
              {!clicked && !Progress.length > 0 ? (
                <iframe
                  width="640"
                  height="360"
                  src={`https://www.youtube.com/embed/${Progress[0]?.VideoUrl}`}
                  // src={`https://www.youtube.com/embed/${}`}
                  // title="Major Vivek Jacob in conversation with International TEDx speaker Major(Dr.) Mohommed Ali Shah"
                  frameborder="0"
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              ) : (
                <iframe
                  width="640"
                  height="360"
                  src={`https://www.youtube.com/embed/${VideoUrl}`}
                  // title="Major Vivek Jacob in conversation with International TEDx speaker Major(Dr.) Mohommed Ali Shah"
                  frameborder="0"
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              )}
              {/* <button onClick={togglePlay}>
                                {isPlaying ? "Pause" : "Play"}
                            
              </button> */}
                      
            </div>
            {/* <ReactPlayer url="https://vimeo.com/3155182" /> */}
            <div className="d-flex justify-content-between align-items-center">
              <h2>{Courses ? Courses[0].CourseID.Title : "Undefined"}</h2>
              {/* <span>
                Duration : <b>10 minutes</b>{" "}
              </span> */}
            </div>
          </div>
          <span>
            Lecture Topic : <b>{title ? title : "Undefined"}</b>{" "}
          </span>
          <br />
          <span>
            Lecturer : <b>{Instructor ? Instructor : "Undefined"}</b>{" "}
          </span>
          <br />
        </div>
        <div className="col-md-5">
          <div
            id="accordion"
            style={{ height: "500px" }}
            className="my-5 my-md-0  overflow-scroll"
          >
            {Progress.map((x) => (
              <>
                <div
                  class="card-header"
                  id="headingOne"
                  onClick={() => moduleOpen(x)}
                >
                  <h5
                    class="mb-0 d-flex Cursor"
                    data-toggle="collapse"
                    data-target={`#collapse${x._id}`}
                    aria-expanded="true"
                    aria-controls={`/collapse${x._id}`}
                  >
                    <div class="Cursor  text-decoration-none text-dark  pe-auto font-weight-bold">
                      {x.ModuleName}
                    </div>
                    <b
                      style={{ fontSize: "30px" }}
                      className="font-weight-bold ml-auto"
                    >
                      +
                    </b>
                  </h5>
                </div>
                <div
                  id={`collapse${x._id}`}
                  class="collapse  "
                  aria-labelledby={`heading${x._id}`}
                  data-parent="#accordion"
                >
                  <div class="card-body">{x.TextLecture}</div>
                </div>{" "}
              </>
            ))}
          </div>
        </div>
      </div>
      <HeroFooter />
    </div>
  );
};

export default CourseModule;
