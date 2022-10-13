import { React, useState } from "react";
import "./ProfileSettings.css";

const UserEditPassword = (props) => {
  const { inputs, pass, setPass } = props;
  const [focused, setFocused] = useState(false);

  function editProfile(e) {
    let btn = e.target;
    btn.previousElementSibling.firstElementChild.disabled = false;
    btn.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.disabled = false;
  }

  return (
    <div className="profile-div">
      <div className="edit-pass">
        <label>{inputs[0].label}</label>

        <div className="old-pass">
          <input
            className="edit-inputs"
            name={inputs[0].name}
            type={inputs[0].type}
            pattern={inputs[0].pattern}
            required={inputs[0].required}
            disabled={inputs[0].disabled}
            value={pass[inputs[0].name]}
            onChange={(e) => setPass({ ...pass, oldPassword: e.target.value })}
            onBlur={() => setFocused(true)}
            focused={focused.toString()}
          />
          {inputs[0].errorMessage && (
            <span className="edit-err-span">{inputs[0].errorMessage}</span>
          )}
        </div>
        <label>{inputs[1].label}</label>

        <div className="new-pass">
          <input
            className="edit-inputs"
            name={inputs[1].name}
            type={inputs[1].type}
            pattern={inputs[1].pattern}
            required={inputs[1].required}
            disabled={inputs[1].disabled}
            value={pass[inputs[1].name]}
            onChange={(e) => setPass({ ...pass, newPassword: e.target.value })}
            onBlur={() => setFocused(true)}
            focused={focused.toString()}
          />
          {inputs[1].errorMessage && (
            <span className="edit-err-span">{inputs[1].errorMessage}</span>
          )}
        </div>

        <button
          className="pass-btn"
          onClick={(e) => editProfile(e)}
          type="button"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserEditPassword;
