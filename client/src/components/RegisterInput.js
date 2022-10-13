import { React, useState } from "react";

const RegisterInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
      />
      {errorMessage && (
        <span className="register-err-span">{errorMessage}</span>
      )}
    </div>
  );
};

export default RegisterInput;
