import React from "react";
import "./EmployedCard.css";

const EmployedCard = () => {
  return (
    <div className="card-wrapper-employed">
      <div className="card-employed">
        <div className="image-content-employed">
          <span className="overlay-employed"></span>

          <div className="card-image-employed">
            <img
              className="card-img-employed"
              src={require("../images/user-1.png")}
              alt="user"
            />
          </div>
        </div>

        <div className="card-content-employed">
          <h2 className="name-employed">David Dell</h2>
          <p className="description-employed">
            The lorem text the section that contains header with having open
            functionality. Lorem dolor sit amet consectetur adipisicing elit.
          </p>

          <button className="button-employed">View More</button>
        </div>
      </div>

      <div className="card-employed">
        <div className="image-content-employed">
          <span className="overlay-employed"></span>

          <div className="card-image-employed">
            <img
              className="card-img-employed"
              src={require("../images/user-2.png")}
              alt="user"
            />
          </div>
        </div>

        <div className="card-content-employed">
          <h2 className="name-employed">John Doe</h2>
          <p className="description-employed">
            The lorem text the section that contains header with having open
            functionality. Lorem dolor sit amet consectetur adipisicing elit.
          </p>

          <button className="button-employed">View More</button>
        </div>
      </div>

      <div className="card-employed">
        <div className="image-content-employed">
          <span className="overlay-employed"></span>

          <div className="card-image-employed">
            <img
              className="card-img-employed"
              src={require("../images/user-3.png")}
              alt="user"
            />
          </div>
        </div>

        <div className="card-content-employed">
          <h2 className="name-employed">Jean Doe</h2>
          <p className="description-employed">
            The lorem text the section that contains header with having open
            functionality. Lorem dolor sit amet consectetur adipisicing elit.
          </p>

          <button className="button-employed">View More</button>
        </div>
      </div>
    </div>
  );
};

export default EmployedCard;
