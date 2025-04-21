import React from "react";
import {
  Root,Login,Home,Register,Dashboard,LichHoc,ChuongTrinhKhung
} from "../pages/index.js";
import path from "./Path.js";
import { Spin } from "antd";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useUser } from "../contexts/UserContext.js";

const Router = () => {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spin />;

  const routes = [
    {
      path: `${path.ROOT}`,
      element: <Root />,
      // children,
      children: [
        // index dùng để vào trang đầu tiên khi truy cập trang web
        { index: true, element: <Navigate to={path.HOME}  /> },
        { path: path.HOME, element: <Home /> }, 
        { path: path.Register, element: <Register /> }, 
        { path: path.Dashboard, element: <Dashboard /> }, 
        { path: path.LICHHOC, element: <LichHoc /> }, 
        { path: path.CHUONGTRINHKHUNG, element: <ChuongTrinhKhung /> }, 
        // { path: `${path.MAIN_CATEGORY}`, element: <MainCategoryPage /> },
        // { path: `${path.SUB_CATEGORY}`, element: <SubCategoryPage /> },
        // { path: `${path.DETAIL_CATEGORY}`, element: <DetailCategoryPage /> },
        // { path: `${path.ORDER}`, element: <OrderPage /> },
        // { path: `${path.CONTRACT}`, element: <ContractPage /> },
        // { path: `${path.ORDER_REPORT}`, element: <OrderReportPage /> },
        // { path: `${path.PRODUCT_REPORT}`, element: <ProductReportPage /> },
        // { path: `${path.CUSTOMER_REPORT}`, element: <CustomerReportPage /> },
        // { path: `${path.FACTORY}`, element: <FactoryPage /> },
        // { path: `${path.UNIT}`, element: <UnitPage /> },
        // { path: `${path.PRODUCT}`, element: <ProductPage /> },
        // { path: `${path.PROMOTION}`, element: <PromotionPage /> },
        // { path: `${path.PRODUCT_PRICE}`, element: <ProductPricePage /> },
        // { path: `${path.WAREHOUSE}`, element: <WarehousePage /> },
        // { path: `${path.PALLET}`, element: <PalletPage /> },
        // { path: `${path.RACK}`, element: <RackPage /> },
        // { path: `${path.CUSTOMER}`, element: <CustomerPage /> },
        // { path: `${path.CUSTOMER_ROUTE}`, element: <CustomerRoutePage /> },
        // { path: `${path.DISTRIBUTOR}`, element: <DistributorPage /> },
        // { path: `${path.BRAND}`, element: <BrandPage /> },
        // { path: `${path.SUPPLIER}`, element: <SupplierPage /> },
        // { path: `${path.USER}`, element: <UserPage /> },
        // { path: `${path.PROFILE}`, element: <ProfilePage /> },
      ],
    },
    { path: `${path.LOGIN}`, element: <Login /> },
    { path: `${path.ALL}`, element: <Navigate to={`${path.ROOT}`} /> },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
