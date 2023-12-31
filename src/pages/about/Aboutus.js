
import { howToUseApp } from "./aboutAPI";
import aboutImg2 from "../../assets/About/aboutImage2.jpg";

import "./About.css";
const Aboutus = () => {
  return (
    <>
      <section className="common-section our-services commonSection1">
        {/* 1section right side data  */}
        <div className="our-services-list">
          <h3 className="mini-title">
            -- AVAILABLE 24 x 7 ALL OVER KATHMANDU VALLY
          </h3>
          

          {howToUseApp.map((curElem) => {
            const { id, title, info } = curElem;
            return (
             
                <div className="our-services-info" key={id}>
                  <div className="our-services-title">
                  <span>{id}</span>
                  <h2 className="aboutPageTitle">{title}</h2>
                  </div>
                  <div className="our-services-data">
                  
                    <p className="main-hero-para">{info}</p>
                  </div>
                </div>
          
            );
          })}
        </div>
        <div className="our-service-rightside-img">
          <img src={aboutImg2} alt="aboutusIMg" className="aboutusImg" />
        </div>
      </section>

 

    
    </>
  );
};

export default Aboutus;
