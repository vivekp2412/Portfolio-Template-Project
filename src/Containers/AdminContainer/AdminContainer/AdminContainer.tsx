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
import { auth } from "../../../firebase";
function AdminContainer() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
 useEffect(()=>{
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme",theme);
 })
  return (
    <div>
      {isAuthenticated && <AdminNavbarContainer />}

      <Outlet />
    </div>
  );
}

export default AdminContainer;
