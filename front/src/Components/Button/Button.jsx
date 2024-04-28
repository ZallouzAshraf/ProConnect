import React from "react";
import "./Button.css";

const Button = ({
  label = "Button",
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button type={type} className={`button ${className}`} disabled={disabled}>
      {label}
    </button>
  );
};

Button;
