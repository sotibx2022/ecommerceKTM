import { useSelector } from "react-redux"




export const RegisteredUser = ({ children }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
 
    if (currentUser === "") {
      window.location.href="/register"
      return null;
    } else {
      return children;
    }
  };
  export const RegisteredAdmin = ({children}) =>{
    const currentUser = useSelector((state)=>state.user.currentUser);
    if(currentUser.userEmail !=="sbinayaraj@gmail.com"){
        window.location.href="/";
        return null
    }else{
        
        return children;
    }
  }