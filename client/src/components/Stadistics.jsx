import React from "react";
import { Link } from "react-router-dom";

// Icons
import { IconContext } from "react-icons";
import { BsChevronRight } from "react-icons/bs";

const Stadistics = ({ color, count, title, link, text }) => (
  <div className={`bg-${color}-600/90 text-white rounded-lg shadow-lg`}>
    <div className="p-8">
      <span className="text-6xl font-bold">{count}</span>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <Link
      to={`${link}`}
      className="flex items-center justify-between px-8 py-4 border-t border-white/20"
    >
      <p>Manejo de {text}</p>
      <IconContext.Provider
        value={{
          className: "text-white",
          size: "16px",
        }}
      >
        <BsChevronRight />
      </IconContext.Provider>
    </Link>
  </div>
);

export default Stadistics;
