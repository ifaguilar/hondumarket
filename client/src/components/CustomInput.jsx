import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const tailwindClass =
    "w-96 h-14 rounded-md px-5 bg-gray-100 placeholder-gray-500 focus:bg-white focus:shadow-[inset_0_0_0_2px_rgba(59,130,246,1)] outline-0 text-sm transition hover:shadow-[inset_0_0_0_2px_rgba(209,213,219,1)]";

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">{label}</label>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? `${tailwindClass} input-error`
            : `${tailwindClass}`
        }
      />
      {meta.touched && meta.error && (
        <span className="text-sm font-medium text-red-500">{meta.error}</span>
      )}
    </div>
  );
};
export default CustomInput;
