import React from "react";
import RegisterInput from "./RegisterInput";

const RegisterPageSecond = (props) => {
  const { registerData, registerDataHandler } = props;

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username:",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email:",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password:",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      errorMessage: "Passwords don't match!",
      label: "Confirm password:",
      pattern: registerData.password,
      required: true,
    },
  ];

  return (
    <div className="form-div">
      {inputs.map((input) => (
        <RegisterInput
          key={input.id}
          {...input}
          value={registerData[input.name]}
          onChange={registerDataHandler}
        />
      ))}
    </div>
  );
};

export default RegisterPageSecond;
