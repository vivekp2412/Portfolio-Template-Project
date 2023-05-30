import { Outlet } from "react-router-dom";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";

function AdminContainer() {
  return (
    <div>
      <AdminNavbarContainer />
      <Outlet />
    </div>
  );
}

export default AdminContainer;
