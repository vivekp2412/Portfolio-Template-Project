import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Hooks";
import {
  fetchCategories,
  fetchProductsData,
} from "../../../slices/productSlice";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminContainer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCategories());
  }, []);
  return (
    <div>
      <AdminNavbarContainer />

      <Outlet />
    </div>
  );
}

export default AdminContainer;
