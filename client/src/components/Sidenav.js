import React, { useContext, useEffect } from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./Sidenav.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onHiheSidenav} />;
};

const SidenavOverlay = (props) => {
  const { authState } = useContext(AuthContext);

  return (
    <div className={props.sidenav ? "sidenav" : "hide"}>
      <FaTimes onClick={props.onHiheSidenav} />
      <ul>
        <li>
          <NavLink
            onClick={props.onHiheSidenav}
            className={(data) => (data.isActive ? "active-nav-link" : "")}
            to="/"
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={props.onHiheSidenav}
            className={(data) => (data.isActive ? "active-nav-link" : "")}
            to="/products"
          >
            PRODUCTS
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={props.onHiheSidenav}
            className={(data) => (data.isActive ? "active-nav-link" : "")}
            to="/about"
          >
            ABOUT
          </NavLink>
        </li>
        {!authState.status && (
          <li>
            <NavLink
              onClick={props.onHiheSidenav}
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
              onClick={props.onHiheSidenav}
              className={(data) => (data.isActive ? "active-nav-link" : "")}
              to="/register"
            >
              REGISTER
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

const portalElement = document.getElementById("sidenav");

const Sidenav = (props) => {
  const { dimensions, handleResize } = props;
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (dimensions.width > 600) props.onHiheSidenav();

    return () => {
      window.removeEventListener("resize", props.handleResize);
    };
  });

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHiheSidenav={props.onHiheSidenav} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <SidenavOverlay
          onHiheSidenav={props.onHiheSidenav}
          sidenav={props.sidenav}
          logout={props.logout}
        />,
        portalElement
      )}
    </Fragment>
  );
};

export default Sidenav;
