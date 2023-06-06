import PreviewTable from "../../../components/Admin-Section/Product-Section/Preview-Table/PreviewTable";
import ProductForm from "../../../components/Admin-Section/Product-Section/Product-Form/ProductForm";
import ProductSection from "../../../components/Admin-Section/Product-Section/ProductSection";
import style from "../Admin-Product/style.module.css";
ProductSection;
function AdminProduct() {
  return (
    <div className={style.Container}>
      <div className={style.productContainer}>
        {/* <ProductSection /> */}
        <ProductForm />
        <PreviewTable />
      </div>
    </div>
  );
}

export default AdminProduct;
