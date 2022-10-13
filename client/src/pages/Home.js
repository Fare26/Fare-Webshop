import React from "react";
import BeforeFooter from "../components/BeforeFooter";
import Footer from "../components/Footer";
import HomeAction from "../components/HomeAction";
import NewColectionHome from "../components/NewColectionHome";
import ProductsHomeSlider from "../components/ProductsHomeSlider";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <ProductsHomeSlider />
      <NewColectionHome />
      <HomeAction />
      <div className="home-brend">
        <img src={require("../images/nike.png")} alt="nike" />
        <img src={require("../images/adidas.png")} alt="nike" />
        <img src={require("../images/puma.png")} alt="nike" />
        <img src={require("../images/4f.png")} alt="nike" />
        <img src={require("../images/boss.png")} alt="nike" />
        <img src={require("../images/lacoste.png")} alt="nike" />
      </div>
      <BeforeFooter />
      <Footer />
    </div>
  );
};

export default Home;
