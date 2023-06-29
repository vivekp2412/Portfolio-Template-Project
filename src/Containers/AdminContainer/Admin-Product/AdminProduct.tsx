import PreviewTable from "../../../components/Admin-Section/Product-Section/Preview-Table/PreviewTable";
import ProductForm from "../../../components/Admin-Section/Product-Section/Product-Form/ProductForm";

import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
import style from "../Admin-Product/style.module.css";
function AdminProduct() {
  return (
    <>
      <AdminNavbarContainer />

      <div className={style.Container}>
        <div className={style.productContainer}>
          <ProductForm />
          <PreviewTable />
        </div>
      </div>
    </>
  );
}

export default AdminProduct;
