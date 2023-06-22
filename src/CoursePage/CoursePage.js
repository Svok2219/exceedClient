import HeroFooter from "../Asset/Footer";
import Navbar from "../Asset/Navbar";
import $ from "jquery";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";

import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../App";
const CoursePage = () => {
  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  const formEl = useRef();
  const Charge = useRef();
  const [Loggedin, setLoggedin] = useContext(Context);

  const navigate = useNavigate();
  const [formValue, setFormvalue] = useState();
  const [Course, setCourse] = useState();
  const [course, SetCourse] = useState();

  const [openPaymentButton, setopenPaymentButton] = useState(false);
  const [amount, setamount] = useState(499);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormvalue(formEl.current.elements);
    // console.log(formValue);
    setopenPaymentButton(true);

    // console.log(

    //   formEl.current.elements[2].value,
    //   formEl.current.elements[3].value,
    //   formEl.current.elements[4].value,
    //   formEl.current.elements[5].value,
    //   formEl.current.elements[6].value
    // );
  };

  useEffect(() => {
    // 👇️ call method in useEffect hook
    const el = document.getElementById("courseName").innerText;
    setCourse(el);
    // console.log(el);
  }, []);
  // const Course = document.getElementById("courseName");
  console.log(Course);

  const handleToken = (token) => {
    fetch("https://server-exceed-lms.onrender.com/Payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount }),
    })
      .then((res) => res.json())
      .then((_) => {
        window.alert(`!Payment Recived!
        ... Sending data to server......`);
        fetch("https://server-exceed-lms.onrender.com/OrdersRouter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: Loggedin.UName || "Login or Sign up to autoload details",

            Email: formEl.current.elements[1].value || "",

            Course: course.Title || Course,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result.success);
            if (result.success == false) {
              window.alert("Request couldn't sent to server");
            } else {
              window.alert("Request sent to server");
              navigate("/success");
            }
          });
        // .catch((err) => {
        //   console.log(err);
        // });
      })
      .catch((_) => window.alert("Transaction Failed."));
  };
  // console.log(Charge);
  const handleRefund = () => {
    fetch("https://thrivers-assignment-server.onrender.com/payment/refund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charge: Charge.current.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // navigate("/success");
        console.log(result);
        if (result.success == true) {
          window.alert("Refund Successful");
        } else {
          window.alert("Couldn't sent refund request");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.success == false) {
          window.alert(err.content);
        } else {
          window.alert("Refund Successful");
        }
      });
  };
  // https://server-exceed-lms.onrender.com/CourseRouter/

  const params = useParams();

  console.log(params.id);

  const fetchDataCourse = async () => {
    const response = await axios.get(
      `https://server-exceed-lms.onrender.com/CourseRouter/${params.id}`
    );
    return SetCourse(response.data);
  };
  useEffect(() => {
    fetchDataCourse();
  }, []);
  console.log(course);

  return (
    <div>
      <Navbar />

      <section id="services" class="services section-bg">
        <div class="overflow-hidden">
          <div class="col-sm-12 text-center mb-4"></div>
          <div class="row text-center d-flex align-items-center justify-content-center mx-md-5">
            <div className="col-md-6  img-fluid my-5 p-5">
              <img
                src={course ? course.Image : "......."}
                alt="no image"
                className="img-fluid"
              />
            </div>
            <div class="col-md-6">
              <div class="_product-detail-content">
                <p class="_p-name" id="courseName">
                  {" "}
                  {course ? course.Title : "Course Name"}
                </p>
                <div class="_p-price-box">
                  <div class="p-list">
                    {/* <span>
                      {" "}
                      M.R.P. : <i class="fa fa-inr"></i> <del> 1399 </del>{" "}
                    </span> */}
                    <span class="price">
                      {" "}
                      Rs.{" "}
                      <span class="price">
                        {" "}
                        {course ? course.price : "000"}{" "}
                      </span>{" "}
                    </span>
                  </div>
                  <div class="_p-add-cart">
                    {/* <div class="_p-qty">
                      <span>Add Quantity</span>
                      <div
                        class="value-button decrease_"
                        id=""
                        value="Decrease Value"
                      >
                        -
                      </div>
                      <input type="number" name="qty" id="number" value="1" />
                      <div
                        class="value-button increase_"
                        id=""
                        value="Increase Value"
                      >
                        +
                      </div>
                    </div> */}
                  </div>
                  <div class="_p-features">
                    <span> Description About this product:- </span>
                    {course ? course.description : ""}
                  </div>
                  <div accept-charset="utf-8">
                    <ul class="spe_ul"></ul>
                    <div class="_p-qty-and-cart">
                      <form ref={formEl} onSubmit={(e) => e.preventDefault()}>
                        <div class="form-group">
                          {/* <label for="inputAddress2"> Name</label> */}
                          <input
                            //   rows={5}
                            required
                            type="text"
                            class="form-control"
                            id="inputAddress2"
                            value={Loggedin.UName ? Loggedin.UName : null}
                            placeholder={
                              Loggedin.UName
                                ? Loggedin.UName
                                : "enter your Name to enroll the course"
                            }
                          />
                        </div>
                        <div class="form-group">
                          {/* <label for="inputAddress2">Email</label> */}
                          <input
                            //   rows={5}
                            required
                            type="text"
                            class="form-control"
                            id="inputAddress2"
                            value={Loggedin.Email ? Loggedin.Email : null}
                            placeholder={
                              Loggedin.UName
                                ? Loggedin.UName
                                : "enter your Email to enroll the course"
                            }
                          />
                        </div>

                        <div class="_p-add-cart">
                          <StripeCheckout
                            stripeKey="pk_test_51MCKIIDDLZBsKWzQK2rRFsClZiTRpjguzSLlNpoarHLJ1oFHKjGfxTD2EKvpT5ymJvwRLq3Njp2capl3haUlwEAa00QfHc2VTt"
                            token={handleToken}
                            name=""
                            panelLabel={`Pay`}
                            currency="USD"
                            amount={amount * 100}
                          >
                            <button
                              class="btn-theme btn buy-btn"
                              // type="submit"
                              tabindex="0"
                            >
                              <i class="fa fa-shopping-cart"></i> Buy Now
                            </button>
                          </StripeCheckout>
                          {/* <button class="btn-theme btn btn-success" tabindex="0">
                          <i class="fa fa-shopping-cart"></i> Add to Cart
                        </button> */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <form
        ref={formEl}
        onSubmit={handleSubmit}
        className="row g-3 needs-validation "
        novalidate
      >
        <div className="col-md-4 position-relative">
          <label for="validationTooltip01" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="Name"
            className="form-control"
            id="validationTooltip01"
            placeholder="Mark Watney"
            required
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="col-md-4 position-relative">
          <label for="validationTooltip02" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="Email"
            className="form-control"
            id="validationTooltip02"
            placeholder="watney@mars.com"
            required
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="col-md-4 position-relative">
          <label for="validationTooltip2" className="form-label">
            ContactNumber
          </label>
          <input
            type="number"
            name="ContactNumber"
            className="form-control"
            id="validationTooltip02"
            placeholder="0123654789"
            required
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="col-md-6 position-relative">
          <label for="validationTooltip3" className="form-label">
            College
          </label>
          <input
            type="text"
            name="College"
            className="form-control"
            id="validationTooltip03"
            required
          />
          <div className="invalid-tooltip">
            Please provide your College Name.
          </div>
        </div>
        <div className="col-md-3 position-relative">
          <label for="validationTooltip04" className="form-label">
            Branch
          </label>
          <input
            type="text"
            name="Branch"
            className="form-control"
            id="validationTooltip04"
            required
          />
          <div className="invalid-tooltip">
            Please provide your College;s branch Name.
          </div>
        </div>
        <div className="col-md-3 position-relative">
          <label for="validationTooltip05" className="form-label">
            Year of Pass out
          </label>
          <input
            type="number"
            name="PassOutYear"
            className="form-control"
            id="validationTooltip05"
            required
          />
          <div className="invalid-tooltip">
            Please provide your Passout year
          </div>
        </div>
        <div className="col-md-6 ">
          <label for="validationTooltip03" className="form-label">
            Form provider's name
          </label>
          <input
            type="text"
            name="FormProvider"
            className="form-control"
            id="validationTooltip03"
            required
          />
          <div className="invalid-tooltip">
            Please provide your Form provider's Name.
          </div>
        </div>

        <StripeCheckout
          stripeKey={
            "pk_test_51MCKIIDDLZBsKWzQK2rRFsClZiTRpjguzSLlNpoarHLJ1oFHKjGfxTD2EKvpT5ymJvwRLq3Njp2capl3haUlwEAa00QfHc2VTt" ||
            ""
          }
          token={handleToken}
          name=""
          panelLabel={`Pay`}
          currency="USD"
          amount={amount * 100}
        >
          <button className="btns col-md-12 text-center py-3">
            Proceed to Checkout
          </button>
        </StripeCheckout>
      </form> */}

      {/* <section class="sec bg-light">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 title_bx">
              <h3 class="title"> Recent Post </h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 list-slider mt-4">
              <div class="owl-carousel common_wd  owl-theme" id="recent_post">
                <div class="item">
                  <div class="sq_box shadow">
                    <div class="pdis_img">
                      <span class="wishlist">
                        <a
                          alt="Add to Wish List"
                          title="Add to Wish List"
                          href="javascript:void(0);"
                        >
                          {" "}
                          <i class="fa fa-heart"></i>
                        </a>
                      </span>
                      <a href="#">
                        <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/resize/680x/" />
                      </a>
                    </div>
                    <h4 class="mb-1">
                      {" "}
                      <a href="details.php"> Milton Bottle </a>{" "}
                    </h4>
                    <div class="price-box mb-2">
                      <span class="price">
                        {" "}
                        Price <i class="fa fa-inr"></i> 200{" "}
                      </span>
                      <span class="offer-price">
                        {" "}
                        Offer Price <i class="fa fa-inr"></i> 120{" "}
                      </span>
                    </div>
                    <div class="btn-box text-center">
                      <a class="btn btn-sm" href="javascript:void(0);">
                        {" "}
                        <i class="fa fa-shopping-cart"></i> Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="sq_box shadow">
                    <div class="pdis_img">
                      <span class="wishlist">
                        <a
                          alt="Add to Wish List"
                          title="Add to Wish List"
                          href="javascript:void(0);"
                        >
                          {" "}
                          <i class="fa fa-heart"></i>
                        </a>
                      </span>
                      <a href="#">
                        <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/resize/680x/" />
                      </a>
                    </div>
                    <h4 class="mb-1">
                      {" "}
                      <a href="details.php"> Milton Bottle </a>{" "}
                    </h4>
                    <div class="price-box mb-2">
                      <span class="price">
                        {" "}
                        Price <i class="fa fa-inr"></i> 200{" "}
                      </span>
                      <span class="offer-price">
                        {" "}
                        Offer Price <i class="fa fa-inr"></i> 120{" "}
                      </span>
                    </div>
                    <div class="btn-box text-center">
                      <a class="btn btn-sm" href="javascript:void(0);">
                        {" "}
                        <i class="fa fa-shopping-cart"></i> Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="sq_box shadow">
                    <div class="pdis_img">
                      <span class="wishlist">
                        <a
                          alt="Add to Wish List"
                          title="Add to Wish List"
                          href="javascript:void(0);"
                        >
                          {" "}
                          <i class="fa fa-heart"></i>
                        </a>
                      </span>
                      <a href="#">
                        <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/resize/680x/" />
                      </a>
                    </div>
                    <h4 class="mb-1">
                      {" "}
                      <a href="#"> Milton Bottle </a>{" "}
                    </h4>
                    <div class="price-box mb-2">
                      <span class="price">
                        {" "}
                        Price <i class="fa fa-inr"></i> 200{" "}
                      </span>
                      <span class="offer-price">
                        {" "}
                        Offer Price <i class="fa fa-inr"></i> 120{" "}
                      </span>
                    </div>
                    <div class="btn-box text-center">
                      <a class="btn btn-sm" href="javascript:void(0);">
                        {" "}
                        <i class="fa fa-shopping-cart"></i> Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="sq_box shadow">
                    <div class="pdis_img">
                      <span class="wishlist">
                        <a
                          alt="Add to Wish List"
                          title="Add to Wish List"
                          href="javascript:void(0);"
                        >
                          {" "}
                          <i class="fa fa-heart"></i>
                        </a>
                      </span>
                      <a href="#">
                        <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/resize/680x/" />
                      </a>
                    </div>
                    <h4 class="mb-1">
                      {" "}
                      <a href="#"> Milton Bottle </a>{" "}
                    </h4>
                    <div class="price-box mb-2">
                      <span class="price">
                        {" "}
                        Price <i class="fa fa-inr"></i> 200{" "}
                      </span>
                      <span class="offer-price">
                        {" "}
                        Offer Price <i class="fa fa-inr"></i> 120{" "}
                      </span>
                    </div>
                    <div class="btn-box text-center">
                      <a class="btn btn-sm" href="javascript:void(0);">
                        {" "}
                        <i class="fa fa-shopping-cart"></i> Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="sq_box shadow">
                    <div class="pdis_img">
                      <span class="wishlist">
                        <a
                          alt="Add to Wish List"
                          title="Add to Wish List"
                          href="javascript:void(0);"
                        >
                          {" "}
                          <i class="fa fa-heart"></i>
                        </a>
                      </span>
                      <a href="#">
                        <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/resize/680x/" />
                      </a>
                    </div>
                    <h4 class="mb-1">
                      {" "}
                      <a href="details.php"> Milton Bottle </a>{" "}
                    </h4>
                    <div class="price-box mb-2">
                      <span class="price">
                        {" "}
                        Price <i class="fa fa-inr"></i> 200{" "}
                      </span>
                      <span class="offer-price">
                        {" "}
                        Offer Price <i class="fa fa-inr"></i> 120{" "}
                      </span>
                    </div>
                    <div class="btn-box text-center">
                      <a class="btn btn-sm" href="javascript:void(0);">
                        {" "}
                        <i class="fa fa-shopping-cart"></i> Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="sq_box shadow">
                    <div class="pdis_img">
                      <span class="wishlist">
                        <a
                          alt="Add to Wish List"
                          title="Add to Wish List"
                          href="javascript:void(0);"
                        >
                          {" "}
                          <i class="fa fa-heart"></i>
                        </a>
                      </span>
                      <a href="#">
                        <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/resize/680x/" />
                      </a>
                    </div>
                    <h4 class="mb-1">
                      {" "}
                      <a href="details.php"> Milton Bottle </a>{" "}
                    </h4>
                    <div class="price-box mb-2">
                      <span class="price">
                        {" "}
                        Price <i class="fa fa-inr"></i> 200{" "}
                      </span>
                      <span class="offer-price">
                        {" "}
                        Offer Price <i class="fa fa-inr"></i> 120{" "}
                      </span>
                    </div>
                    <div class="btn-box text-center">
                      <a class="btn btn-sm" href="javascript:void(0);">
                        {" "}
                        <i class="fa fa-shopping-cart"></i> Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="sq_box shadow">
                    <div class="pdis_img">
                      <span class="wishlist">
                        <a
                          alt="Add to Wish List"
                          title="Add to Wish List"
                          href="javascript:void(0);"
                        >
                          {" "}
                          <i class="fa fa-heart"></i>
                        </a>
                      </span>
                      <a href="#">
                        <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/resize/680x/" />
                      </a>
                    </div>
                    <h4 class="mb-1">
                      {" "}
                      <a href="details.php"> Milton Bottle </a>{" "}
                    </h4>
                    <div class="price-box mb-2">
                      <span class="price">
                        {" "}
                        Price <i class="fa fa-inr"></i> 200{" "}
                      </span>
                      <span class="offer-price">
                        {" "}
                        Offer Price <i class="fa fa-inr"></i> 120{" "}
                      </span>
                    </div>
                    <div class="btn-box text-center">
                      <a class="btn btn-sm" href="javascript:void(0);">
                        {" "}
                        <i class="fa fa-shopping-cart"></i> Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <HeroFooter />
    </div>
  );
};

export default CoursePage;
