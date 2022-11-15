import React from "react";

// Components
import CustomButton from "./CustomButton";

const Pagination = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-4">
      {pages.map((page, index) => (
        <CustomButton
          key={index}
          type="button"
          variant={page === currentPage ? "primary" : "secondary"}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </CustomButton>
      ))}
    </div>
  );
};

export default Pagination;
