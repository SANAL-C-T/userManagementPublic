import React from "react";
import Adminhomebody from "../component/Adminhome";
import Footer from "../component/Footer";
import AdminNavbar from "../component/AdminNavbar";

const AdminHomepage = () => {
  return (
    <div className="adminHomepage">
      <AdminNavbar />
      <Adminhomebody />
      <Footer />
    </div>
  );
};
export default AdminHomepage;
