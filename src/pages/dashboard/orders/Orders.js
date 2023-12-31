import React, { useEffect, useState } from "react";
import { getAllDataFromFireBase } from "../../../firebase/firebaseFunctions";

import { Loader } from "../../../components";
import { useNavigate } from "react-router-dom";


const Orders = () => {

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true)
   const allOrders = await getAllDataFromFireBase("Orders");
   if(allOrders){
    setOrders(allOrders)
    setLoading(false)
   }
  };
  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <table>
            <thead>
            
              <tr>
                <th>SN</th>
                <th>Ordered By</th>
                <th>Ordered On</th>
                <th>ordered From</th>
                <th>BuyerContact</th>
                <th>BuyerEmail</th>
                <th>OrderedItems</th>
                <th>TotalPrice</th>
                <th>Status</th>
                <th>More Details</th>
              </tr>
            </thead>
            {orders.map((order, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order.fullName}</td>
                    <td>{order.orderedTime}</td>
                    <td>{`${order.address},${order.city},${order.state}`}</td>
                    <td>{order.contactNumber}</td>
                    <td>{order.userEmail}</td>
                    <td>{order.cartArray.length}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {" "}
                      <select>
                        <option>Pending</option>
                        <option>Delivered</option>
                        <option>Dispatched</option>
                      </select>
                    </td>

                    <td
                      onClick={() => navigate(`/orderdetails/${order.orderId}`)}
                    >
                      See More
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
