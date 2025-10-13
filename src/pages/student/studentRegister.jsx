import React, { useState, useEffect } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import isNumeric from "validator/lib/isNumeric";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { isAuthenticated } from "../../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

const studentRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "UserName",
    stdID: "UniqueID",
    NIC: "734301",
    email: "username@gmail.com",
    password: "password",
    password2: "password",
    phoneNumber: "91+",
    specialization: "SE",
    // roleID:0,
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    fullName,
    stdID,
    NIC,
    email,
    password,
    password2,
    phoneNumber,
    specialization,
    // roleID,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  /************************************
   *EVENT HANDLERS*
   *************************************/
  const handleChange = (evt) => {
    //console.log(evt);
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //client-side validation
    if (
      isEmpty(fullName) ||
      isEmpty(stdID) ||
      isEmpty(NIC) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2) ||
      isEmpty(phoneNumber) ||
      isEmpty(specialization)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isNumeric(phoneNumber)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Contact Number",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const {
        fullName,
        stdID,
        NIC,
        email,
        userType,
        password,
        phoneNumber,
        specialization,
        // roleID
      } = formData;
      const data = {
        fullName,
        stdID,
        NIC,
        email,
        userType: "Student",
        password,
        phoneNumber,
        specialization,
        roleID: 0,
      };

      setFormData({ ...formData, loading: true });
      console.log(formData);
      signup(data)
        .then((response) => {
          console.log("Axios signup success: ", response);
          setFormData({
            fullName: "",
            stdID: "",
            NIC: "",
            email: "",
            password: "",
            password2: "",
            phoneNumber: "",
            specialization: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  /************************************
   *VIEWS*
   *************************************/

  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit}>
      <br />
      <center>
        {" "}
        <h2>User Registration</h2>{" "}
      </center>{" "}
      <br />
      {/* Full Name */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        &nbsp;
        <input
          name="fullName"
          value={fullName}
          className="form-control"
          placeholder="Enter Full Name"
          type="text"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* Student ID */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        &nbsp;
        <input
          name="stdID"
          value={stdID}
          className="form-control"
          placeholder="Enter User ID"
          type="text"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* NIC */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-id-card"></i>
          </span>
        </div>
        &nbsp;
        <input
          name="NIC"
          value={NIC}
          className="form-control"
          placeholder="Enter NIC Number"
          type="text"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* Student E-Mail */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-map-marker"></i>
          </span>
        </div>
        &nbsp;
        <input
          name="email"
          value={email}
          className="form-control"
          placeholder="Enter User E-Mail"
          type="text"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* Password */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        &nbsp;
        <input
          name="password"
          value={password}
          className="form-control"
          placeholder="Enter Password"
          type="password"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* Confirm Password */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa fa-lock"></i>
          </span>
        </div>
        &nbsp;
        <input
          name="password2"
          value={password2}
          className="form-control"
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* Phone number */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-phone"></i>
          </span>
        </div>
        &nbsp;
        <input
          name="phoneNumber"
          value={phoneNumber}
          className="form-control"
          placeholder="Enter Phone Number"
          type="text"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* Student specialization */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        <input
          name="specialization"
          value={specialization}
          className="form-control"
          placeholder="Enter Specialization Field"
          type="text"
          onChange={handleChange}
        />
      </div>
      {/* Role id */}
      {/* <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="roleID"
          value={roleID}
          className="form-control"
          placeholder="roleID"
          type="number"
          onChange={handleChange}
        />
      </div> */}
      {/* signup button */}
      <center>
        &nbsp;
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </div>
      </center>
      {/* already have account */}
      <div>
        <p className="text-center text-Black">
          <b> Have an account? </b> <Link to="/login">Log In</Link>
        </p>
      </div>
    </form>
  );

  return (
    <div className="signup-container">
      <div className="row px-3 py-4 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          <br />
          <br />
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSignupForm()}
          {/*<p style = {{ color: 'black'}}>{JSON.stringify(formData)}</p>*/}
        </div>
      </div>
    </div>
  );
};

export default studentRegister;
