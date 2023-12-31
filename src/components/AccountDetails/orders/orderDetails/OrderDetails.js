import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleDataFromFireBase } from "../../../../firebase/firebaseFunctions";
import Loader from "../../../loader/Loader";
import "./OrderDetails.css";
const OrderDetails = () => {
  useEffect(() => {
    fetData();
  }, []);
  const [selectedOrder, setSelectedOrder] = useState({});
  const { orderId } = useParams();
 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [grandTotal, setGrandTotal] = useState(0);
  const fetData = async () => {
    setLoading(true);
    const orderFromDB = await fetchSingleDataFromFireBase("Orders", orderId);

    setSelectedOrder(orderFromDB);
    setLoading(false);
  };
  const calculateGrandTotal = () => {
    const selectedOrderinArray = [selectedOrder];
  
    const GrandTotal = selectedOrderinArray.reduce((accumulator, item) => {
      return (accumulator = accumulator + item.totalPrice);
    }, 0);
   
    setGrandTotal(GrandTotal);
  };
  useEffect(() => {
    calculateGrandTotal();
  }, [selectedOrder]);
  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <h1>Address Details</h1>
            <p>Ordered By: {selectedOrder.fullName}</p>
            <p>Contact Number: {selectedOrder.contactNumber}</p>
            <p>Address: {selectedOrder.address}</p>
            <p>City: {selectedOrder.city}</p>
            <p>State: {selectedOrder.state}</p>
          </div>
          <h2>Product Details</h2>

          <div className="productDetails">
            {selectedOrder.cartArray !== undefined ? (
              <table>
                <thead>
                  <tr>
                    <th className="cartIdTitle">Cart ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Discount Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.cartArray.map((item, index) => (
                    <tr key={index}>
                      <td className="cartIdInfo">{item.cartId}</td>
                      <td
                        onClick={() => {
                          if (item.product.id) {
                            navigate(
                              `/allproducts/productdetails/${item.product.title}/${item.product.id}`
                            );
                          } else {
                            navigate(
                              `/newproducts/newproductdetails/${item.product.productName}/${item.product.productId}`
                            );
                          }
                        }}
                      >
                        {item.product.title || item.product.productName}
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.discountPrice}</td>
                      <td>{item.totalPrice}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="5" className="total">
                      GrandTotal with Shipping Price :{grandTotal}
                    </td>{" "}
                  </tr>
                </tbody>
              </table>
            ) : (
              <h1>Cart Array is not Defined!</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
