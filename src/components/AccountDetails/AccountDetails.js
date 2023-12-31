import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AccountDetails.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { ProfileOptions } from "../../components/index";
import {getAllDataFromFireBase,} from "../../firebase/firebaseFunctions";

const AccountDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isHover, setIsHover] = useState(false);
  const { userEmail } = currentUser;
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  
    const allUsers = await getAllDataFromFireBase("USERS");
    if (allUsers) {
      const userDetails = allUsers.find((user, index) => {
        return user.userEmail === userEmail;
      });
      setUserData(userDetails);
    }
  };

  return (
    <div className="accountDetails">
      <div className="accountDetailsLeft">
        {userData === null ? (
          ""
        ) : (
          <img
            src={`${
              userData.userImageUrl
                ? userData.userImageUrl
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }`}
            alt="accountProfile"
            className="accountProfile"
          />
        )}
      </div>
      <ul className="accountOptions">
        <li className="profile">
          <Link
            to="/profile"
            className="profile"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {currentUser.displayName}{" "}
            {isHover ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </Link>
          <div className="profileHover">
            <ProfileOptions />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AccountDetails;
