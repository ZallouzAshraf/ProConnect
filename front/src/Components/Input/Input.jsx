import React from "react";
import "./Input.css";

const Input = ({
  label = "",
  name = "",
  type = "text",
  className = "",
  inputClassName = "",
  isRequired = true,
  placeholder = "",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`input-field ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
