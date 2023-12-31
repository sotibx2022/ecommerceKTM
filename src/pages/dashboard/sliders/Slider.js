import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteDataFromFireBase,
  getAllDataFromFireBase,
} from "../../../firebase/firebaseFunctions";
import "./Slider.css"
import { CiEdit } from "react-icons/ci";

import { MdDelete } from "react-icons/md";

const Slider = () => {
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const allSliders = await getAllDataFromFireBase("Sliders");
    setSliders(allSliders);
  };
  const deleteHandler = async (id) => {
    deleteDataFromFireBase("Sliders", id);
    fetchData();
  };

  return (
    <div className="container">
      <div className="sliderHeader">
        <h1>Add Slider</h1>
        <button onClick={() => navigate("/dashboard/addslider")}>Add</button>
      </div>
      <div className="slidersBody">
        <table>
          <thead className="sliderTableHeading">
            <tr>
         
              <td>Slider Image</td>
              <td>Slider Title</td>
              <td>Slider Description</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {sliders &&
              sliders.map((slider) => {
                return (
                  <tr key={slider.id}>
                   
                    <td>
                      <img
                        src={slider.sliderUrl}
                        className="sliderListImage"
                        alt="sliderListImage"
                      ></img>
                    </td>
                    <td>{slider.sliderTitle}</td>
                    <td>{slider.sliderDescription}</td>
                    <td>
                      <div className="sliderActions">
                        <button
                          onClick={() => navigate(`editSlider/${slider.id}`)}
                        >
                          <CiEdit />
                        </button>
                        <button onClick={() => deleteHandler(slider.id)}>
                        <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Slider;
