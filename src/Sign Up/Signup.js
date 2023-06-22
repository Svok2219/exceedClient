import React, { createContext, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import HeroFooter from "../Asset/Footer";
import Navbar from "../Asset/Navbar";

const Signup = () => {
  const formEl = useRef();
  const navigate = useNavigate();
  const [Loggedin, setLoggedin] = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://server-exceed-lms.onrender.com/UserRouter/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FName: formEl.current.elements[0].value,
        LName: formEl.current.elements[1].value,
        UName: formEl.current.elements[2].value,
        RegNumber: formEl.current.elements[3].value,
        Email: formEl.current.elements[4].value,
        UserType: formEl.current.elements[5].value,
        password: formEl.current.elements[7].value,
        School: formEl.current.elements[6].value,
        // OpeningTitle: formEl.current.elements[6].value,
        // Resume: formEl.current.elements[7].value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success == true) {
          window.alert("Submit Successful");
          navigate("/Login");
          setLoggedin(result.content);
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
    <>
      <Navbar />
      <div
        className="my-5 mx-5 p-5 text-center"
        id="Contact"
        style={{ backgroundColor: "#F8AF79", borderRadius: "12px" }}
      >
        <h3 className="" style={{ color: "#1F160F" }}>
          <u>Sign UP</u>
        </h3>

        <form className="my-5" ref={formEl} onSubmit={handleSubmit}>
          <div class="form-row"></div>
          <div class="form-group">
            <label for="inputAddress">First Name</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="First Name"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress2">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Last Name"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress2">User Name</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="User Name"
            />
          </div>
          <div class="form-group">
            {/* <label for="inputAddress">Address</label> */}
            <label style={{ letterSpacing: "2.9px" }}>
              REGISTRATION Number:
            </label>

            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="REGISTRATION NUMBER
              "
            />
          </div>
          <div class="form-group">
            {/* <label for="inputAddress">Address</label> */}
            <label style={{ letterSpacing: "2.9px" }}>Email:</label>

            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Email Address
              "
            />
          </div>
          <div class="form-group text-left ">
            <label style={{ letterSpacing: "2.9px" }}>TYPE:</label>

            <select
              name="myType"
              id="type"
              placeholder="type"
              className="form-control"
            >
              <option value="type1" className="form-control" selected>
                Super Admin
              </option>
              <option value="type2">Administrator</option>
              <option value="type3">User</option>
            </select>
          </div>
          <div class="form-group">
            <label for="inputAddress2">School Name</label>
            <input
              //   rows={5}
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="School Name"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress2">Password</label>
            <input
              //   rows={5}
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            class="btn btn-light px-5 py-2 font-weight-bold"
          >
            Register
          </button>
        </form>
      </div>
      <HeroFooter />
    </>
  );
};

export default Signup;
