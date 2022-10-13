import React from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onHideModal} />;
};

const ModalOverlay = (props) => {
  const navigation = useNavigate();
  function goToLoginPage() {
    navigation("/login", { replace: true });
    props.onHideModal();
  }
  return (
    <div className="modal">
      <div className="content">
        <div className="exit">
          <FaTimes onClick={props.onHideModal} />
        </div>
        <p>You must be logged in!</p>
        <button onClick={goToLoginPage}>LOGIN</button>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onHideModal={props.onHideModal} />,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
