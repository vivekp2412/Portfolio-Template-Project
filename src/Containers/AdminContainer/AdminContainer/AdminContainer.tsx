import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { fetchProductsData } from "../../../slices/productSlice";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";

function AdminContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsData());
  }, []);
  return (
    <div>
      <AdminNavbarContainer />
      <Outlet />
    </div>
  );
}

export default AdminContainer;
