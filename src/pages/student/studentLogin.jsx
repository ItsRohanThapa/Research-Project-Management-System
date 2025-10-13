import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { setAuthentication, isAuthenticated } from "../../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { signin } from "../../api/auth";

const SignIn = () => {
  //let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "user@gmail.com",
    password: "password",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //client-side validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      signin(data)
        .then((response) => {
          console.log("Axios login success: ", response);
          if (response.data.userType == "Student") {
            window.location.replace("/studentHome");
            //navigate("/studentHome");
          } else if (response.data.userType == "Staff") {
            window.location.replace("/staffhome");
            //navigate("/staffhome");
          }
        })
        .catch((err) => {
          console.log("signin api function error: ", err);
        });
    }
  };

  /************************************
   *VIEWS*
   *************************************/

  const showSigninForm = () => (
    <form className="signup-form" onSubmit={handleSubmit}>
      <br />
      <br />
      <br />
      <br />
      {/* <br />
      <br /> */}
      {/* email */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          name="email"
          value={email}
          className="form-control"
          placeholder="Email address"
          type="email"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* password */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password"
          value={password}
          className="form-control"
          placeholder="Create password"
          type="password"
          onChange={handleChange}
        />
      </div>
      &nbsp;
      {/* signin button */}
      <center>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            placeholder="Login"
          >
            Sign In
          </button>
        </div>
      </center>
      <br></br>
      {/* create new account */}
      <p className="text-center text-Red">
        <b> Don't have an account? </b> <Link to="/signup">Register Here</Link>
      </p>
    </form>
  );

  /************************************
   *RENDER* col-md-4 py-4 mx-auto center
   *************************************/

  return (
    <div className="signin-container">
      <div className="row px-3 py-4 vh-100">
        <div className="col-md-4 py-5 mx-auto align-self-center ceneter">
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSigninForm()}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
