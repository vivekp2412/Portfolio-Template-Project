import "./App.css";
import RouteComponent from "./Routes/RouteComponent";
import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./Hooks/Hooks";
import { fetchCategories, fetchProductsData } from "./slices/productSlice";
import { fetchCarouselData } from "./slices/homeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWorkData } from "./slices/workSlice";
import { fetchContactData } from "./slices/contactSlice";
import Loader from "./components/Comman/Loader/Loader";
import { auth } from "./firebase";
import { loginUser } from "./slices/authSlice";
function App() {
  const dispatch = useAppDispatch();
  // const pending = useAppSelector((state) => state.contact.pending);
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchProductsData());
        await dispatch(fetchCategories());
        await dispatch(fetchCarouselData());
        await dispatch(fetchContactData());
      } catch (err) {
        alert(err);
      }
    };
    fetch();
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) {
      } else {
        dispatch(loginUser());
      }
    });
    return () => listener();
  }, []);
  return (
    <>
      <>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <RouteComponent />
      </>
      {/* )} */}
    </>
  );
}

export default App;
