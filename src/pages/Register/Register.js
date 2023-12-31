import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { uniqueID } from "../../functions/Functions";
import registerImage from "../../assets/ecommerceKTM Register.jpg";
import "./Login.css";
import { registerData } from "./RegisterAndLoginData";
import Input from "../../components/input/Input";

const Register = () => {
  const [registerValue, setRegisterValue] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = uniqueID();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterValue({ ...registerValue, [name]: value });
  };

  const submitHandler = async (e) => {
    const { displayName, email, password, confirmPassword } = registerValue;
    e.preventDefault();
    if (
      displayName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please enter all the fields");
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password Doesnot match");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((currentUser) => {
          if (currentUser) {
            const { email, uid } = currentUser.user;
            const userDetails = {
              userEmail: email,
              displayName: displayName,
              userId: uid,
              parentId: id,
              shippingName: "",
              shippingAddress: "",
              shippingCity: "",
              shippingState: "",
              shippingPhone: "",
            };

            setDoc(doc(db, "USERS", id), userDetails);
            dispatch(setUser(userDetails));

            toast.success("Registration SuccessFull");
            navigate("/");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <div>
      <div className="registerArea container">
        <form onSubmit={submitHandler} className="loginForm">
          <h2>
            Already Have an Account.{" "}
            <Link to="/login">
              <span className="registerHere">Login Here</span>
            </Link>
          </h2>
          {registerData.map((data, index) => {
            return (
              <Input
                key={index}
                {...data}
                value={registerValue[data.name]}
                onChange={handleInputChange}
              />
            );
          })}

          <button type="submit" className="loginBtn">
            Register
          </button>
        </form>
        <div className="registerAreaRight">
          <img src={registerImage} className="loginImage" alt="loginLeft"></img>
        </div>
      </div>
    </div>
  );
};

export default Register;
