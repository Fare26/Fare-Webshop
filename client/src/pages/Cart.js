import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { FaArrowLeft } from "react-icons/fa";
import CartProducts from "../components/CartProducts";
import CartContext from "../helpers/CartContext";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { format } from "date-fns";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const { authState } = useContext(AuthContext);
  const [agree, setAgree] = useState(false);
  const navigation = useNavigate();
  function continueShopping() {
    navigation("/products", { replace: true });
  }

  function buyProducts() {
    if (cartCtx.items.length === 0) {
      props.tost("warn", "Your cart is empty!");
      return;
    }
    if (!agree) {
      props.tost("warn", "You must agree with terms!");
      return;
    }
    const cartDate = format(new Date(), "dd/MMMM/yyyy, pp");
    axios
      .post(
        "http://localhost:3500/cart/buy",
        { items: cartCtx.items, user: authState, cartDate },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          if (response.data.error.name === "JsonWebTokenError") {
            props.onShowModal();
            return;
          }
          console.log(response.data.error);
        } else {
          props.tost("success", "Your order has been received!");
          cartCtx.clearCart();
        }
      });
  }

  return (
    <div className="cart">
      <div className="cart-wrapper">
        <div className="cart-products-wrapper">
          <div className="cart-header">
            <h1>My Cart</h1>
            <button onClick={continueShopping}>
              <FaArrowLeft /> Continue shopping
            </button>
          </div>
          <div className="cart-names">
            <p className="para-1">PRODUCT</p>
            <p className="para-2">PRICE</p>
            <p className="para-3">QUANTITY</p>
            <p className="para-4">TOTAL</p>
            <p className="para-5">REMOVE</p>
          </div>

          <div className="cart-products">
            {cartCtx.items.length > 0 && (
              <ul>
                {cartCtx.items.map((item) => (
                  <li key={item.id}>
                    <CartProducts item={item} />
                  </li>
                ))}
              </ul>
            )}
            {cartCtx.items.length === 0 && (
              <p style={{ textAlign: "center", marginTop: "50px" }}>
                Cart is empty!
              </p>
            )}
          </div>
        </div>
        <div className="cart-order">
          <hr />
          <p className="total-price">
            TOTAL PRICE: &nbsp; &nbsp;{" "}
            <span>
              {cartCtx.items.length === 0
                ? "0.00"
                : cartCtx.totalAmount.toFixed(2)}{" "}
              €
            </span>
          </p>
          <p className="shipping">SHIPPING: &nbsp; &nbsp; FREE </p>
          <div>
            <input
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              type="checkbox"
              name="agree"
            />
            <label className="agree-terms" htmlFor="agree">
              {" "}
              I agree with terms!
            </label>
          </div>
          <button onClick={buyProducts}>BUY</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
