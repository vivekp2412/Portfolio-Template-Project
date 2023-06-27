import { useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import style from "../AdminContainer/style.module.css";
import ThemeSideBar from "../../../components/Comman/Theme-Sidebar/ThemeSideBar";
function AdminContainer() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "pink");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);
  function handleSideBar() {
    setShowThemeMenu(!showThemeMenu);
  }
  return (
    <div
      style={{ overflow: "hidden", minHeight: "100vh", position: "relative" }}
    >
      <AdminNavbarContainer />
      <div className={style.settings} onClick={handleSideBar}>
        <FontAwesomeIcon icon={faCog} size="x" className={style.settingsIcon} />
      </div>
      <Outlet />
      <div className={`${style.sideBar} ${showThemeMenu ? style.open : ""}`}>
        <ThemeSideBar toggleSlide={setShowThemeMenu} />
      </div>
    </div>
  );
}

export default AdminContainer;
