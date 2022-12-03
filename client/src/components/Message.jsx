import React from "react";

// CSS
import "../css/message.css";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://i.pinimg.com/736x/77/93/bb/7793bb6e754b8a4da890956aa72af8ab.jpg"
          alt=""
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. ?
        </p>
      </div>
      <div className="messageBottom">Hace una hora</div>
    </div>
  );
}
