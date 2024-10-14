import React from "react";
import AdminNavbar from "../component/AdminNavbar";
import AdminCreateUser from "../component/AdminCreateUser";
import Footer from '../component/Footer'
const AdminCreateNewUser = () => {
  return (
    <div>
      <AdminNavbar />
      <AdminCreateUser />
      <Footer />
    </div>
  );
};
export default AdminCreateNewUser;
