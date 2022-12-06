import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const ShowSellerReviews = ({ sellerID }) => {
  const [reviews, setReviews] = useState([]);

  const fetchSellerReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${sellerID}/reviews`
      );

      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchSellerReviews();
  }, []);

  const getReviewsContent = () => {
    return (
      <>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-4 gap-8">
            <p className="font-medium">Fecha</p>
            <p className="font-medium">Usuario</p>
            <p className="font-medium">Rating</p>
            <p className="font-medium">Comentario</p>
          </div>
          {reviews.map((review, index) => (
            <div className="grid grid-cols-4 gap-8" key={index}>
              <p>
                {new Intl.DateTimeFormat("es-HN", {
                  dateStyle: "short",
                }).format(new Date(review.modified_at))}
              </p>
              <p>
                {review.first_name} {review.last_name}
              </p>
              <div className="flex items-center gap-2">
                <p>
                  {Number.parseFloat(review.rating_value).toFixed(
                    review.rating_value % 1 === 0 ? 0 : 1
                  )}
                  /5
                </p>
                <div className="flex gap-1">
                  {Array(5)
                    .fill(1)
                    .map((rating, idx) => (
                      <AiFillStar
                        style={{
                          color: `${
                            idx < review.rating_value ? "orange" : "gray"
                          }`,
                        }}
                      />
                    ))}
                </div>
              </div>
              <p className="break-all">{review.description}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      {(!reviews || reviews.length == 0) && (
        <div>
          <h1>Este vendedor no tienen ninguna review aún.</h1>
        </div>
      )}
      {reviews.length > 0 && getReviewsContent()}
    </>
  );
};

export default ShowSellerReviews;
