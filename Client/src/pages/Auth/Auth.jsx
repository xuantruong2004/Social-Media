import React from "react";
import "./Auth.scss";
import Logo from "../../img/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
function Auth(props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
    });
  };
  return (
    <div className="Auth">
      {/* left side */}
      <div className="Auth-left">
        <img src={Logo} alt="" />
        <div className="WebName">
          <h1>TXM Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* right side */}
      {/* <SignUp /> */}

      <div className="Auth-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Login"}</h3>

          {isSignUp && (
            <div className="">
              <input
                value={data.firstname}
                type="text"
                className="infoInput"
                placeholder="First Name"
                name="firstname"
                onChange={handleChange}
              />
              <input
                value={data.lastname}
                type="text"
                className="infoInput"
                placeholder="Last Name"
                name="lastname"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="">
            <input
              value={data.username}
              type="text"
              className="infoInput"
              placeholder="User Name"
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className="">
            <input
              value={data.password}
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                value={data.confirmpassword}
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange={handleChange}
              />
            )}
          </div>
          {isSignUp && (
            <span
              className="confirm-password"
              style={confirmPass ? { display: "none" } : { display: "block" }}
            >
              * Confirm password is not same
            </span>
          )}
          <div className="">
            <span style={{ fontSize: "12px" }}>
              {isSignUp ? "Already have an account." : "Don't have an account."}{" "}
              <span
                className="isSignUp"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  resetForm();
                }}
              >
                {isSignUp ? "Login!" : "Sign up"}
              </span>
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading..." : isSignUp ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
