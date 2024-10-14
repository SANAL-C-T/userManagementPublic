import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Css/editprofile.css";
import { PlusSquareIcon } from "lucide-react";
import { uploadEditedAdminData } from "../features/AdminSlice";
import { useNavigate } from "react-router-dom";

const AdminEditBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToEdit } = useSelector((state) => state.FromStoreAdmin);
  const [username, setName] = useState(userToEdit.Name);
  const [userphone, setPhone] = useState(userToEdit.Phone);
  const [profileImage, setProfileImage] = useState("");

  const addImage = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const sendDataToMiddleware = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", username);
    formData.append("phone", userphone);
    formData.append("email", userToEdit.Email);
    formData.append("UserProfilePic", profileImage);

    try {
      await dispatch(uploadEditedAdminData(formData));
      navigate("/adminHome");
    } catch (error) {
      console.error("Failed to upload data:", error);
    }
  };

  return (
    <div className="container">
      <h3 className="title">Admin edits user profile</h3>
      <form onSubmit={sendDataToMiddleware}>
        <label htmlFor="editname">Name</label>
        <div>
          <input
            type="text"
            className="editname"
            id="editname"
            placeholder={userToEdit.Name}
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <label htmlFor="editphone">Phone number</label>
        <div>
          <input
            type="text"
            className="editphone"
            id="editphone"
            placeholder={userToEdit.Phone}
            value={userphone}
            onChange={handlePhoneChange}
          />
        </div>
        <label htmlFor="addprofilepic">Add profile image</label>
        <div className="imgsection">
          <div className="leftInput">
            <label htmlFor="addprofilepic" className="custom-file-label">
              <PlusSquareIcon size={100} className="custom-icon" />
            </label>
            <input
              type="file"
              className="custom-file-input"
              name="UserProfilePic"
              id="addprofilepic"
              onChange={addImage}
            />
          </div>
          <div className="rightInput">
            <img src={`http://16.171.174.109:5000${userToEdit.Profile}`} alt="Profile" />
          </div>
        </div>
        <div>
          <button className="savebutton" type="submit">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditBody;