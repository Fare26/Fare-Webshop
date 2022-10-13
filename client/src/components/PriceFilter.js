import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dropdown.css";

const PriceFilter = (props) => {
  return (
    <Accordion className="accordion">
      <Accordion.Item eventKey="0" className="dropdown rounded-0">
        <Accordion.Header>{props.name}</Accordion.Header>
        <Accordion.Body>
          {props.name === "Price" && (
            <>
              <div className="min">
                <label className="label-min-max" htmlFor="min">
                  Min:{" "}
                </label>
                <input
                  value={props.minPrice}
                  onChange={(e) =>
                    e.target.value > 1500 || e.target.value < 0
                      ? ""
                      : props.setMinPrice(e.target.value)
                  }
                  type="number"
                  name="min"
                  min="1"
                  max="1500"
                />
              </div>
              <div className="max">
                <label className="label-min-max" htmlFor="max">
                  Max:
                </label>
                <input
                  value={props.maxPrice}
                  onChange={(e) =>
                    e.target.value > 1500 || e.target.value < 0
                      ? ""
                      : props.setMaxPrice(e.target.value)
                  }
                  type="number"
                  name="max"
                  min="1"
                  max="1500"
                />
              </div>
            </>
          )}
          {props.name === "Action" && (
            <div className="action-accordion">
              <label htmlFor="action">Action</label>
              <input
                checked={props.action}
                onChange={(e) => props.setAction(e.target.checked)}
                type="checkbox"
                name="action"
              />
            </div>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default PriceFilter;
