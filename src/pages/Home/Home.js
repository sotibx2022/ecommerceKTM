import React from "react";
import {
  Hero,
  Products,
  Filter,
  HeroSidebar,
} from "../../components/index";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="heroArea">
        <Hero />
      </div>
      <div className="container ProductsArea">
        <div className="homeSideBar">
          <Filter />
          <HeroSidebar />
        </div>

        <Products />
      </div>
    </div>
  );
};

export default Home;
