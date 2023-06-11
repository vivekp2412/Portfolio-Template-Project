import "./App.css";
import RouteComponent from "./Routes/RouteComponent";
import { useEffect } from "react";
import { useAppDispatch } from "./Hooks/Hooks";
import { fetchCategories, fetchProductsData } from "./slices/productSlice";
import { fetchCarouselData } from "./slices/homeSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCategories());
    dispatch(fetchCarouselData());
  }, []);
  return <RouteComponent />;
}

export default App;
