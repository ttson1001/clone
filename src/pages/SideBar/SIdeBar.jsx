import { Link } from "react-router-dom";
import "./SideBar.css";
import { useLanguage } from "../../LanguageContext";

function SideBar() {
  const { language, setLanguage, translations } = useLanguage();
  return (
    <>
      <div className="containt">
        <nav style={{ display: "block", paddingTop: "40px" }}>
          <Link id="link" className="projectList" to="/">
            {translations[language].titlePrjList}
          </Link>
          <br />
          <Link id="link" to="/project">
            {translations[language].new}
          </Link>
          <br />
          <Link id="link" to="/project">
            {translations[language].project}
          </Link>
          <br />
          <Link id="link" className="orther" to="/#">
          {translations[language].customer}
          </Link>
          <br />
          <Link id="link" className="orther" to="/#">
          {translations[language].supplier}
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
