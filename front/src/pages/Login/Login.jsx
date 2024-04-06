import React from "react";
import "./Login.css";

export default function Login() {
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
            type="text"
            placeholder="Email Address"
            className="login-input"
          />
          <input
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
            <button className="login-button">Login</button>
          </div>
        </div>
      </div>
    </section>
  );
}
