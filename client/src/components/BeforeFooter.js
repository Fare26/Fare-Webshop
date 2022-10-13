import React from "react";
import { Link } from "react-router-dom";
import "./BeforeFooter.css";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaViber,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const BeforeFooter = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          F@Re<span>Shop</span>
        </h3>

        <p className="footer-links">
          <Link to="/">Home</Link> | <Link to="/products">Products</Link> |{" "}
          <Link to="/about">About</Link> | <Link to="/login">Login</Link> |{" "}
          <Link to="/cart">Cart</Link>
        </p>

        <p className="footer-company-name">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, numquam?
          Dicta iste odit, itaque corporis corrupti maxime quos eaque quod
          placeat quibusdam iure. Omnis eius aliquid, reprehenderit repellendus
          ad quae.
        </p>
      </div>

      <div className="footer-center">
        <div>
          <FaMapMarkerAlt />
          <p>
            <span>Paris</span> France
          </p>
        </div>

        <div>
          <FaPhoneAlt />
          <p>+345 464 325</p>
        </div>
        <div>
          <FaEnvelope />
          <p>test@email.com</p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>Social networks</span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ut
          voluptas nemo quae dolorum dolores, enim nulla reiciendis repellat
          beatae.
        </p>
        <div className="footer-icons">
          <FaFacebookF className="footer-facebook" />
          <FaInstagram className="footer-instagram" />
          <FaWhatsapp className="footer-whatsapp" />
          <FaTwitter className="footer-twitter" />
          <FaViber className="footer-viber" />
        </div>
      </div>
    </footer>
  );
};

export default BeforeFooter;
