import "./App.css";
import RouteComponent from "./Routes/RouteComponent";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./Hooks/Hooks";
import { fetchCategories, fetchProductsData } from "./slices/productSlice";
import { fetchCarouselData } from "./slices/homeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWorkData } from "./slices/workSlice";
import { fetchContactData } from "./slices/contactSlice";
import { auth } from "./firebase";
import { loginUser } from "./slices/authSlice";
import tailwindConfig from "../tsconfig.json";
import Loader from "./components/Comman/Loader/Loader";
function App() {
  const dispatch = useAppDispatch();
  const [loadng, setLoading] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await dispatch(fetchProductsData());
        await dispatch(fetchCategories());
        await dispatch(fetchCarouselData());
        await dispatch(fetchContactData());
        await dispatch(fetchWorkData());
      } catch (err) {
        alert(err);
      }
    };
    fetch();
    setLoading(false);
    // const listener = auth.onAuthStateChanged((user) => {
    //   if (!user) {
    //   } else {
    //     dispatch(loginUser());
    //   }
    // });
    // return () => listener();
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
