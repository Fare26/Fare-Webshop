import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import ProductsContext from "../helpers/ProductsContext";

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");
  const navigation = useNavigate();
  const inputRef = useRef();
  const productCtx = useContext(ProductsContext);
  const { setProducts, setCounter, setScrollProducts } = productCtx;

  function search() {
    axios
      .post("http://localhost:3500/products/searchProduct", { name: searchBar })
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          setProducts(response.data);
          const arr = response.data.slice(0, 20);
          setScrollProducts(arr);
          setCounter(2);
        }
      });
    setSearchBar("");
    inputRef.current.blur();
    navigation("/products", { replace: true });
  }

  return (
    <div className="search-box">
      <input
        ref={inputRef}
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
        type="text"
        placeholder="Search product..."
        id="product-search"
        onKeyUp={(e) => (e.key === "Enter" ? search() : "")}
      />
      <FaSearch onClick={search} />
    </div>
  );
};

export default SearchBar;
