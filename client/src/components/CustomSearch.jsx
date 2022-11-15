import React from "react";

// Icons
import { BsSearch } from "react-icons/bs";

const CustomSearch = ({ onChange, innerRef }) => (
  <form className="flex flex-col gap-4 relative">
    <label htmlFor="search">Búsqueda</label>
    <input
      className="w-full h-14 rounded-md px-5 bg-gray-100 placeholder-gray-500 focus:bg-white focus:shadow-[inset_0_0_0_2px_rgba(59,130,246,1)] outline-0 text-sm transition hover:shadow-[inset_0_0_0_2px_rgba(209,213,219,1)]"
      type="text"
      name="search"
      placeholder="Buscar productos..."
      onChange={onChange}
      ref={innerRef}
    />

    <button
      type="submit"
      aria-label="Buscar"
      className="absolute bottom-0 right-0 rounded-md p-5 text-gray-500"
    >
      <BsSearch />
    </button>
  </form>
);

export default CustomSearch;
