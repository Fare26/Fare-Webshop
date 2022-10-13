import React, { useContext, useEffect, useState } from "react";
import "./AddProduct.css";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductsContext from "../helpers/ProductsContext";
import axios from "axios";
import { toast } from "react-toastify";

const defaultAddProp = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  action: "",
  image: "",
  genderName: "",
  productName: "",
  brendName: "",
};

const AddProduct = () => {
  const [addProduct, setAddProduct] = useState(defaultAddProp);
  const { authState } = useContext(AuthContext);
  const navigation = useNavigate();
  const productsCtx = useContext(ProductsContext);
  const { category } = productsCtx;

  useEffect(() => {
    if (authState.role !== "admin") {
      navigation("*");
    }
  }, []);

  function setHandler(e) {
    setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
  }

  function addItem() {
    axios
      .post("http://localhost:3500/products/addProduct", {
        ...addProduct,
      })
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          console.log(response.data);
          toast.success("Product added!", {
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigation("/products", { replace: true });
        }
      });
  }

  return (
    <div className="add-product-wrapper">
      <div className="add-product-container">
        <h1>Add Product</h1>
        <div className="add-product">
          <div className="add-main-form">
            <label htmlFor="title">Title</label>
            <input
              value={addProduct.title}
              onChange={setHandler}
              type="text"
              placeholder="Title..."
              name="title"
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={addProduct.description}
              onChange={setHandler}
              cols="30"
              rows="10"
              placeholder="Description..."
            ></textarea>
            <label htmlFor="price">Price</label>
            <input
              name="price"
              value={addProduct.price}
              onChange={setHandler}
              type="text"
              placeholder="Price..."
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              name="quantity"
              value={addProduct.quantity}
              onChange={setHandler}
              type="text"
              placeholder="Quantity..."
            />
          </div>
          <div className="add-second-form">
            <label htmlFor="action">Action</label>
            <input
              name="action"
              value={addProduct.action}
              onChange={setHandler}
              type="text"
              placeholder="Action..."
            />
            <label htmlFor="image">Image</label>
            <input
              name="image"
              value={addProduct.image}
              onChange={setHandler}
              type="text"
              placeholder="Image path..."
            />
            <label htmlFor="productName">Product Category</label>
            <hr />
            <select
              name="productName"
              value={addProduct.productName}
              onChange={setHandler}
            >
              <option value="" disabled hidden>
                Choose product
              </option>
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
              value={addProduct.brendName}
              onChange={setHandler}
            >
              <option value="" disabled hidden>
                Choose brend
              </option>
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
              value={addProduct.genderName}
              onChange={setHandler}
            >
              <option value="" disabled hidden>
                Choose gender
              </option>
              {category.genderCategory.map((item) => (
                <option key={item.id} value={item.genderName}>
                  {item.genderName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={addItem} className="add-product-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
