import React from "react";

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  isRequired = null,
}) => {
  const tailwindClass =
    "w-96 h-14 rounded-md px-5 bg-gray-100 placeholder-gray-500 focus:bg-white focus:shadow-[inset_0_0_0_2px_rgba(59,130,246,1)] outline-0 text-sm transition hover:shadow-[inset_0_0_0_2px_rgba(209,213,219,1)]";

  if (isRequired) {
    return (
      <input
        type={type}
        className={tailwindClass}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    );
  } else {
    return (
      <input
        type={type}
        className={tailwindClass}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  }
};

export default Input;
