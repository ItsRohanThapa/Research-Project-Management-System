import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../../helpers/auth";

const Header = ({ history }) => {
  const handleLogout = (evt) => {
    logout();
    window.location.replace("/login");
  };

  //views/*
  const showNavigation = () => (
    <div className="header_container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light  fixed-top  ">
        <Link to="/" className="navbar-brand ">
          <b> PROJEXPERT </b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="fas fa-home"> Home </i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <Link to="/student/register" className="nav-link">
                    <i className="fas fa-user"> Join as a User</i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <Link to="/staff/signup" className="nav-link">
                    <i className="fas fa-users"> Join as a Staff</i>
                  </Link>
                </li>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <Link to="/AdminHome" className="nav-link">
                    <i className="fas fa-users"> Join as Admin</i>
                  </Link>
                </li>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {/*  <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <i className="fas fa-edit"> SignUp</i>
                  </Link>
                </li> */}
                {/*  <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    SignUp
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/student/register">
                      As a Student
                    </a>
                    <a class="dropdown-item" href="/staff/signup">
                      As a Staff
                    </a>
                  </div>
                </li> */}
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <i className="fas fa-sign-in-alt"> SignIn</i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 2 && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/product" className="nav-link">
                    <i className="fas fa-heart"> Product</i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    <i className="	fas fa-shopping-cart"> Add Cart</i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <Link to="/return" className="nav-link">
                    <i className="fas fa-arrow-circle-right"> Return</i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <Link to="/add1" className="nav-link">
                    <i className="fas fa-share"> Refund</i>
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </Fragment>
            )}

            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <button
                    className="btn btn-link text-secondary text-decoration-none pl-0"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"> Logout</i>
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );

  //Render
  return <header id="header">{showNavigation()}</header>;
};
export default Header;
