import React from "react";
import BeforeFooter from "../components/BeforeFooter";
import EmployedCard from "../components/EmployedCard";
import Footer from "../components/Footer";
import "./About.css";

const About = () => {
  return (
    <div>
      <div className="about-header">
        <div className="about-img"></div>
        <div className="who-we-are">
          <h2>Who We Are?</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
            expedita dignissimos vero beatae corporis ipsa, ut ipsam
            exercitationem suscipit sit hic iusto maxime magnam reiciendis rem
            facere, labore consectetur et, provident nihil itaque soluta!
            Laboriosam consequuntur, iusto vitae ipsum modi culpa earum vel,
            recusandae adipisci, et ducimus illo eum soluta ut. Tenetur ipsa
            illum explicabo quod totam consequatur repellat, qui odit, fugiat
            veniam possimus tempora obcaecati soluta, velit nam ut impedit?
            Fugit molestias ipsam quam!
          </p>
        </div>
      </div>
      <div className="top-shop">
        <h2>THE BEST WEB-SHOP</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit at
          maiores ducimus eveniet, velit sit.
        </p>
        <div className="best-shop">
          <div>
            <h3>6 YEARS OF BUSINESS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
              laboriosam libero perferendis debitis impedit in qui at ipsa
              magnam minima.
            </p>
          </div>
          <div>
            <h3>5000+ TRANSACTIONS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
              laboriosam libero perferendis debitis impedit in qui at ipsa
              magnam minima.
            </p>
          </div>
          <div>
            <h3>10,000+ PRODUCTS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
              laboriosam libero perferendis debitis impedit in qui at ipsa
              magnam minima.
            </p>
          </div>
        </div>
      </div>
      <EmployedCard />
      <div className="map">
        <h2>WHERE YOU CAN FIND US?</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7645754648!2d2.2769955609057364!3d48.85894658069143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sPariz%2C%20Francuska!5e0!3m2!1sbs!2sba!4v1663072175610!5m2!1sbs!2sba"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        ></iframe>
      </div>
      <BeforeFooter />
      <Footer />
    </div>
  );
};

export default About;
