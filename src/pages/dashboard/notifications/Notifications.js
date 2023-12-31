import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
const Notifications = () => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    fetchDataFromFireBase();
  }, []);
  const fetchDataFromFireBase = () => {
    const receivedData = [];
    fetch(
      "https://ecommerce-ktm-default-rtdb.firebaseio.com/ContactFormData.json",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Loop through the data object and extract the desired information
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const message = data[key].message;
            const { subject, address, email, firstName, lastName, phone } =
              data[key].userData;

            // Exclude the non-useful details and push the desired information to the receivedData array
            receivedData.push({
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              address: address,
              email: email,
              subject: subject,
              message: message,
            });
          }
        }

        setFormData(receivedData);
      })
      .catch((error) => {
     
      });
  };
  // const deleteDataFromFireBaseRealTimeDB = (index) => {
  //   fetch(
  //     "https://ecommerce-ktm-default-rtdb.firebaseio.com/ContactFormData.json",
  //     {
  //       method: "GET",
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const receivedData = Object.keys(data);
  //       const selectedData = receivedData.filter((data, i) => {
  //         return i === index;
  //       });
  //       const selectedKey = selectedData[0];
  //       console.log(selectedKey);
  //       fetch(
  //         `https://ecommerce-ktm-default-rtdb.firebaseio.com/ContactFormData.json/${selectedKey}`,
  //         {
  //           method: "DELETE",
  //         }
  //       ).then((data) => {
  //         console.log("data Deleted");
  //       });
  //     });
  // };
  return (
    <div>
      {formData && (
        <table>
          <thead>
            <tr>
              <th>SN</th>
              {formData.length > 0 &&
                Object.keys(formData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {formData.map((data, index) => {
              const {
                firstName,
                lastName,
                phone,
                address,
                email,
                subject,
                message,
              } = data;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{phone}</td>
                  <td>{address}</td>
                  <td>{email}</td>
                  <td>{subject}</td>
                  <td>{message}</td>
                  <td>
                    <button>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notifications;
