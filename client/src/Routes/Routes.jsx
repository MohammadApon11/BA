import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Instructors from "../Pages/Instructors/Instructors";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import StudentHome from "../Pages/Dashboard/Student/StudentHome/StudentHome";
import Payment from "../Pages/Dashboard/Student/Payment/Payment";
import MyEnrolled from "../Pages/Dashboard/Student/MyEnrolled/MyEnrolled";
import AddClass from "../Pages/Dashboard/Instructor/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses/MyClasses";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import NotFound from "../Pages/NotFound/NotFound";
import Products from "../Pages/products/Products";
import Categories from "../components/Home/Categories";
import AddCart from "../Pages/products/AddCart";
import CartPage from "../Pages/Dashboard/User/Cart/CartPage";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess/PaymentSuccess";
import PaymentFail from "../Pages/Dashboard/PaymentFail/PaymentFail";
import OrderHistory from "../Pages/Dashboard/Student/OrdersHistory/OrdersHistory";
import Wishlists from "../Pages/Dashboard/Wishlists/Wishlists";
import Order from "../Pages/Dashboard/Shoper/Order/Order";
import AddProducts from "../Pages/Dashboard/Shoper/AddProducts/AddProducts";
import MyProducts from "../Pages/Dashboard/Shoper/MyProducts/MyProducts";
import ManageProducts from "../Pages/Dashboard/Admin/ManageProducts/ManageProducts";
import ManageOrders from "../Pages/Dashboard/Admin/ManageOrders/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // {
      //   path: "/shops",
      //   element: <Instructors />,
      // },
      {
        path: "/products",
        element: <Products />,
      },
      // update from
      {
        path: "/products/:categoryId",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <AddCart />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/payment/success/:tranId",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/fail/:tranId",
        element: <PaymentFail />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "history",
        element: <OrderHistory />,
      },
      {
        path: "wishlists",
        element: <Wishlists />,
      },
      // shoper route
      {
        path: "addProducts",
        element: <AddProducts />,
      },
      {
        path: "myProducts",
        element: <MyProducts />,
      },
      // admin route
      {
        path: "manageProducts",
        element: <ManageProducts />,
      },
      {
        path: "manageOrders",
        element: <ManageOrders />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
    ],
  },
]);

export default router;
