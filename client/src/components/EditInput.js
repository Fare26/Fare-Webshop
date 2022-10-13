import { React, useState } from "react";

const EditInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  function editProfile(e) {
    let btn = e.target;
    btn.previousElementSibling.firstElementChild.disabled = false;
  }

  return (
    <div className="editInput">
      <label>{label}</label>

      <div>
        <input className="edit-inputs"
          {...inputProps}
          onChange={onChange}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
        />
        {errorMessage && <span className="edit-err-span">{errorMessage}</span>}
      </div>
      {inputProps.name !== "newPassword" && (
        <button onClick={(e) => editProfile(e)} type="button">
          Edit
        </button>
      )}
    </div>
  );
};

export default EditInput;
