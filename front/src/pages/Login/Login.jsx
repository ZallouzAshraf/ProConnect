import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [UserData, setUserData] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    adresse: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
    console.log(UserData);
  };

  const login = async () => {
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  return (
    <section className="login-container">
      <div className="login-content">
        <div className="image-container">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="simple"
            className="login-image"
          />
        </div>
        <div className="form-container">
          <div className="form-header">
            <h1>Sign In</h1>
          </div>
          <input
            value={UserData.email}
            onChange={changeHandler}
            name="email"
            type="text"
            placeholder="Email Address"
            className="login-input"
          />
          <input
            value={UserData.password}
            onChange={changeHandler}
            name="password"
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <p className="forgot-password">Forgot Password?</p>
          </div>
          <div className="submit-button">
            <button className="login-button" onClick={() => login()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
