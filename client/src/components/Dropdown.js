import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dropdown.css";

const Dropdown = (props) => {
  const { category, catName, checked, setChecked } = props;
  const helper = catName.toLowerCase() + "Category";
  const nameHelper = catName.toLowerCase() + "Name";

  function checkedHandler(e, id) {
    const arrProducts = checked;
    arrProducts[helper][id - 1].isChecked = e.target.checked;
    setChecked(arrProducts);
  }

  return (
    <Accordion
      className="accordion"
      defaultActiveKey={catName === "Product" ? "0" : ""}
    >
      <Accordion.Item eventKey="0" className="dropdown rounded-0">
        <Accordion.Header>{catName}</Accordion.Header>
        <Accordion.Body>
          <ul className="dropdown-list">
            {category.map((item) => (
              <li key={item.id}>
                <label htmlFor={`${item[nameHelper]}${item.id}`}>
                  {item[nameHelper]}
                </label>
                <input
                  value={checked[helper][item.id - 1].isChecked}
                  onChange={(e) => checkedHandler(e, item.id)}
                  type="checkbox"
                  name={`${item[nameHelper]}${item.id}`}
                />
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Dropdown;
