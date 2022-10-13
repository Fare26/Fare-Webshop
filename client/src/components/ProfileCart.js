import React from "react";

const ProfileCart = (props) => {
  const { item } = props;
  return (
    <div className="profile-cart-item">
      <div className="profile-cart-item-div-1">
        <img src={require("../product-img/" + item.image)} alt="image" />
      </div>
      <div className="profile-cart-item-div-2">
        <p className="profile-cart-title">{item.title}</p>
        <p className="profile-cart-date">{item.date}</p>
      </div>
      <div className="profile-cart-item-div-3">
        <p className="profile-cart-quantity">{item.quantity} X</p>
        <p className="profile-cart-price">{item.quantity * item.price} €</p>
      </div>
    </div>
  );
};

export default ProfileCart;
