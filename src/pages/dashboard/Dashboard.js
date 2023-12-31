import React from "react";
import "./Dashboard.css";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
const Dashboard = () => {
  return (
    <div>
      <div className="dashboardContainer container">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <Featured />
      </div>
    </div>
  );
};

export default Dashboard;
