import { getAuth, signOut } from "firebase/auth";
import { confirmAlert } from "react-confirm-alert";
import {
  Link,
  Navigate,
  NavLink,
  useAsyncError,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hooks";
import { logoutUser } from "../../../../slices/authSlice";
import style from "../Desktop-Navbar/style.module.css";
import { useState } from "react";
import DefaultSpeedDial from "../../../Comman/Speed-Dial/SpeedDial";
//Desktop Navbar
function DesktopNavbar() {
  const isAuthentucated = useAppSelector((state) => state.auth.isAuthenticated);
  const data = useAppSelector((state) => state.contact.contactDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
        toast.success("Logged out Successfully");

        navigate("/admin/login");
      })
      .catch((err) => {
        toast(err.message);
      });
  };
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          {data["Portfolio Name"] && (
            <span className={style.title}>
              {data["Portfolio Name"].slice(0, 3).toUpperCase()}
              <span className={style.secondary_text}>
                {data["Portfolio Name"].slice(3, 4).toUpperCase()}
              </span>
              {data["Portfolio Name"].slice(4).toUpperCase()}
              -ADMIN
            </span>
          )}
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <NavLink
                to={`/admin/home`}
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
              >
                HOME
              </NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink
                to={`/admin/products`}
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
              >
                PRODUCTS
              </NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink
                to={`/admin/works`}
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
              >
                WORK
              </NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink
                to={`/admin/contact`}
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
              >
                CONTACT US
              </NavLink>
            </li>

            <button
              className={style.navBtn}
              onClick={() => {
                confirmAlert({
                  title: "Logging Out User",
                  message: "Are you sure to do this.",
                  buttons: [
                    {
                      label: "Yes",
                      onClick: () => logOut(),
                    },
                    {
                      label: "No",
                      onClick: () => {},
                    },
                  ],
                });
              }}
            >
              LOGOUT
            </button>
          </ul>
        </div>
        {/* <DefaultSpeedDial/> */}
      </div>
    </>
  );
}

export default DesktopNavbar;
