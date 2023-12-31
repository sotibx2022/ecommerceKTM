import React from "react";
import ReactDOM from "react-dom";
import "./Loader.css";

const Loader = () => {
  document.addEventListener("DOMContentLoaded", function () {
    var loader = document.querySelector(".loaderContainer");
    loader.remove();
  });

  return ReactDOM.createPortal(
    <div className="loaderContainer">
      <div className="loader">
        <div className="loaderCube"></div>
        <div className="loaderCube secondLoaderCube"></div>
        <div className="loaderCube thirdLoaderCube"></div>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
