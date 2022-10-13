import React from "react";
import EditInput from "./EditInput";

const ProfileEdit = (props) => {
  const { editData, editDataHandler } = props;

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
      disabled: true,
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
      disabled: true,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      errorMessage: "It should be a valid address!",
      label: "Address:",
      pattern: "^[A-Za-z0-9]{0,}$",
      required: true,
      disabled: true,
    },
    {
      id: 4,
      name: "country",
      type: "text",
      errorMessage: "It should be a valid country!",
      label: "Country:",
      pattern: "^[A-Za-z]{0,}$",
      required: true,
      disabled: true,
    },
    {
      id: 5,
      name: "phone",
      type: "text",
      errorMessage: "Phone number must be a number!",
      label: "Phone number:",
      pattern: "^[0-9]{9,}$",
      required: true,
      disabled: true,
    },
  ];
  return (
    <div className="edit-div">
      {inputs.map((input) => (
        <EditInput
          key={input.id}
          {...input}
          value={editData[input.name]}
          onChange={editDataHandler}
        />
      ))}
    </div>
  );
};

export default ProfileEdit;
