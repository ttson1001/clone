import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar/SIdeBar";
import "./Styles.css";

function Default() {
  return (
    <>
      <div className="wrapper">
        <Header />
      </div>
      <div className="body">
        <div className="container">
          <SideBar />
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Default;
