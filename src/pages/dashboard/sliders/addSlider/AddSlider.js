import React, { useEffect, useState } from "react";
import { UploadImage } from "../../../../components";
import { uniqueID } from "../../../../functions/Functions";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import {
  fetchSingleDataFromFireBase,
  setDataToFireBase,
  updateSingleDataToFireBase,
} from "../../../../firebase/firebaseFunctions";

const AddSlider = () => {
  const [sliderUrl, setSliderUrl] = useState("");
  const [sliderTitle, setSliderTitle] = useState("");
  const [sliderDescription, setSliderDescription] = useState("");

  const [imageUrlFromDb, setImageUrlFromDb] = useState("");
  const receiveUrlFromChild = (url) => {
    setSliderUrl(url);
  };
  const { editId } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (sliderUrl === "") {
      toast.error("Please upload the image first");
    } else {
      const id = uniqueID();
      setDataToFireBase("Sliders", id, {
        sliderTitle,
        sliderDescription,
        sliderUrl,
        id,
      });
    }
  };

  useEffect(() => {
    if (editId) {
      fetchSingleDataFromFireBase("Sliders", editId).then((data) => {
        setSliderTitle(data.sliderTitle);
        setSliderDescription(data.sliderDescription);
        setSliderUrl(data.sliderUrl);
        setImageUrlFromDb(data.sliderUrl);
      });
    }
  }, [editId]);

  const updateHandler = (e) => {
    e.preventDefault();
    const updatedData = {
      sliderDescription: sliderDescription,
      sliderTitle: sliderTitle,
      sliderUrl: sliderUrl,
    };
    updateSingleDataToFireBase("Sliders", editId, updatedData);
  };
  return (
    <div className="addSliderContainer container">
      <UploadImage
        sendUrlToParent={receiveUrlFromChild}
        imageUrlFromDb={imageUrlFromDb}
        imageFolder="SLIDERIMAGES/"
      />
      <form>
        <input
          type="text"
          placeholder="Enter Slider Title"
          value={sliderTitle}
          onChange={(e) => setSliderTitle(e.target.value)}
        ></input>
        <textarea
          placeholder="Enter Slider Description"
          value={sliderDescription}
          onChange={(e) => setSliderDescription(e.target.value)}
        ></textarea>

        {editId ? (
          <button onClick={updateHandler}>Update</button>
        ) : (
          <button onClick={submitHandler}>Submit</button>
        )}
      </form>
    </div>
  );
};

export default AddSlider;
