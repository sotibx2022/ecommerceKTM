import React, { useState } from "react";
import defaultSlider from "../../assets/sliderImages/defaultSlider.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import ImageLoader from "../imageLoader/ImageLoader";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import "./UploadImage.css";
const UploadImage = (props) => {
  const { imageUrlFromDb } = props;
  const { imageFolder } = props;
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { type } = props;

  const uploadHandler = (e) => {
    setFile(e.target.files[0]);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  };
  const uploadImage = (e) => {
    e.preventDefault();
    setLoading(true);
    const storageRef = ref(storage, imageFolder + Date.now() + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        if (progress === 100) {
          setLoading(false);
          toast.success("Upload SuccessFull");
        }
      },
      (error) => {
        toast.error("There is something went wrong to upload Image.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          props.sendUrlToParent(downloadURL);
        });
      }
    );
  };
  return (
    <div
      className={type === "profile" ? "profileUpload" : "uploadImageContainer"}
    >
      {loading ? (
        <ImageLoader progress={progress} />
      ) : (
        <div className="imageInputArea">
          <div className="imageArea">
            <img
              src={
                fileUrl !== ""
                  ? fileUrl
                  : imageUrlFromDb
                  ? imageUrlFromDb
                  : defaultSlider
              }
              className="defaultSlider"
              alt="defaultSlider"
            />
          </div>
          <form className="addImage" onSubmit={uploadImage}>
            <label htmlFor="fileInput">
              <span>📁</span> Browse Image
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={uploadHandler}
              style={{ display: "none" }}
            />
            <button type="submit" className="uploadBtn" disabled={file===null}>
              <FaUpload />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
