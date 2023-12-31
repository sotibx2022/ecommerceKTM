import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import googleIcon from "../../assets/google.png";
import loginImage from "../../assets/ecommerceKTM login.jpg";
import "./Login.css";
import { loginData } from "./RegisterAndLoginData";
import Input from "../../components/input/Input";

const Login = () => {
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserDetails = async (documentId) => {
    console.log("fired");
    console.log(documentId);
    try {
      const usersCollectionRef = collection(db, "USERS");
      const q = query(usersCollectionRef, where("userId", "==", documentId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        const { displayName, uid, updated, userImageUrl, userPhone, id } =
          userData;
        const userDetails = {
          userEmail: loginValue.email,
          displayName: displayName,
          userId: uid,
          updated: updated,
          userImageUrl: userImageUrl,
          userPhone: userPhone,
          parentId: id,
        };
        dispatch(setUser(userDetails));
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;

    setLoginValue({ ...loginValue, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginValue.email, loginValue.password)
      .then((result) => {
        if (result) {
          const userId = result.user.uid;

          getUserDetails(userId);
          toast.success("Login Success");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoginValue({ email: "", password: "" });
      });
  };
  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((currentUser) => {
        if (currentUser) {
          toast.success("Login Successfully");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="loginArea container">
      <div className="loginAreaLeft">
        <img src={loginImage} className="loginImage" alt="loginLeft"></img>
      </div>
      <div className="loginContainer">
        <form onSubmit={submitHandler} className="loginForm">
          <h2>
            Still Account Not created{" "}
            <Link to="/register">
              <span className="registerHere">Register Here</span>
            </Link>
          </h2>
          {loginData.map((data, index) => {
            return (
              <Input
                {...data}
                value={loginValue[data.name]}
                onChange={onChange}
                key={index}
              />
            );
          })}

          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
        <div className="loginOptions">
          <div onClick={signInWithGoogle} className="loginWithGoogle">
            <img src={googleIcon} alt="googleIcon" className="googleIcon" />
            <h3>Login With Google</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
