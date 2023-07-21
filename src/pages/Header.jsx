import "./Header.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useLanguage } from "../LanguageContext";

function Header() {
  const { language, setLanguage, translations } = useLanguage();
  const handleChangeLanguage = (laanguage) => {
    setLanguage(laanguage);
  };

  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4A2WqYY9rES3GTPl2_a0VY1_tU-3zYrTmkA&usqp=CAU";

  return (
    <div className="header">
      <Grid container spacing={2}>
        <Grid
          xs={1}
          justifyContent={"right"}
          alignItems={"center"}
          display={"flex"}
        >
          <img className="logo" src={imgUrl} alt="logo elca" />
        </Grid>
        <Grid xs={5}>
          <h1 className="title">Project Information Management</h1>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid xs={1}></Grid>
        <Grid
          xs={1}
          justifyContent={"right"}
          alignItems={"center"}
          display={"flex"}
        >
          <span>
            <span>
              <button className="languageButton"
                onClick={() => handleChangeLanguage("en")}
                style={{ color: language !== "en" ? "#60a2cc" : "black" }}
              >
                EN
              </button>
            </span>
            <span style={{color: "#60a2cc"}}>|</span>
            <span>
              <button className="languageButton" 
              onClick={() => handleChangeLanguage("fr")}
              style={{ color: language !== "fr" ? "#60a2cc" : "black" }}
              >FR</button>
            </span>
          </span>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid
          xs={1}
          justifyContent={"right"}
          alignItems={"center"}
          display={"flex"}
        >
          {translations[language].helpLable}
        </Grid>
        <Grid
          xs={1}
          justifyContent={"right"}
          alignItems={"center"}
          display={"flex"}
        >
          {translations[language].logoutButton}
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
