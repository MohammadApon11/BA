import { Outlet } from "react-router-dom";
import NavigationBar from "../Pages/Shared/NavigationBar/NavigationBar";
import Foot from "../Pages/Shared/Foot/Foot";

const Main = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Foot />
    </>
  );
};

export default Main;
