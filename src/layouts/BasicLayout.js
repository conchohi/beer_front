import Footer from "./Footer";
import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className=" min-h-[960px] mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default BasicLayout;
