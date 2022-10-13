import { React, useContext, useEffect } from "react";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

const Profile = (props) => {
  const { setUserCart } = props;
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .post("http://localhost:3500/cart/getUserCart", { id: authState.id })
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          setUserCart(response.data);
        }
      });
  }, []);

  return (
    <div id="top-profile" className="profile-wrapper">
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-img">
            <NavLink to="/profile">
              <FaUserCircle />
            </NavLink>
            <h2>
              {authState.firstName}{" "}
              {authState.role === "admin" ? "" : authState.lastName}
            </h2>
            <p>{authState.email}</p>
          </div>
          <div className="profile-settings">
            <ul>
              <li>
                <NavLink
                  to="/profile/user-orders"
                  className={(data) =>
                    data.isActive ? "active-user-link" : ""
                  }
                >
                  Your Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile/profile-settings"
                  className={(data) =>
                    data.isActive ? "active-user-link" : ""
                  }
                >
                  Profile Settings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile/user-settings"
                  className={(data) =>
                    data.isActive ? "active-user-link" : ""
                  }
                >
                  User Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
