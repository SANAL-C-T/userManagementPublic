import React from "react";
import { useSelector } from "react-redux";

// loading components
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Body from "../component/Body";
import AdminHome from "../component/Adminhome"

import AdminNavbar from "../component/AdminNavbar";
const Homepage = () => {
  const { IsAdmin } = useSelector((state) => state.FromStoreLogin.user);
console.log("IsAdmin:::",IsAdmin)
  return (
    <div className="homepage">
     
      {!IsAdmin &&  <Navbar />}
      {!IsAdmin && <Body />}
      {IsAdmin && <AdminNavbar />}
      {IsAdmin && <AdminHome />}
      <Footer />
    </div>
  );
};

export default Homepage;
