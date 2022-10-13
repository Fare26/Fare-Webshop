import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsContext from "../helpers/ProductsContext";

const NewColectionHome = () => {
  const productsCtx = useContext(ProductsContext);
  const { newCollection } = productsCtx;
  return (
    <div>
      {newCollection.length !== 0 && (
        <>
          <h2 className="collection-h2">NEW COLLECTION</h2>
          <CardGroup className="new-colection">
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + newCollection[0].image)}
              />
              <p>NEW</p>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + newCollection[1].image)}
              />
              <p>NEW</p>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + newCollection[2].image)}
              />
              <p>NEW</p>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + newCollection[3].image)}
              />
              <p>NEW</p>
            </Card>
          </CardGroup>
        </>
      )}
    </div>
  );
};

export default NewColectionHome;
