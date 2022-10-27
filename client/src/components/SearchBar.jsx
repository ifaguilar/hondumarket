import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => (
  <form className="relative">
    <input
      type="text"
      className="w-96 h-12 rounded-md px-5 bg-gray-100 placeholder-gray-500 focus:bg-white focus:shadow-[inset_0_0_0_2px_rgba(59,130,246,1)] outline-0 text-sm transition hover:shadow-[inset_0_0_0_2px_rgba(209,213,219,1)]"
      placeholder="Buscar productos..."
    />

    <button
      type="submit"
      aria-label="Buscar"
      className="absolute right-0 rounded-md p-4 text-gray-500"
    >
      <BsSearch />
    </button>
  </form>
);

export default SearchBar;
