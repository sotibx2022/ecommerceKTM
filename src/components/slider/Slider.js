import React, { useEffect, useState } from "react";
import { getAllDataFromFireBase } from "../../firebase/firebaseFunctions";
import "./Slider.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transformValue, setTransformValue] = useState(0);

  const [i, seti] = useState(0);
  useEffect(() => {
    const fetchDataFromDb = async () => {
      const allSliders = await getAllDataFromFireBase("Sliders");
      setSliders(allSliders);
    };
    fetchDataFromDb();
  }, []);
  const changeSlider = (index) => {
    setCurrentSlide(index);
    setTransformValue(-index * 100);
  };
  const nextSlider = () => {
    if (i <= sliders.length - 1) {
      setCurrentSlide(i);
      setTransformValue(-(i + 1) * 100);
      seti(i + 1);
    }
  };

  const prevSlider = () => {
    if (i > 0) {
      seti(i - 1);
      setCurrentSlide(i - 1);
      setTransformValue(-(i - 1) * 100);
    }
  };
  return (
    <div className="sliders">
      {sliders &&
        sliders.map((slider, index) => {
          return (
            <div key={index} className="singleSlide">
              <div
                className={`sliderItem ${
                  currentSlide === index ? "activeSlide" : ""
                }`}
                style={{ transform: `translateX(${transformValue}%)` }}
              >
                <img src={slider.sliderUrl} alt="Slider"></img>
                
              </div>
            </div>
          );
        })}
      <div className="sliderButtons">
        <button
          className="sliderPrevious"
          onClick={prevSlider}
          disabled={i <= 0}
        >
          <GrFormPrevious />
        </button>
        <button
          className="sliderNext"
          onClick={nextSlider}
          disabled={i >= sliders.length - 1}
        >
          <MdNavigateNext />
        </button>
      </div>
      <div className="identifierCollection">
        {sliders &&
          sliders.map((slider, i) => {
            return (
              <div
                className={`sliderIdentifier ${
                  currentSlide === i ? "activeIndicator" : ""
                }`}
                onClick={() => changeSlider(i)}
                key={i}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default Slider;
