import { useEffect, useState } from "react";
import { dataref } from "../../../../firebase";
interface Datatype {
  productImage: File;
  productId: string;
  productCategory: string;
  productName: string;
  productImageUrl: string;
}
function PreviewTable() {
  const [productArray, setProductArray] = useState<Datatype[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await dataref.ref("Products").once("value");
        if (products.val() == undefined) {
          setProductArray([]);
        } else {
          console.log(products.val().productList);

          setProductArray(products.val().productList);
          console.log("hi");
        }
      } catch (error) {
        console.log("Error fetching data from Firebase:", error);
      }
    };
    fetchData();
  }, []);
  console.log(productArray);

  return <div>Preview Table</div>;
}

export default PreviewTable;
