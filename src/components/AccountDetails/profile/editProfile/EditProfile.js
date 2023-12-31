import React, { useEffect, useState } from "react";
import { profileDatas } from "../profileDatas";
import "./EditProfile.css";
import {
  getAllDataFromFireBase,
  updateSingleDataToFireBase,
} from "../../../../firebase/firebaseFunctions";
import { useSelector } from "react-redux";
import UploadImage from "../../../uploadImage/UploadImage";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../../redux/userSlice";
import toast from "react-hot-toast";
import Loader from "../../../loader/Loader";

const EditProfile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zone: "",
    district: "",
    country: "Nepal",
    imageUrl: "",
  });
  const [profileUrl, setProfileUrl] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const receiveUrlFromChild = (url) => {
    setProfileUrl(url);
  };
  const changeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userEmail } = currentUser;
  const fetchData = async () => {
    setLoading(true);
    const allUsers = await getAllDataFromFireBase("USERS");
    if (allUsers) {
      const data = allUsers.find((user) => {
        return user.userEmail === userEmail;
      });
      if (data) {
        const id = data.parentId;

        setParentId(id);
        setProfileDetails({
          ...profileDetails,
          name: data.displayName,
          email: data.userEmail,
          phone: data.userPhone ? data.userPhone : "",
          zone: data.Zone ? data.Zone : "",
          address: data.Address ? data.Address : "",
          district: data.District ? data.District : "",
          imageUrl: data.userImageUrl ? data.userImageUrl : "",
          shippingName: data.displayName,
          shippingAddress: data.Address ? data.Address : "",
          shippingZone: data.Zone ? data.Zone : "",
          shippingDistrict: data.District ? data.District : "",
          shippingPhone: data.userPhone ? data.userPhone : "",
        });
        setLoading(false);
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (profileUrl === "") {
      toast.error("Please upload you profile Picture First");
    } else {
      const updatedData = {
        displayName: profileDetails.name,
        updated: true,
        userImageUrl: profileUrl,
        userPhone: profileDetails.phone,
        Zone: profileDetails.zone,
        Address: profileDetails.address,
        District: profileDetails.district,
      };

      updateSingleDataToFireBase("USERS", parentId, updatedData);
      updateUser(updatedData);
      navigate("/profile");
    }
  };
  return (
    <div className="editProfileContainer container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <UploadImage
            sendUrlToParent={receiveUrlFromChild}
            imageFolder="Products/"
            imageUrlFromDb={profileDetails.imageUrl}
          />
          <form onSubmit={submitHandler} className="editProfileForm">
            {profileDatas.map((profileData, index) => {
              return (
                <div className="formItem" key={index}>
                  <label>{profileData.label}</label>
                  <input
                    {...profileData.input}
                    value={profileDetails[profileData.input.name]}
                    onChange={changeHandler}
                  ></input>
                </div>
              );
            })}
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
