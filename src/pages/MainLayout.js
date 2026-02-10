import { Outlet } from "react-router-dom";
import { FloatingContact } from "../component/FloatingContact";
import { Footer } from "../component/Footer";
import { CustomNavbar } from "../component/CustomNavbar";

const MainLayout = () => {
  return (
    <>
      <CustomNavbar />
      <FloatingContact />
      <Outlet /> {/* هذا مكان محتوى الصفحات */}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;