import WorkFormModal from "../../../components/Admin-Section/Work-Section/Work-Form/WorkForm";
import style from "../Admin-OurWork/style.module.css";
import PreviewTable from "../../../components/Admin-Section/Work-Section/Preview-Table/PreviewTable";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
function AdminOurWorkContainer() {
  return (
    <>
      <AdminNavbarContainer />
      <div className={style.Container}>
        <div className={style.workContainer}>
          <WorkFormModal />
          <PreviewTable />
        </div>
      </div>
    </>
  );
}

export default AdminOurWorkContainer;
