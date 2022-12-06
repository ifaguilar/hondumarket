import React from "react";
import { AiFillStar } from "react-icons/ai";

const SellerRating = ({rateAvg, reviewAmount, scale}) => {

    return (
        <div className="flex items-center flex-wrap gap-1" style={{ transform: `scale(${scale ?? 1})` }}>
            <p className="flex flex-nowrap items-center gap-1 text-xs text-slate-600">
                {Number.parseFloat(rateAvg).toFixed(rateAvg % 1 === 0 ? 0 : 1)}/5
                <AiFillStar
                    style={{ color: "orange", transform: "scale(1.1)" }}
                />
            </p>
            <p className="text-xs text-slate-600">({reviewAmount} reviews)</p>
        </div>
    );
};

export default SellerRating;
