import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date();
  return (
    <footer>
      <p>Copyright ©{year.getFullYear()} F@reShop. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
