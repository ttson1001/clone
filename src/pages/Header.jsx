import "./Header.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function Header() {
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
            <span>EN</span> | <span>FR</span>
          </span>
        </Grid>
        <Grid xs={1}></Grid>
        <Grid
          xs={1}
          justifyContent={"right"}
          alignItems={"center"}
          display={"flex"}
        >
          Help
        </Grid>
        <Grid
          xs={1}
          justifyContent={"right"}
          alignItems={"center"}
          display={"flex"}
        >
          LogOut
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
