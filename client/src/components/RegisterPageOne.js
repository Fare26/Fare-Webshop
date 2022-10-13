import React from "react";
import RegisterInput from "./RegisterInput";

const RegisterPageOne = (props) => {
  const { registerData, registerDataHandler } = props;

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      errorMessage:
        "First name shouldn't include any special character or numbers!",
      label: "First name:",
      pattern: "^[A-Za-z]{0,}$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      errorMessage:
        "Last name shouldn't include any special character or numbers!",
      label: "Last name:",
      pattern: "^[A-Za-z]{0,}$",
      required: true,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      errorMessage: "It should be a valid address!",
      label: "Address:",
      pattern: "^[A-Za-z0-9]{0,}$",
      required: true,
    },
    {
      id: 4,
      name: "country",
      type: "text",
      errorMessage: "It should be a valid country!",
      label: "Country:",
      pattern: "^[A-Za-z]{0,}$",
      required: true,
    },
    {
      id: 5,
      name: "phone",
      type: "text",
      errorMessage: "Phone number must be a number!",
      label: "Phone number:",
      pattern: "^[0-9]{9,}$",
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

export default RegisterPageOne;
