import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductsHomeSlider = () => {
  return (
    <Carousel className="products-home-slider">
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src={require("../images/slider-image-1.jpg")}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src={require("../images/slider-image-2.jpg")}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src={require("../images/slider-image-3.jpg")}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductsHomeSlider;
