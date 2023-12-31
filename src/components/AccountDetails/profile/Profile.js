import { useSelector } from "react-redux";
import "./Profile.css";
import { useEffect, useState } from "react";

import {getAllDataFromFireBase,} from "../../../firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userEmail } = currentUser;
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const allUsers = await getAllDataFromFireBase("USERS");
    if (allUsers) {
      const singleProfileData = allUsers.find((user) => {
        return user.userEmail === userEmail;
      });
      setProfileData(singleProfileData);
      setLoading(false);
    }
  };

  return (
    <div>
     {loading? <Loader /> : <div className="profileContainer container">
        <div className="profileImageArea">
          <img
            src={
              profileData.userImageUrl
                ? profileData.userImageUrl
                : "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
            }
            alt="profileDummy"
            className="profileDummy"
          />
          <div className="profileButtons">
            <button
              onClick={() => navigate("/orders")}
              className="profileButton"
            >
              {" "}
              Orders
            </button>
            <button
              onClick={() => navigate("/reviews")}
              className="profileButton"
            >
              {" "}
              Reviews
            </button>
            <button
              onClick={() => navigate("/profile/Edit")}
              className="profileButton"
            >
              {" "}
              Edit
            </button>
          </div>
        </div>

        <div className="flexItems ">
          <div className="flex">
            <p className="profileTitle">Name</p>
            <p>{profileData.displayName}</p>
          </div>
          <div className="flex">
            <p className="profileTitle">Email</p>
            <p>{profileData.email}</p>
          </div>
          <div className="flex">
            <p className="profileTitle">Phone</p>
            <p>{profileData.userPhone ? profileData.userPhone : "N/A"}</p>
          </div>
          <div className="flex">
            <p className="profileTitle">Address</p>
            <p>{profileData.Address ? profileData.Address : "N/A"}</p>
          </div>
          <div className="flex">
            <p className="profileTitle">District</p>
            <p>{profileData.District ? profileData.District : "N/A"}</p>
          </div>
          <div className="flex">
            <p className="profileTitle">Zone</p>
            <p>{profileData.Zone ? profileData.Zone : "N/A"}</p>
          </div>
        </div>
      </div>}
    </div>
  );
};
export default Profile;
