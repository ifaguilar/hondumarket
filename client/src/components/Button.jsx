import React from "react";

const Button = ({ type, variant, children, onClick = null }) => (
  <button
    type={type}
    className={`btn-${variant} transition rounded-md text-sm font-medium px-6 h-12`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
