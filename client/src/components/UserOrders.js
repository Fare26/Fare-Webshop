import React from "react";
import ProfileCart from "./ProfileCart";
import "./UserOrders.css";

const UserOrders = (props) => {
  const { userCart } = props;
  if (userCart.length === 0)
    return <p className="order-cart-empty">Your cart order is empty!</p>;
  return (
    <div className="profile-cart-container">
      <ul>
        {userCart.map((item, index) => (
          <li key={index}>
            <ProfileCart item={item} />
          </li>
        ))}
      </ul>
      {userCart.length > 5 && (
        <a className="return-to-top-profile" href="#top-profile">
          Back to top...
        </a>
      )}
    </div>
  );
};

export default UserOrders;
