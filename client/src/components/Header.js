import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchBar from "./SearchBar";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <Link className="logo" to="/">
        F@Re<span>Shop</span>
      </Link>
      <div className="social-networks">
        <FaFacebookSquare className="fb" />
        <FaInstagramSquare className="ig" />
        <FaWhatsappSquare className="wa" />
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
