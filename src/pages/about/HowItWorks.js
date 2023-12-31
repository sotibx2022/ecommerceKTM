
import { workapi } from "./aboutAPI";


import "./HowItWorks.css";
const HowItWorks = () => {
  return (
    <>
      <section className="howItWorks">
        {workapi.map((curElem,index) => {
          const {logo, title, info } = curElem;
          return (
         
              <div className=" about-container-subdiv" key={index}>
                <div className="aboutTitle">
                  <div className="aboutIcon">{logo}</div>
                  <h2 className="sub-heading">{title}</h2>
                </div>
                <p className="main-hero-para w-100">{info}</p>
              </div>
          
          );
        })}
      </section>
    </>
  );
};

export default HowItWorks;
