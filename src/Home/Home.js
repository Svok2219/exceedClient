import React, { useEffect, useState } from "react";
import HeroFooter from "../Asset/Footer";
import Navbar from "../Asset/Navbar";

import { Navigation, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  SwiperCore.use([Pagination]);

  const [Course, setCourse] = useState([]);
  const fetchDataCourse = () => {
    return axios
      .get(`https://server-exceed-lms.onrender.com/CourseRouter/getAllUser`)
      .then((response) => setCourse(response.data.content));
  };
  useEffect(() => {
    fetchDataCourse();
  }, []);
  console.log(Course);

  return (
    <div>
      <Navbar />
      <div className="banner px-5 py-5" style={{ backgroundColor: "#F58634" }}>
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-md-6 text-left text-light">
            <div
              className="text-light font-weight-bolder"
              style={{ fontFamily: "sans-serif", fontSize: "40px" }}
            >
              <p>
                Wellcome to
                <br />
                Exceed Robotics LMS
              </p>
            </div>
            {/* <br /> */}
            <h5>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, ...
            </h5>
            <Link to={"/Login"}>
              <button
                class="button loginBtn btn-light font-weight-bold bg-light  px-5 "
                style={{
                  color: "#F58634",
                  letterSpacing: 1.9,
                  fontSize: "20px",
                }}
                type="button"
              >
                Log In
              </button>{" "}
            </Link>
          </div>
          <div
            className="col-md-6 text-center py-4"
            style={{ backgroundColor: "#E7AF86", borderRadius: "12px" }}
          >
            <img
              src="https://thelab.org.au/wp-content/uploads/2020/04/The-labrobot.png"
              className="img-fluid w-75"
            ></img>
          </div>
        </div>
      </div>

      <div className="my-5">
        <dic className="row mx-5 justify-content-center align-items-center">
          <div className="col-md-6 text-right">
            <img
              src="https://res.cloudinary.com/people-matters/image/upload/fl_immutable_cache,w_624,h_351,q_auto,f_auto/v1610618538/1610618536.jpg"
              className="  img-fluid"
            />
          </div>
          <div className="col-md-6 p-5 text-left text-dark font-weight-bold">
            <h6>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </h6>
          </div>
        </dic>
      </div>

      <div className="my-5  text-center mx-5" id="Courses">
        <h3 style={{ color: "#F58634" }}>
          <u>Offered Courses</u>
        </h3>
        <div className="text-center">
          <div className="text-center">
            <div className=" row my-5 justify-content-center align-items-center">
              {Course.map((x) => (
                <div key={x._id} className="col-md-3 Cursor text-center">
                  <Link to={`/${x._id}`}>
                    <img src={x.Image} className="boxes  my-2" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 mx-5 text-center overflow-hidden">
        <h3 style={{ color: "#F58634" }}>
          <u>Why Choose Us?</u>
        </h3>
        <div className="mx-md-5">
          <h6 className="text-dark mt-4 mx-5 text-center">
            at FlowParserMixin.allowInAnd
            (D:\a2zClient\demo-app\node_modules\@babel\parser\lib\index.js:12232:16)
            Compiled with warnings. [eslint] src\App.js Line 1:8: 'logo' is
            defined but never used no-unused-vars Line 7:3: 'Link' is defined
            but never used no-unused-vars Line 8:3: 'BrowserRouter' is defined
            but never used no-unused-vars Line 12:10: 'useState' is defined but
            never used no-unused-vars Line 14:10: 'useEffect' is defined but
            never used no-unused-vars src\Home\Home.js Line 40:13: img elements
            must have an alt prop, either with meaningful text, or an empty
            string for decorative images jsx-a11y/alt-text Line 51:13: img
            elements must have an alt prop, either with meaningful text, or an
            empty string for decorative images jsx-a11y/alt-text Search for the
            keywords to learn more about each warning. To ignore, add //
            eslint-disable-next-line to the line before. WARNING in [eslint]
            src\App.js Line 1:8: 'logo' is defined but never used no-unused-vars
            Line 7:3: 'Link' is defined but never used no-unused-vars Line 8:3:
            'BrowserRouter' is defined but never used no-unused-vars Line 12:10:
            'useState' is defined but never used no-unused-vars Line 14:10:
            'useEffect' is defined but never used no-unused-vars
            src\Home\Home.js Line 40:13: img elements must have an alt prop,
            either with meaningful text, or an empty string for decorative
            images jsx-a11y/alt-text Line 51:13: img elements must have an alt
            prop, either with meaningful text, or an empty string for decorative
            images jsx-a11y/alt-text webpack compiled with 1 warning
          </h6>
        </div>
      </div>

      <div className="my-5  text-center mx-md-5">
        <h3 style={{ color: "#F58634" }}>
          <u>Affiliated Schools</u>
        </h3>

        <div
          className="slider py-5 my-5"
          style={{ backgroundColor: "#595959" }}
        >
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 01 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 1 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 111 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 11 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 2 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 3 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 4 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 5 School
            </SwiperSlide>
            <SwiperSlide className="text-center text-light font-weight-bold">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oWo7OPsdCxTkMy3Mm9VQKuSjTHJHI5ch9LJ78Vs&s"
                className="img-fluid"
              />
              <br />
              Slide 6 School
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div
        className="my-5 mx-5 p-5 text-center"
        id="Contact"
        style={{ backgroundColor: "#F8AF79", borderRadius: "12px" }}
      >
        <h3 className="" style={{ color: "#1F160F" }}>
          <u>Connect With US</u>
        </h3>

        <form className="my-5">
          <div class="form-row"></div>
          <div class="form-group">
            {/* <label for="inputAddress">Address</label> */}
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Student ID"
            />
          </div>
          <div class="form-group">
            {/* <label for="inputAddress2">Address 2</label> */}
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Full Name"
            />
          </div>
          <div class="form-group">
            {/* <label for="inputAddress">Address</label> */}
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Subject"
            />
          </div>
          <div class="form-group">
            {/* <label for="inputAddress2">Address 2</label> */}
            <textarea
              rows={5}
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Your Message"
            />
          </div>
          <button
            type="submit"
            class="btn btn-light px-5 py-2 font-weight-bold"
          >
            Sign in
          </button>
        </form>
      </div>

      <HeroFooter />
    </div>
  );
};

export default Home;
