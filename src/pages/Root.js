import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "antd";
import path from "../routes/Path";

const Root = () => {
  const isToken = localStorage.getItem("token");
  // const isToken = true;


  if (!isToken) {
    return <Navigate to={`${path.LOGIN}`} />;
  }
 
  return (
    <Layout className="min-h-screen">
      {/* <Sidebar />
      <Layout>
        <MainHeader />
        <div className="pb-5 px-5 bg-sub h-full"> */}
          <Outlet />
        {/* </div>
      </Layout> */}
    </Layout>
  );
};

export default Root;
