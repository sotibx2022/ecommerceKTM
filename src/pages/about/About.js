import React from "react";
import "./About.css";
import {

  HowItWorks,
  Aboutus,
  Services,

} from "./index";
import "./About.css"
const About = () => {
  return (
    <div className="container aboutUsContainer">
     
      <HowItWorks />
      <Aboutus />
      <Services />
    
     
    </div>
  );
};

export default About;
