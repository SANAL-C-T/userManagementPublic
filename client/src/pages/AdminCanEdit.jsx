import React from "react";

import Footer from "../component/Footer";
import AdminNavbar from "../component/AdminNavbar";
import AdminEDits from "../component/AdminEditBody";

const AdminCanEdit = () => {
  return (
    <div className="AdminCanEdit">
      <AdminNavbar />
      <AdminEDits />
      <Footer />
    </div>
  );
};
export default AdminCanEdit;
