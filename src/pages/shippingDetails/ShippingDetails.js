import React, { useEffect, useState } from "react";
import "./ShippingDetails.css";
import { CartSummary } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDataFromFireBase,
  setDataToFireBase,
  updateSingleDataToFireBase,
} from "../../firebase/firebaseFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { uniqueID } from "../../functions/Functions";
import { resetCart } from "../../redux/cartSlice";


const ShippingDetails = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [contactNumber, setContactNumber] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const { parentId } = currentUser;
  const { userEmail } = currentUser;
  const cartArray = useSelector((state) => state.cart.cartArray);
  const orderId = uniqueID();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const users = await getAllDataFromFireBase("USERS");
    if(users){
      const selectedUser = users.find((user)=>{
        
        return user.userEmail === userEmail
      })
      if(selectedUser){
       
        setFullName(selectedUser.shippingName);
        setAddress(selectedUser.shippingAddress);
        setCity(selectedUser.shippingCity);
        setState(selectedUser.shippingState);
        setContactNumber(selectedUser.shippingPhone);
      }
    }
   
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName === "" || address === "" || city === "" || state === "" || contactNumber === "" || deliveryMethod === "") {
     toast.error("Please Fill All The required Fields !!")
    }
    else{
      setDataToFireBase("Orders", orderId, {
        cartArray,
        orderId,
        fullName,
        address,
        city,
        state,
        contactNumber,
        userEmail,
        totalPrice,
        orderedTime: new Date().toLocaleDateString(),
      });
      updateSingleDataToFireBase("USERS", parentId, {
        shippingName: fullName,
        shippingAddress: address,
        shippingCity: city,
        shippingState: state,
        shippingPhone: contactNumber,
      });
     
      navigate("/orders");
      if (userEmail) {
        dispatch(resetCart({ userEmail }));
      } else {
        // Handle the case when userEmail is undefined or null
      }
    };
    }
   
  const receiveValueFromChild = (value) => {
    setTotalPrice(value);
  };
  return (
    <div className="shippingDetailsContainer container">
      <div className="shipping-details">
        <h2>Shipping Information</h2>
        <p>
          Please enter the details of the person who will receive the material.
        </p>
        <form >
          <div className="formItem">
            <label htmlFor="email">Email</label>
            <input type="email" defaultValue={currentUser.userEmail} readOnly />
          </div>
          <div className="formItem">
          <label htmlFor="name">Full Name</label>
          
            <input
              type="text"
              id="name"
              name="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="formItem">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter your address"
            />
          </div>

          <div className="formItem">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Enter your city"
            />
          </div>

          <div className="formItem">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="Enter your state"
            />
          </div>
          <div className="formItem">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              placeholder="Enter your contact number"
            />
          </div>

          
          <div className="deliveryMethods">
          <h3>Delivery Method</h3>
            <label htmlFor="home-delivery" className="deliveryLabel">
              <input
                type="checkbox"
                id="home-delivery"
                name="delivery-method"
                value="home-delivery"
                required
                checked={deliveryMethod === "home-delivery"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Home Delivery
            </label>

            <label htmlFor="pickup" className="deliveryLabel">
              <input
                type="checkbox"
                id="pickup"
                name="delivery-method"
                value="pickup"
                required
                checked={deliveryMethod === "pickup"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Pickup
            </label>
          </div>
        
        </form>
        <button type="submit" onClick={handleSubmit}>Place Order</button>
      </div>
      <CartSummary button={false} sendValueToParent={receiveValueFromChild} />
    </div>
  );
};

export default ShippingDetails;
