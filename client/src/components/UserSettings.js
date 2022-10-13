import { React, useState } from "react";
import UserEdit from "./UserEdit";
import UserEditPassword from "./UserEditPassword";
import "./ProfileSettings.css";

const UserSettings = (props) => {
  const { editData, editDataHandler, submitUserSettings } = props;
  const [pass, setPass] = useState({ oldPassword: "", newPassword: "" });

  const inputs1 = [
    {
      id: 1,
      name: "username",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username:",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      disabled: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email:",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
      required: true,
      disabled: true,
    },
  ];

  const inputs2 = [
    {
      id: 3,
      name: "oldPassword",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Old password:",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
      disabled: true,
    },
    {
      id: 4,
      name: "newPassword",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "New password:",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
      disabled: true,
    },
  ];

  return (
    <form
      className="profile-settings-form"
      onSubmit={(e) => submitUserSettings(e, pass)}
    >
      <h2>Edit User Settings</h2>
      <UserEdit
        editData={editData}
        editDataHandler={editDataHandler}
        inputs={inputs1}
      />
      <UserEditPassword
        editData={editData}
        editDataHandler={editDataHandler}
        inputs={inputs2}
        pass={pass}
        setPass={setPass}
      />
      <button className="profile-settings-btn">Save</button>
    </form>
  );
};

export default UserSettings;
