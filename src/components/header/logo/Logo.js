import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../../assets/ecommerceKTM Logo.png"
const Logo = () => {
    const navigate = useNavigate()
  return (
    <div className="logo" onClick={()=>navigate("/")}>
           
    <img
      src={logo}
      alt="ecommerce KTM Logo"
      className="logoImg"
    ></img>
 
</div>
  )
}

export default Logo