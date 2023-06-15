import "./App.css";
import RouteComponent from "./Routes/RouteComponent";
import { useEffect } from "react";
import { useAppDispatch } from "./Hooks/Hooks";
import { fetchCategories, fetchProductsData } from "./slices/productSlice";
import { fetchCarouselData } from "./slices/homeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchProductsData());
        await dispatch(fetchCategories());
        await dispatch(fetchCarouselData());
      } catch (err) {
        alert(err);
      }
    };
    fetch();
  }, []);
  return (
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
  );
}

export default App;
