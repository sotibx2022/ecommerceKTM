import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../components';
import "./CartSummary.css";
const CartSummary = (props) => {
    const [subTotal, setSubTotal] = useState(0)
  const[totalPrice,setTotalPrice] = useState(0)
    const cartArray = useSelector((state) => state.cart.cartArray);
    const[loading,setLoading] = useState(false)
    const navigate=useNavigate()
    const findSubTotal = () => {
      console.log(cartArray)
      setLoading(true)
        const initialSubTotal = cartArray.reduce((accumulator, cartItem) => {
          return accumulator + (cartItem.product.price*cartItem.quantity|| parseInt(cartItem.product.productPrice*cartItem.quantity));
        }, 0);
        setSubTotal(initialSubTotal);
        console.log(initialSubTotal);
        setTotalPrice(initialSubTotal + 100)
        props.sendValueToParent(initialSubTotal + 100);
        setLoading(false)
      }
      useEffect(()=>{
        findSubTotal()
      },[cartArray])
  return (
    <div>
        {loading ? <Loader /> : <div className="cartSummary container">
            <h1><span>Cart Summary</span></h1>
            <div className='cartSummaryItem'><span>Number of items</span><p>{cartArray.length}</p></div>
            <div className='cartSummaryItem'><span>Sub Total</span> <p>$ {subTotal}</p></div>
            <div className='cartSummaryItem'><span>Shipping Price</span> <p>$100</p> </div>
            <div className='cartSummaryItem'><span>Total</span> <p>$ {totalPrice}</p></div>
            {props.button && <button onClick={()=>navigate("/shipping")}>Order Now</button>}
          </div>}
    </div>
  )
}

export default CartSummary