import React from "react";

import "./Loader.css";

const Loader = () => {
  document.addEventListener("DOMContentLoaded", function () {
    var loader = document.querySelector(".loaderContainer");
    loader.remove();
  });

  return(
    <div className="loaderContainer">
      <div className="loader">
        <div className="loaderCube"></div>
        <div className="loaderCube secondLoaderCube"></div>
        <div className="loaderCube thirdLoaderCube"></div>
      </div>
    </div>
  );
};

export default Loader;
