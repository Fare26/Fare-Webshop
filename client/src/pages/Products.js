import React, { useEffect, useContext, useState } from "react";
import "./Products.css";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import ProductCard from "../components/ProductCard";
import PriceFilter from "../components/PriceFilter";
import ProductsContext from "../helpers/ProductsContext";
import BeforeFooter from "../components/BeforeFooter";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaListUl, FaTimes } from "react-icons/fa";

const Products = (props) => {
  const productCtx = useContext(ProductsContext);
  const navigation = useNavigate();
  const { authState } = useContext(AuthContext);
  const {
    editProduct,
    setEditProduct,
    filter,
    showFilter,
    hideFilter,
    dimensions,
    handleResize,
  } = props;
  const {
    category,
    checked,
    setChecked,
    products,
    setProducts,
    isLoading,
    setIsLoading,
    maxPrice,
    setMaxPrice,
    minPrice,
    setMinPrice,
    action,
    setAction,
    submitCategory,
    scrollProducts,
    setScrollProducts,
    counter,
    setCounter,
  } = productCtx;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (dimensions.width > 768) hideFilter();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    axios
      .get("http://localhost:3500/products/getAllProducts")
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          setProducts(response.data);
          setIsLoading(false);
          const arr = response.data.slice(0, 20);
          setScrollProducts(arr);
          setCounter(2);
        }
      });
  }, []);
  function addProductHandler() {
    navigation("/products/addProduct", { replace: true });
  }

  function loadMore() {
    const arr = products.slice(0, counter * 20);
    setCounter(counter + 1);
    setScrollProducts(arr);
  }

  return (
    <div id="top" className="products">
      <div className="products-wrapper">
        {!filter && (
          <div className="mobile-filter-icon">
            <FaListUl onClick={showFilter} /> <span>Filter</span>
          </div>
        )}
        <div className="products-menu">
          {authState.role === "admin" && (
            <button onClick={addProductHandler} className="add-product-btn">
              Add Product
            </button>
          )}
          <Dropdown
            category={category.productCategory}
            catName={"Product"}
            checked={checked}
            setChecked={setChecked}
          />
          <Dropdown
            category={category.brendCategory}
            catName={"Brend"}
            checked={checked}
            setChecked={setChecked}
          />
          <Dropdown
            category={category.genderCategory}
            catName={"Gender"}
            checked={checked}
            setChecked={setChecked}
          />
          <PriceFilter
            name="Price"
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <PriceFilter name="Action" action={action} setAction={setAction} />
          <button onClick={submitCategory} className="search-category-btn">
            Search
          </button>
        </div>
        {filter && (
          <div className="products-menu-mobile">
            <div className="close-mobile-filter">
              <FaTimes onClick={hideFilter} />
            </div>
            {authState.role === "admin" && (
              <button onClick={addProductHandler} className="add-product-btn">
                Add Product
              </button>
            )}
            <Dropdown
              category={category.productCategory}
              catName={"Product"}
              checked={checked}
              setChecked={setChecked}
            />
            <Dropdown
              category={category.brendCategory}
              catName={"Brend"}
              checked={checked}
              setChecked={setChecked}
            />
            <Dropdown
              category={category.genderCategory}
              catName={"Gender"}
              checked={checked}
              setChecked={setChecked}
            />
            <PriceFilter
              name="Price"
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <PriceFilter name="Action" action={action} setAction={setAction} />
            <button onClick={submitCategory} className="search-category-btn">
              Search
            </button>
          </div>
        )}
        <div className="fare">
          <div
            className={
              isLoading || scrollProducts.length === 0
                ? "products-container-v2"
                : "products-container"
            }
          >
            {!isLoading &&
              scrollProducts.length !== 0 &&
              scrollProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  editProduct={editProduct}
                  setEditProduct={setEditProduct}
                />
              ))}
            {scrollProducts.length === 0 && (
              <p className="products-not-found">Products not found!</p>
            )}
            {isLoading && (
              <div id="loader">
                <div className="krug">
                  <span className="krug-2"></span>
                  <div className="puls"></div>
                </div>
              </div>
            )}
          </div>
          {scrollProducts.length < products.length && (
            <button onClick={loadMore} className="load-more">
              Load more...
            </button>
          )}
          <a className="return-to-top" href="#top">
            Return to top...
          </a>
        </div>
      </div>
      <BeforeFooter />
      <Footer />
    </div>
  );
};

export default Products;
