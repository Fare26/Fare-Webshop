import React, { useContext, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import ProductsContext from "../helpers/ProductsContext";
import { useNavigate } from "react-router-dom";
import "./EditProduct.css";
import axios from "axios";

const EditProduct = (props) => {
  const { authState } = useContext(AuthContext);
  const productsCtx = useContext(ProductsContext);
  const navigation = useNavigate();
  const { category } = productsCtx;
  const { editProduct, setEditProduct } = props;

  useEffect(() => {
    if (authState.role !== "admin") {
      navigation("*");
    }
  }, []);

  function setHandler(e) {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  }

  function submitChanges() {
    axios
      .put("http://localhost:3500/products/updateProduct", {
        product: editProduct,
      })
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          navigation("/products", { replace: true });
        }
      });
  }

  return (
    <div className="admin-product-panel">
      <h1>Edit Product</h1>
      <div className="edit-add-product">
        <div className="edit-add-main-form">
          <label htmlFor="title">Title</label>
          <input
            value={editProduct.title}
            onChange={setHandler}
            type="text"
            placeholder="Title..."
            name="title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={editProduct.description}
            onChange={setHandler}
            cols="30"
            rows="10"
            placeholder="Description..."
          ></textarea>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            value={editProduct.price}
            onChange={setHandler}
            type="text"
            placeholder="Price..."
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            name="quantity"
            value={editProduct.quantity}
            onChange={setHandler}
            type="text"
            placeholder="Quantity..."
          />
        </div>
        <div className="edit-add-second-form">
          <label htmlFor="action">Action</label>
          <input
            name="action"
            value={editProduct.action}
            onChange={setHandler}
            type="text"
            placeholder="Action..."
          />
          <label htmlFor="image">Image</label>
          <input
            name="image"
            value={editProduct.image}
            onChange={setHandler}
            type="text"
            placeholder="Image path..."
          />
          <label htmlFor="productName">Product Category</label>
          <hr />
          <select
            name="productName"
            value={editProduct.productName}
            onChange={setHandler}
          >
            {category.productCategory.map((item) => (
              <option key={item.id} value={item.productName}>
                {item.productName}
              </option>
            ))}
          </select>

          <label htmlFor="brendName">Brend Category</label>
          <hr />
          <select
            name="brendName"
            value={editProduct.brendName}
            onChange={setHandler}
          >
            {category.brendCategory.map((item) => (
              <option key={item.id} value={item.brendName}>
                {item.brendName}
              </option>
            ))}
          </select>

          <label htmlFor="genderName">Gender Category</label>
          <hr />
          <select
            name="genderName"
            value={editProduct.genderName}
            onChange={setHandler}
          >
            {category.genderCategory.map((item) => (
              <option key={item.id} value={item.genderName}>
                {item.genderName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={submitChanges} className="submit-edit-product">
        SUBMIT
      </button>
    </div>
  );
};

export default EditProduct;
