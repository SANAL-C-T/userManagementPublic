import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserToEdit, deleteUserByAdmin } from "../features/AdminSlice";
import "../Css/usertile.css";
const backendPort = import.meta.env.VITE_BACKAPP_API_URL;
const UserTiles = () => {
  const { loading, users, error ,search } = useSelector((state) => state.FromStoreAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleAdminEdit = (index) => {
    const user = users[index];
    dispatch(getUserToEdit(user));
    navigate("/adminEdit");
  };

  const handleDeleteByAdmin = (index) => {
    const userToDelete = users[index];
    dispatch(deleteUserByAdmin({ email: userToDelete.Email }));
    navigate("/adminHome");
  };

  if (loading) {
    return <div className="noUser">Loading...</div>;
  }

  if (error) {
    return <div className="noUser">Error: {error}</div>;
  }

  if (!users || users.length === 0) {
    return <div className="noUser">No users found</div>;
  }

  return (
<div className="userTilesContainer">
  {search ? (
    search.map((user, index) => (
      <div className="userTile" key={user.Email}>
        <div className="userProfile">
          <img src={`${backendPort}${user.Profile}`} alt="user profile" />
        </div>
        <div className="userName">{user.Name}</div>
        <div className="userPhone">{user.Phone}</div>
        <div className="userEmail">{user.Email}</div>
        <div className="editBtn">
          <button onClick={() => handleAdminEdit(index)}>EDIT</button>
        </div>
        <div className="deleteBtn">
          <button onClick={() => handleDeleteByAdmin(index)}>DELETE</button>
        </div>
      </div>
    ))
  ) : (
    users.map((user, index) => (
      <div className="userTile" key={user.Email}>
        <div className="userProfile">
          <img src={`${backendPort}${user.Profile}`} alt="user profile" />
        </div>
        <div className="userName">{user.Name}</div>
        <div className="userPhone">{user.Phone}</div>
        <div className="userEmail">{user.Email}</div>
        <div className="editBtn">
          <button onClick={() => handleAdminEdit(index)}>EDIT</button>
        </div>
        
        <div className="deleteBtn">
          <button onClick={() => handleDeleteByAdmin(index)}>DELETE</button>
        </div>
      </div>
    ))
  )}
</div>

  );
};

export default UserTiles;
