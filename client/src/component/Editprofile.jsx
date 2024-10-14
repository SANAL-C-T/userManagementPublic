import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Css/editprofile.css";
import { PlusSquareIcon } from "lucide-react";
import { uploadEditedData } from "../features/LoginSlice";
import { useNavigate } from "react-router-dom";

const Editprofile = () => {


  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.FromStoreLogin);
  const [usesname, setName] = useState(user.Name);
  const [usersphone, setPhone] = useState(user.Phone);

  const [pimage, setpImage] = useState("");

  const [profileImage, setProfileImage] = useState("");

  const addImage = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setpImage(URL.createObjectURL(file));
    console.log("pimage:::", pimage);
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
    formData.append("name", usesname);
    formData.append("phone", usersphone);
    formData.append("email",user.Email);
    // formData.append("profilePic", profileImage);
    formData.append("UserProfilePic", profileImage);

    try {
      dispatch(uploadEditedData(formData));
      Navigate("/homepage");
    } catch (error) {
      console.error("Failed to upload data:", error);
    }
  };

  return (
    <div className="container">
      <h3 className="title">Edit Profile</h3>

      <form>
        <label htmlFor="editname">Name</label>
        <div>
          <input
            type="text"
            className="editname"
            id="editname"
            placeholder={user.Name}
            onChange={handleNameChange}
          ></input>
        </div>
        <label htmlFor="editphone">Phone number</label>
        <div>
          <input
            type="text"
            className="editphone"
            id="editphone"
            placeholder={user.Phone}
            onChange={handlePhoneChange}
          ></input>
        </div>
        <label htmlFor="addprofilepic">Add profile image</label>
        <div className=" imgsection">
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
            <img src={pimage} alt="selected Image"></img>
          </div>
        </div>

        <div>
          <button className="savebutton" onClick={sendDataToMiddleware}>
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};
export default Editprofile;
