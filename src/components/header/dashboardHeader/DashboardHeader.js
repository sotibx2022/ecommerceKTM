import { GrLanguage } from "react-icons/gr";
import Search from "../../search/Search";
import { MdDarkMode } from "react-icons/md";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { IoIosNotifications, IoMdChatbubbles } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import AccountDetails from "../../AccountDetails/AccountDetails";
import "./DashboardHeader.css";
import logo from "../../../assets/ecommerceKTM Logo.png";
import { Link } from "react-router-dom";


const DashboardHeader = () => {
  

  return (
    <div className="navbar">
      <div className="wrapper">
      <div className="logo">

      </div>
      <div className="logo">
      <Link to="/dashboard">
          <img src={logo} alt="ecommerce KTM Logo"></img>
        </Link>
        </div>
        <div className="dashboardSearch">
        
          <Search/>
        </div>
        <div className="items">
          <div className="item">
            <GrLanguage className="icon" />
            English
          </div>
          <div className="item">
            <MdDarkMode
              className="icon"
             
            />
          </div>
          <div className="item">
            <AiOutlineFullscreenExit className="icon" />
          </div>
          <div className="item">
            <IoIosNotifications className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <IoMdChatbubbles className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <CiBoxList className="icon" />
          </div>
          <div className="item">
          
          <AccountDetails/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;