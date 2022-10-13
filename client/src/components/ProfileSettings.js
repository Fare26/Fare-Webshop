import { React, useEffect, useContext } from "react";
import ProfileEdit from "./ProfileEdit";
import "./ProfileSettings.css";
import { AuthContext } from "../helpers/AuthContext";

const ProfileSettings = (props) => {
  const { editData, setEditData, editDataHandler, submitProfileSettings } =
    props;
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    setEditData({
      username: authState.username,
      email: authState.email,
      firstName: authState.firstName,
      lastName: authState.lastName,
      address: authState.address,
      country: authState.country,
      phone: authState.phone,
    });
  }, []);
  return (
    <form className="profile-settings-form" onSubmit={submitProfileSettings}>
      <h2>Edit Profile Settings</h2>
      <ProfileEdit editData={editData} editDataHandler={editDataHandler} />
      <button className="profile-settings-btn">Save</button>
    </form>
  );
};

export default ProfileSettings;
