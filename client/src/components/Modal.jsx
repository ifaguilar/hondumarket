import React from "react";

// Icons
import { BsXLg } from "react-icons/bs";

const Modal = ({ open, close, children }) => {
  if (!open) return null;
  return (
    <div className="bg-black bg-opacity-70 flex items-center justify-center w-full h-screen fixed overflow-hidden z-50">
      <div className="bg-white rounded p-16 absolute w-1/2 h-2/3 overflow-y-scroll">
        <BsXLg
          className="sticky left-full top-0 cursor-pointer"
          onClick={close}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
