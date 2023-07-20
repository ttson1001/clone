import { Link } from "react-router-dom";
import "./SideBar.css"

function SideBar() {
  return (
    <>
      <div className="containt">
        <nav style={{ display: "block" , paddingTop: "40px"}}>
          <Link id="link" className="projectList" to="/">
            Project list
          </Link>
          <br />
          <Link id="link" to="/project">
            New
          </Link>
          <br />
          <Link id="link" to="/project">
            Project
          </Link>
          <br />
          <Link id="link" className="orther" to="/#">
            Customer
          </Link>
          <br />
          <Link id="link" className="orther" to="/#">
            Supplier
          </Link>
          <br />
          <Link id="link" className="orther" to="/error">
            Error
          </Link>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
