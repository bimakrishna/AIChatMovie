import React from "react";
import "./style.css";
import { FiHeart } from "react-icons/fi";

export default function Card({ title, year, id, onClick, onPress, favorited }) {
  return (
    <div className="element">
      <p className="titleWrapping" onClick={onPress}>
        {title}
      </p>
      <p className="otherWrapping">{year}</p>
      <p className="otherWrapping">{id}</p>
      <FiHeart
        className="heartWrapping"
        style={{ fill: favorited ? "red" : "black" }}
        onClick={onClick}
      />
    </div>
  );
}
