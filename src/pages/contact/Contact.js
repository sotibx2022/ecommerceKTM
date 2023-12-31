import React, { useState } from "react";
import "./Contact.css";
import ContactImage from "../../assets/Contact Image.jpg";
import { contactData } from "./contactData";
import Input from "./../../components/input/Input";
import "./Contact.css";
import toast from "react-hot-toast";

const Contact = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    subject: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };
  const submitContactForm = (e) => {
    e.preventDefault();
    if (message === "" || !isChecked) {
      toast.error("Please enter all the fields.");
    } else {
      const contactFormData = { userData, message };
      fetch(
        "https://ecommerce-ktm-default-rtdb.firebaseio.com/ContactFormData.json",
        {
          method: "POST",
          body: JSON.stringify(contactFormData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response) {
            toast.success("Details Submitted Successfully");
            setUserData({
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              address: "",
              subject: "",
            });
            setMessage("");
          }
        })
        .catch((error) => {
          toast.error("Problem to send Data");
        });
    }
  };
  return (
    <>
      <section className="contactUs container">
        <div className="contactLeft">
          <h1 className="main-heading fw-bold">Connect With Our Sales Team.</h1>
          <p className="main-hero-para">
            Reach out to our amazing sales team and let them assist you with
            your needs!
          </p>
          <figure>
            <img
              src={ContactImage}
              alt="contatUsImg"
              className="ContactusImg"
            />
          </figure>
        </div>

        <div className="contactRight">
          <form>
            <div className="contactUsInputs">
              {contactData.map((data, index) => {
                return (
                  <Input
                    {...data}
                    value={userData[data.name]}
                    onChange={postUserData}
                    key={index}
                  />
                );
              })}
            </div>

            <textarea
              type="text"
              name="message"
              id=""
              className="contactUs-textArea"
              placeholder="Enter Your Message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <div className="contactCheckBox">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label className="form-check-label main-hero-para">
                I agree that the ecommerceKTM may contact me at the email
                address or phone number above
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-style"
              onClick={submitContactForm}
            >
              Sumbit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
