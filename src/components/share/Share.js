import React, { useState } from "react";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import "./Share.css";
import { CiShare1 } from "react-icons/ci";

const Share = () => {
  const [showShare, setShowShare] = useState(false);
 
  return (
    <div className="shareArea" onClick={() => setShowShare(!showShare)}>
      <CiShare1/>
      {showShare &&  (
        <div className="socialMedias">
          <h6>Share Via</h6>
          <FaFacebook size={32} style={{ color: "#3b5998" }}   onClick={() => window.open("https://www.facebook.com", "_blank", "width=600,height=400")}/>
          <FaWhatsapp size={32} style={{ color: "#25D366" }}    onClick={() => window.open("https://www.whatsapp.com","_blank", "width=600,height=400")}/>
          <FaTwitter size={32} style={{ color: "#1DA1F2" }}   onClick={() => window.open("https://www.twitter.com","_blank", "width=600,height=400")}/>
        </div>
      )}
    </div>
  );
};

export default Share;
