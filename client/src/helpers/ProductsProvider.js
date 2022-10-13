import React, { useEffect, useState } from "react";
import ProductsContext from "./ProductsContext";
import axios from "axios";

const ProductsProvider = (props) => {
  const [category, setCategory] = useState({
    genderCategory: [],
    brendCategory: [],
    productCategory: [],
  });
  const [checked, setChecked] = useState({
    genderCategory: [],
    brendCategory: [],
    productCategory: [],
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [action, setAction] = useState(false);
  const [actionCollection, setActionCollection] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [scrollProducts, setScrollProducts] = useState([]);
  const [counter, setCounter] = useState(2);
  useEffect(() => {
    axios.get("http://localhost:3500/category").then((response) => {
      if (response.data.error) alert(response.data.error);
      else {
        setCategory(response.data);
        const arrGender = response.data.genderCategory.map((item) => ({
          ...item,
          isChecked: false,
        }));
        const arrBrend = response.data.brendCategory.map((item) => ({
          ...item,
          isChecked: false,
        }));
        const arrProducts = response.data.productCategory.map((item) => ({
          ...item,
          isChecked: false,
        }));
        setChecked({
          genderCategory: arrGender,
          brendCategory: arrBrend,
          productCategory: arrProducts,
        });
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3500/products/getAllProducts")
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          setProducts(response.data);
          setIsLoading(false);
          const arr = response.data.filter((item) => item.action > 0);
          setActionCollection(arr);
          const newCol = response.data.slice(-4);
          setNewCollection(newCol);
          const arr1 = response.data.slice(0, 20);
          setScrollProducts(arr1);
        }
      });
  }, []);

  function submitCategory() {
    setIsLoading(true);
    const arr1 = checked.productCategory.filter(
      (item) => item.isChecked === true
    );
    const arr2 = checked.brendCategory.filter(
      (item) => item.isChecked === true
    );
    const arr3 = checked.genderCategory.filter(
      (item) => item.isChecked === true
    );
    axios
      .post("http://localhost:3500/products/getFilteredProducts", {
        arr1,
        arr2,
        arr3,
        minPrice,
        maxPrice,
        action,
      })
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
  }
  return (
    <ProductsContext.Provider
      value={{
        category,
        setCategory,
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
        actionCollection,
        newCollection,
        scrollProducts,
        setScrollProducts,
        counter,
        setCounter,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
