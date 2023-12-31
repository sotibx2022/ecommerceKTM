import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDataFromFireBase } from '../../../firebase/firebaseFunctions';
import "./ResponsiveAccountDetails.css";
import { FaBullseye } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../../redux/userSlice';
import { resetCart } from '../../../redux/cartSlice';
const ResponsiveAccountDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.currentUser);
    const { parentId } = currentUser;
    const [userData, setUserData] = useState({})

    const fetchData = async() =>{
        const userDetails = await fetchSingleDataFromFireBase("USERS", parentId);
        setUserData(userDetails)
      }
      useEffect(()=>{
        fetchData()
       },[])
       const logOut =() =>{
        navigate("/")
        dispatch(removeUser())
        dispatch(resetCart())
      }
  return (
    <div className='responsiveAccountDetails'>
    <div className='row'>
         <div className="responsiveAccountDetailsLeft">
        <img
          src={`${
                userData.userImageUrl? userData.userImageUrl
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }`}
          alt="accountProfile"
          className="responsiveAccountImage"
        />
      </div>
      <div className='responsiveAccoutDetailsRight'>
        <h2>{userData.displayName}</h2>
      </div>
      </div>
      <div className='row'>
      <ul>
        <li onClick={()=>navigate("/profile")}>
        <FaBullseye />
        View Details
        </li>
        <li onClick={logOut}><IoMdLogOut />
        Logout</li>
      </ul>
        <p></p>
        <p></p>
      </div>
    </div>
  )
}

export default ResponsiveAccountDetails