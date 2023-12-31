import React, { useEffect, useState } from "react";
import {getAllDataFromFireBase,} from "../../../firebase/firebaseFunctions";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import "./Orders.css";
const Orders = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const allOrders = await getAllDataFromFireBase("Orders");
    if (allOrders) {
     
      const initialFilteredOrders = allOrders.filter((order) => {
        return order.userEmail === currentUser.userEmail;
      });
    
      setSelectedOrders(initialFilteredOrders);
      setTotalPages(Math.ceil(initialFilteredOrders.length / 20));
      
      setLoading(false);
    } else if (allOrders.length < 1) {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th className="orderNumberTitle">OrderNumber</th>
              <th>Ordered Date</th>
              <th>Ordered Items</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrders
              .slice((currentPage - 1) * 20, currentPage * 20)
              .map((order, index) => {
                return (
                  <tr className="orderContainer" key={index}>
                    <td>{(currentPage - 1) * 20 + index + 1}</td>
                    <td className="orderNumberInfo">{order.orderId}</td>
                    <td>{order.orderedTime}</td>
                    <td>{order.cartArray.length}</td>
                    <td>$ {order.totalPrice}</td>
                    <td>
                      <span className="pending">pending</span>
                    </td>
                    <td
                      onClick={() => navigate(`/orderdetails/${order.orderId}`)}
                    >
                      Details...
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="navigations">
          {Array.from({ length: totalPages }).map((page, index) => {
            return (
              <div
                key={index}
                className={
                  index + 1 === currentPage
                    ? "activeNavigation navigation"
                    : "navigation"
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Orders;
