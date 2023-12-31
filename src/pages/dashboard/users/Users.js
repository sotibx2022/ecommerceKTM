import React, { useEffect, useState } from "react";
import { getAllDataFromFireBase } from "../../../firebase/firebaseFunctions";
import { Loader } from "../../../components";
import "./Users.css";
import userDefaultImage from "../../../assets/userDefaultImage.png";
const Users = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const allUsers = await getAllDataFromFireBase("USERS");
    if (allUsers) {
      setLoading(false);
      setUsers(allUsers);
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{user.userPhone}</td>
                    <td>{`${user.Address},${user.District}, ${user.Zone}`}</td>
                    <td>
                      <img
                        src={
                          user.userImageUrl
                            ? user.userImageUrl
                            : userDefaultImage
                        }
                        className="userImage"
                        alt="userImage"
                      ></img>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
