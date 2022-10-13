import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductsContext from "../helpers/ProductsContext";
import CartContext from "../helpers/CartContext";
import Footer from "../components/Footer";
import "./ProductProfile.css";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const ProductProfile = (props) => {
  const productCtx = useContext(ProductsContext);
  const cartCtx = useContext(CartContext);
  const { products } = productCtx;
  const params = useParams();
  const navigation = useNavigate();
  const { productId } = params;
  const product = products.find((product) => product.id === Number(productId));

  function goBack() {
    navigation(-1);
  }

  function addCart(e, prod) {
    const index = cartCtx.items.findIndex((item) => item.id === prod.id);
    if (index >= 0) {
      if (cartCtx.items[index].amount >= prod.quantity) {
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
    cartCtx.addItem({ ...prod, amount: 1 });
  }

  function backToProducts() {
    navigation("/products", { replace: true });
  }

  if (!product) {
    return (
      <>
        <div
          style={{ flexDirection: "column", justifyContent: "center" }}
          className="product-profile-wrapper"
        >
          <p className="product-not-found-profile">Product not found!</p>
          <button className="not-found-btn" onClick={goBack}>
            Go back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="product-profile-wrapper">
        <div className="profile-product-img-div">
          <img src={require("../product-img/" + product.image)} alt="picture" />
        </div>
        <div className="product-profile-info">
          <div className="div-title-btn">
            <p className="profile-product-title">{product.title}</p>
            <button onClick={backToProducts}>
              <FaArrowLeft /> Back To Products
            </button>
          </div>
          <p className="profile-product-name">
            {product.productName} / {product.brendName} / {product.genderName}
          </p>

          <p className="profile-product-price">
            PRICE:{" "}
            <span
              style={
                product.action > 0
                  ? {
                      textDecoration: "line-through #fff 3px",
                      fontSize: "22px",
                    }
                  : {}
              }
            >
              {product.price} €
            </span>
            <span>
              {product.action > 0
                ? `${(
                    product.price -
                    (product.price * product.action) / 100
                  ).toFixed(2)} €`
                : ""}
              {product.action > 0 ? (
                <span className="profile-product-span">
                  {" "}
                  {product.action} %
                </span>
              ) : (
                ""
              )}
            </span>
          </p>
          <hr />
          <p className="profile-product-description">{product.description}</p>
          <hr />
          <p className="profile-product-quantity">
            Quantity: &nbsp; {product.quantity}
          </p>
          <div className="product-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
          </div>
          <button
            onClick={(e) => addCart(e, product)}
            className="profile-product-btn"
          >
            Add <FaShoppingCart />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductProfile;
