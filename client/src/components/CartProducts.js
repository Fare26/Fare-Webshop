import React, { useContext } from "react";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import "./CartProducts.css";
import CartContext from "../helpers/CartContext";
import { toast } from "react-toastify";

const CartProducts = (props) => {
  const cartCtx = useContext(CartContext);
  const { item } = props;

  function increaseItem(e, product) {
    const index = cartCtx.items.findIndex((prod) => prod.id === product.id);
    if (index >= 0) {
      if (cartCtx.items[index].amount >= product.quantity) {
        toast.warn("Out of stock!", {
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
    cartCtx.addItem({ ...product, amount: 1 });
  }

  function deacreaseItem(e, product) {
    cartCtx.removeItem(product.id);
  }

  function instaRemove(e, product) {
    cartCtx.instantRemove(product.id);
  }

  return (
    <div className="cart-products-container">
      <div className="item-div--1">
        <img src={require("../product-img/" + item.image)} alt="Nike" />
        <div>
          <p>{item.title}</p>
          <p className="qty">Quantity: {item.quantity}</p>
          <p>
            {item.productName}, {item.brendName}
          </p>
        </div>
      </div>
      <div className="item-div--2">
        <p>
          {item.action > 0
            ? (item.price - (item.price * item.action) / 100).toFixed(2)
            : item.price}{" "}
          €
        </p>
      </div>
      <div className="item-div--3">
        <button onClick={(e) => deacreaseItem(e, item)}>
          <FaMinus />
        </button>
        <p>{item.amount}</p>
        <button onClick={(e) => increaseItem(e, item)}>
          <FaPlus />
        </button>
      </div>
      <div className="item-div--4">
        <p>
          {item.action > 0
            ? (
                (item.price - (item.price * item.action) / 100) *
                item.amount
              ).toFixed(2)
            : (item.price * item.amount).toFixed(2)}{" "}
          €
        </p>
      </div>
      <div className="item-div--5">
        <FaTimes onClick={(e) => instaRemove(e, item)} />
        <button
          className="item-div--5-remove-btn"
          onClick={(e) => instaRemove(e, item)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
