import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import CartSummary from "./cartSummary/CartSummary";
import { resetCart } from "../../redux/cartSlice";
import { deleteDataFromFireBase } from "../../firebase/firebaseFunctions";

const Cart = () => {
  const cartArray = useSelector((state) => state.cart.cartArray);
  const [cartItems, setCartItems] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userEmail } = currentUser;

  const dispatch = useDispatch();

  const receiveValueFromChild = (value) => {};
  useEffect(() => {
    setCartItems(cartArray);
  }, [cartArray]);
  useEffect(() => {}, [cartItems]);

  const handleIncrement = (i) => {
    const updatedCartItems = cartItems.map((item, index) => {
      if (i === index) {
        const updatedQuantity =
          item.quantity > 0 ? item.quantity + 1 : item.quantity;
        const updatedDiscountPrice = Math.floor(
          (item.product.discountPercentage || 5) * updatedQuantity
        );
        const updatedTotalPrice =
          (item.product.price || item.product.productPrice) * updatedQuantity -
          updatedDiscountPrice;

        dispatch({
          type: "cart/updateCartItem",
          payload: {
            ...item,
            id: index,
            quantity: updatedQuantity,
            discountPrice: updatedDiscountPrice,
            totalPrice: updatedTotalPrice,
            cartId: item.cartId,
          },
        });

        return {
          ...item,
          id: i,
          quantity: updatedQuantity,
          discountPrice: updatedDiscountPrice,
          totalPrice: updatedTotalPrice,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };
  const handleDecrement = (i) => {
    const updatedCartItems = cartItems.map((item, index) => {
      if (i === index) {
        const updatedQuantity =
          item.quantity > 1 ? item.quantity - 1 : item.quantity;
        const updatedDiscountPrice = Math.floor(
          (item.product.discountPercentage || 5) * updatedQuantity
        );
        const updatedTotalPrice =
          (item.product.price || item.product.productPrice) * updatedQuantity -
          updatedDiscountPrice;
        dispatch({
          type: "cart/updateCartItem",
          payload: {
            ...item,
            id: index,
            quantity: updatedQuantity,
            discountPrice: updatedDiscountPrice,
            totalPrice: updatedTotalPrice,
          },
        });
        return {
          ...item,
          id: i,
          quantity: updatedQuantity,
          discountPrice: updatedDiscountPrice,
          totalPrice: updatedTotalPrice,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
  const deleteFromCart = (cartItem, index) => {
    dispatch({ type: "cart/removeFromCart", payload: { cartItem, index } });
    deleteDataFromFireBase("Carts", cartItem.cartId);
  };
  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="container cartItemContainer">
          <div className="carts container">
            {cartItems.map((cartItem, index) => {
              return (
                <div className="" key={index}>
                  <div className="cartItemCard">
                    <img
                      src={
                        cartItem.product.thumbnail ||
                        cartItem.product.productUrl
                      }
                      alt={`Thumbnail of ${cartItem.title}`}
                      className="cartImage"
                    />
                    <div className="branding">
                      <h2>
                        {cartItem.product.title || cartItem.product.productName}
                      </h2>

                      <p className="cartBrand">Brand: {cartItem.product.brand || "N/A"}</p>
                      <p className="cartCategory">
                        Category:{" "}
                        {cartItem.product.category ||
                          cartItem.product.productCategory}
                      </p>
                    </div>

                    <div className="price">
                      <p className="cartItemInfo">
                        <span>Price</span>
                        {cartItem.product.price ||
                          cartItem.product.productPrice}
                      </p>
                    </div>
                    <p className="cartItemInfo">
                      <span> Discount</span>
                      {cartItem.product.discountPercentage || 5}%
                    </p>
                    <div className="productQuantity">
                      <button
                        onClick={() => handleDecrement(index)}
                        name="increment"
                        className="cartButton"
                      >
                        -
                      </button>
                      <p>{cartItem.quantity}</p>
                      <button
                        onClick={() => handleIncrement(index)}
                        className="cartButton"
                      >
                        +
                      </button>
                    </div>

                    <p>
                      <span className="cartItemInfo"> Total Price</span>${" "}
                      {cartItem.totalPrice}{" "}
                    </p>
                    <button
                      className="deleteFromCart cartButton"
                      onClick={() => deleteFromCart(cartItem, index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
            <button onClick={() => dispatch(resetCart({ userEmail }))}>
              Clear Cart
            </button>
          </div>

          <CartSummary
            button={true}
            sendValueToParent={receiveValueFromChild}
          />
        </div>
      ) : (
        <h1 className="container">No Items added to the cart</h1>
      )}
    </div>
  );
};
export default Cart;
