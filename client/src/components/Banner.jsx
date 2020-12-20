import React from "react";

export default function Banner({ children, title, subtitle }) {
  return (
    <div className="banner">
      <h4> {title} </h4>   
      <div></div>
      <p> {subtitle}</p>
      {children}
    </div>
  );
}
