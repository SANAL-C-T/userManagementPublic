import React, { useState } from "react";
import "../Css/Searchbar.css";
import { useDispatch } from "react-redux";
import { searchUser,setNull} from '../features/AdminSlice'; 

const Searchbar = () => {
  const dispatch = useDispatch();
  const [tosearch, setTosearch] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setTosearch(value);

    if (value.length === 0) {
      dispatch(setNull());
    }
  };

  const handleButtonClick = () => {
    console.log("Searching for:", tosearch);
    dispatch(searchUser({ val: tosearch }));
  };
 


  return (
    <div className="searchbar">
      <input
        type="search"
        placeholder="Search user...."
        onChange={handleSearchChange}
        value={tosearch}
      />
      <button onClick={handleButtonClick}>SEARCH</button>
    </div>
  );
};

export default Searchbar;
