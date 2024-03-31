import React, { useState } from "react";
import "./Loginandregister.css";

export default function Loginandregister() {
  const [action, setAction] = useState("Sign In");
  const [UserData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginsignup">
      {action === "Sign In" ? (
        <div className="loginsignup-container">
          <h1>{action}</h1>
          <div className="loginsignup-fields">
            <input
              value={UserData.email}
              onChange={changeHandler}
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <input
              value={UserData.password}
              onChange={changeHandler}
              type="password"
              name="password"
              placeholder="Your Password"
            />
          </div>
          <button>Sign In</button>
          <p className="loginsignup-login">
            Dont Have An Account ?{" "}
            <span onClick={() => setAction("Sign Up")}>Register Here</span>
          </p>
        </div>
      ) : action === "Sign Up" ? (
        <div className="loginsignup-container">
          <h1>{action}</h1>
          <div className="loginsignup-fields">
            <input
              value={UserData.username}
              onChange={changeHandler}
              type="text"
              name="username"
              placeholder="Your Username"
            />
            <input
              value={UserData.email}
              onChange={changeHandler}
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <input
              value={UserData.password}
              onChange={changeHandler}
              type="password"
              name="password"
              placeholder="Your Password"
            />
          </div>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By Clicking , I agree to the terms of use</p>
          </div>
          <button>Sign Up</button>
          <p className="loginsignup-login">
            Already Have An Account ?{" "}
            <span onClick={() => setAction("Sign In")}>Login Here</span>
          </p>
        </div>
      ) : (
        <div className="loginsignup-container">
          <h1>{action}</h1>
          <div className="loginsignup-fields">
            <input type="email" placeholder="Your Email" />
            <button>Continue</button>
            <p className="loginsignup-login">
              Dont Have An Account ?{" "}
              <span onClick={() => setAction("Sign Up")}>Register Here</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
