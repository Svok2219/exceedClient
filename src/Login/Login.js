import React, { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import HeroFooter from "../Asset/Footer";
import Navbar from "../Asset/Navbar";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

const Login = () => {
  // /Authenticate
  // const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();
  const [Loggedin, setLoggedin] = useContext(Context);

  const [state, setstate] = useState(false);
  const formEl = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://server-exceed-lms.onrender.com/Authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // FName: formEl.current.elements[0].value,
        // LName: formEl.current.elements[1].value,
        Email: formEl.current.elements[0].value,
        // RegNumber: formEl.current.elements[0].value,
        // UserType: formEl.current.elements[4].value,
        password: formEl.current.elements[1].value,
        // School: formEl.current.elements[5].value,
        // OpeningTitle: formEl.current.elements[6].value,
        // Resume: formEl.current.elements[7].value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // navigate("/success");
        console.log(result);
        if (result.success == true) {
          window.alert("Submit Successful");
          navigate("/Dashboard");
          setLoggedin(result.content[0]);
        } else {
          window.alert("Couldn't sent Submit request");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.success == false) {
          window.alert(err.content);
        }
      });
  };
  return (
    <div>
      <Navbar />
      <div className="row justify-content-center align-items-center text-center mx-5 my-3">
        <div className="col-md-6 text-center">
          <div
            className="region px-5 py-5"
            style={{ backgroundColor: "#F9C299", borderRadius: "12px" }}
          >
            <form ref={formEl} onSubmit={handleSubmit}>
              <div class="form-group row">
                <label
                  for="inputEmail3"
                  class="col-sm-3 col-form-label text-dark font-weight-bolder"
                  style={{ fontWeight: "bolder" }}
                >
                  Email ID :
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control bg-white"
                    id="inputEmail3"
                    // placeholder="Email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="inputPassword3"
                  class="col-sm-3 col-form-label text-dark font-weight-bolder"
                  style={{ fontWeight: "bolder" }}
                >
                  Password:
                </label>
                <div class="col-sm-9">
                  <input
                    type="password"
                    class="form-control bg-white"
                    id="inputPassword3"
                    // placeholder="Password"
                  />
                </div>
                <div className="text-center mt-5">
                  {/* <Link to={"/Dashboard"}> */}
                  <button
                    type="submit"
                    className="btn rounded font-weight-bold text-light"
                    style={{ backgroundColor: "#DE6D19", fontSize: "24px" }}
                  >
                    Log in
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://img.freepik.com/premium-vector/kids-robotics-project-little-engineers-boys-girls-programming-robot-childish-amateur-radio-club-young-programmers-clever-babies-play-with-androids-vector-cartoon-flat-style-isolated-concept_533410-942.jpg?w=996"
            className="img-fluid"
          />
        </div>
      </div>
      <HeroFooter />
    </div>
  );
};

export default Login;
