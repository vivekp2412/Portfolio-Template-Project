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
//Desktop Navbar
function DesktopNavbar() {
  const isAuthentucated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
        navigate("/admin/login");
      })
      .catch((err) => {
        toast(err.message);
      });
  };
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <span className={style.title}>
            PORTF<span style={{ color: "#B88B05" }}>O</span>LIO-ADMIN
          </span>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <NavLink to={`/admin/home`}>HOME</NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink to={`/admin/products`}>PRODUCTS</NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink to={`/admin/works`}>WORK</NavLink>
            </li>
            <li className={style.navoption}>
              <NavLink to={`/admin/contact`}>CONTACT US</NavLink>
            </li>
            {isAuthentucated && (
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
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DesktopNavbar;
