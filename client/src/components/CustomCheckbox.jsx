import { useField } from "formik";
import React, { useContext } from "react";

// Context
import TermsContext from "../context/TermsContextProvider";

const CustomCheckbox = ({ label, ...props }) => {
  const { setTermsModal } = useContext(TermsContext);

  const [field, meta] = useField(props);

  const tailwindClass = "w-4 h-4 rounded focus:ring-blue-500 focus:ring-2";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-start">
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? `${tailwindClass} bg-white input-error`
              : `${tailwindClass}`
          }
        />
        <label className="text-sm max-w-xs">{label}</label>
      </div>

      {meta.touched && meta.error && (
        <span className="text-sm font-medium text-red-500">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomCheckbox;
