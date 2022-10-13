import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsContext from "../helpers/ProductsContext";

const HomeAction = () => {
  const productsCtx = useContext(ProductsContext);
  const { actionCollection } = productsCtx;
  return (
    <div>
      {actionCollection.length !== 0 && (
        <>
          <h2 className="collection-h2">ON SALE</h2>
          <CardGroup className="new-colection">
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + actionCollection[0].image)}
              />
              <p className="home-action">{actionCollection[0].action} %</p>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + actionCollection[1].image)}
              />
              <p className="home-action">{actionCollection[1].action} %</p>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + actionCollection[2].image)}
              />
              <p className="home-action">{actionCollection[2].action} %</p>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src={require("../product-img/" + actionCollection[3].image)}
              />
              <p className="home-action">{actionCollection[3].action} %</p>
            </Card>
          </CardGroup>
        </>
      )}
    </div>
  );
};

export default HomeAction;
