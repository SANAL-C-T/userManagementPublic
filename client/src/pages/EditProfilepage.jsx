import React from "react";

//loading components
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ProfileBody from "../component/Editprofile";


const EditprofilePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <ProfileBody />
      <Footer />
    </div>
  );
};
export default EditprofilePage;
