import DashboardHeader from "../../header/dashboardHeader/DashboardHeader"
import DashboardSideBar from "../dashboardSideBar/DashboardSideBar"

import "./DashboardLayout.css";


const DashboardLayout = ({children}) => {
  return (
    <div className="dashboardLayout">
     <DashboardHeader/>
    <div className="dashboardItems">
   
    <div className="dashboardChildren">{children}</div>
    <DashboardSideBar/>
    </div>
    
   </div>
  )
}

export default DashboardLayout

