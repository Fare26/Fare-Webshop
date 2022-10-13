import React, { useContext } from "react";
import "./ProductCard.css";
import { FaShoppingCart, FaTrash, FaEdit } from "react-icons/fa";
import CartContext from "../helpers/CartContext";
import { AuthContext } from "../helpers/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductsContext from "../helpers/ProductsContext";
import axios from "axios";

const ProductCard = (props) => {
  const cartCtx = useContext(CartContext);
  const productCtx = useContext(ProductsContext);
  const { products, setProducts } = productCtx;
  const { authState } = useContext(AuthContext);
  const navigation = useNavigate();
  const { item, editProduct, setEditProduct } = props;

  function addToCart(e, product) {
    const index = cartCtx.items.findIndex((item) => item.id === product.id);
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

  function viewProduts(id) {
    navigation(`/products/${id}`);
  }

  function deleteProduct(e, product) {
    axios
      .delete(`http://localhost:3500/products/deleteProduct/${product.id}`)
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          toast.success("Product DELETED!", {
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const arr = products.filter((item) => item.id !== product.id);
          setProducts(arr);
        }
      });
  }

  function editProductHandler(e, product) {
    const editProd = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      action: product.action,
      image: product.image,
      genderName: product.genderName,
      productName: product.productName,
      brendName: product.brendName,
    };
    setEditProduct(editProd);
    navigation("/products/editProduct");
  }

  return (
    <div className="container">
      <div className="card">
        <div className="front">
          <div className="product-img-action">
            <img
              className="card-img"
              src={require("../product-img/" + item.image)}
              alt="Nike"
            />
            {item.action !== 0 && (
              <p className="action-notification">{item.action}%</p>
            )}
          </div>
          <p className="card-title">{item.title}</p>
          <span className="product-brend">
            {item.productName}, {item.brendName}
          </span>
        </div>
        <div className="back">
          <h2
            style={
              item.action
                ? { textDecoration: "line-through #000", fontSize: "20px" }
                : {}
            }
            className="card-price"
          >
            {item.price} €
          </h2>
          {item.action !== 0 && (
            <h2 style={{ color: "#479f76" }} className="card-price">
              {(item.price - (item.price * item.action) / 100).toFixed(2)} €
            </h2>
          )}
          <span className="cart-quantity">Quantity: {item.quantity}</span>
          {authState.role !== "admin" && (
            <button
              disabled={item.quantity === 0 ? true : false}
              onClick={(e) => addToCart(e, item)}
              className="card-btn"
            >
              Add <FaShoppingCart />
            </button>
          )}
          {authState.role === "admin" && (
            <div>
              <button
                onClick={(e) => deleteProduct(e, item)}
                className="product-card-delete"
              >
                <FaTrash />
              </button>
              <button
                onClick={(e) => editProductHandler(e, item)}
                className="product-card-edit"
              >
                <FaEdit />
              </button>
            </div>
          )}
          <button
            onClick={(e) => viewProduts(item.id)}
            type="button"
            className="products-profile-btn"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
