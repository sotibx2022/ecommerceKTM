import axios from "axios";

export const uniqueID = () => {
  const timestamp = Date.now().toString();
  const randomNumber = Math.random().toString(36).substring(2, 8);
  const generatedId = timestamp + randomNumber;
  return generatedId;
};
export const getProductsfromServer = async () => {
  return axios
    .get("https://dummyjson.com/products")
    .then((data) => {
      return data.data.products;
    })
    .catch((error) => {
      console.log("error");
    });
};
export const getSingleProductFromServer = async (id) => {
  return axios
    .get("https://dummyjson.com/products")
    .then((data) => {
      return data.data.results.filter((selectedData) => {
        return selectedData.id === id;
      });
    })
    .catch((error) => {
      console.log("error");
    });
};
export const truncateText = (type, text) => {
  if (type === "description") {
    if (text.length > 50) {
      const shortText = text.slice(0, 50) + "...";
      return shortText;
    } else {
      return text;
    }
  } else {
    if (text.length > 20) {
      const shortText = text.slice(0, 20) + "..."
      return shortText;
    } else {
      return text;
    }
  }
};