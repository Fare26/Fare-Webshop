import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";
import { FaUserCircle } from "react-icons/fa";
import RegisterPageOne from "../components/RegisterPageOne";
import RegisterPageSecond from "../components/RegisterPageSecond";

const defaultRegisterStates = {
  firstName: "",
  lastName: "",
  address: "",
  country: "",
  phone: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = (props) => {
  const { registerData, registerDataHandler, submitForm, setRegisterData } =
    props;

  useEffect(() => {
    setRegisterData(defaultRegisterStates);
  }, []);

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={submitForm}>
        <FaUserCircle className="form-avatar" />
        <h1>Register</h1>
        <div className="form-content">
          <RegisterPageOne
            registerData={registerData}
            registerDataHandler={registerDataHandler}
          />
          <RegisterPageSecond
            registerData={registerData}
            registerDataHandler={registerDataHandler}
          />
        </div>
        <button type="submit">Register</button>
        <Link to="/login">You already have an account!</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
