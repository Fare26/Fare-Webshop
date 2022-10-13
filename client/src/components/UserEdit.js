import React from "react";
import EditInput from "./EditInput";

const UserEdit = (props) => {
  const { editData, editDataHandler, inputs } = props;

  return (
    <div className="profile-div">
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

export default UserEdit;
