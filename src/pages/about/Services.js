
import { serviceapi } from "./aboutAPI";

import "./About.css";
const Services = () => {
 
  return (
    <>
      <section className="service-main-container">
        <div className="container service-container">
          <h1 className="main-heading text-center fw-bold">
            Features
          </h1>
          <div className="featuresContainer">
            {serviceapi.map((curElem) => {
              const { id, logo, title, info } = curElem;
              return (
               
                  <div
                    className="work-container-subdiv"
                    key={id}>
                    <span className="servicesLogo">{logo}</span>
                    <h2 className="sub-heading">{title}</h2>
                    <p className="main-hero-para">{info}</p>
                  </div>
              
              );
            })}
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Services;
