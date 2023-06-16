import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import {
  fetchCategories,
  fetchProductsData,
} from "../../../slices/productSlice";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWorkData } from "../../../slices/workSlice";
function AdminContainer() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCategories());
    dispatch(fetchWorkData());
  }, []);
  return (
    <div>
      {isAuthenticated && <AdminNavbarContainer />}

      <Outlet />
    </div>
  );
}

export default AdminContainer;
