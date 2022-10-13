import { React, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
  FaRegHeart,
  FaShoppingCart,
  FaUser,
  FaPowerOff,
  FaBars,
} from "react-icons/fa";
import { AuthContext } from "../helpers/AuthContext";
import CartContext from "../helpers/CartContext";

const Navbar = (props) => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { authState } = useContext(AuthContext);
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) return;
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const { logout } = props;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <nav>
      <div>
        <ul className="links-section">
          <li>
            <NavLink
              className={(data) => (data.isActive ? "active-nav-link" : "")}
              to="/"
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(data) => (data.isActive ? "active-nav-link" : "")}
              to="/products"
            >
              PRODUCTS
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(data) => (data.isActive ? "active-nav-link" : "")}
              to="/about"
            >
              ABOUT
            </NavLink>
          </li>
        </ul>
        <ul className="login-section">
          {!authState.status && (
            <li>
              <NavLink
                className={(data) => (data.isActive ? "active-nav-link" : "")}
                to="/login"
              >
                LOGIN
              </NavLink>
            </li>
          )}
          {!authState.status && (
            <li>
              <NavLink
                className={(data) => (data.isActive ? "active-nav-link" : "")}
                to="/register"
              >
                REGISTER
              </NavLink>
            </li>
          )}
          {/* <li>
            <NavLink
              className={(data) => (data.isActive ? "active-nav-link" : "")}
              to="/favourite"
            >
              <FaRegHeart />
            </NavLink>
          </li> */}
          {authState.role !== "admin" && (
            <li>
              <NavLink
                className={(data) => (data.isActive ? "active-nav-link" : "")}
                to="/cart"
              >
                <FaShoppingCart className={`${btnHighlighted ? "bump" : ""}`} />
                {numberOfCartItems > 0 && (
                  <span className="product-counter">
                    {numberOfCartItems.toString()}
                  </span>
                )}
              </NavLink>
            </li>
          )}
          {authState.status && (
            <li>
              <NavLink
                className={(data) => (data.isActive ? "active-nav-link" : "")}
                to="/profile"
              >
                <FaUser />
              </NavLink>
            </li>
          )}
          {authState.status && (
            <li className="logout" onClick={logout}>
              LOGOUT
              {/* <FaPowerOff /> */}
            </li>
          )}
        </ul>
      </div>
      <div className="mobile-div">
        <FaBars className="burger-menu" onClick={props.onShowSidenav} />

        <ul>
          <li>
            <NavLink
              className={(data) => (data.isActive ? "active-nav-link" : "")}
              to="/cart"
            >
              <FaShoppingCart
                className={`${
                  btnHighlighted ? "bump burger-menu" : "burger-menu"
                }`}
              />
              {numberOfCartItems > 0 && (
                <span className="product-counter">
                  {numberOfCartItems.toString()}
                </span>
              )}
            </NavLink>
          </li>
          {authState.status && (
            <li>
              <NavLink
                className={(data) => (data.isActive ? "active-nav-link" : "")}
                to="/profile"
              >
                <FaUser />
              </NavLink>
            </li>
          )}
          {authState.status && (
            <li className="logout" onClick={logout}>
              <FaPowerOff />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
