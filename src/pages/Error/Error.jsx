import { Grid } from "@mui/material";
import Header from "../Header";
import "./Error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div className="wrapper">
        <Header />
      </div>
      <div className="body">
        <Grid container item xs={12} spacing={3}>
          <Grid
            item
            xs={6}
            style={{
              justifyContent: "flex-end",
              display: "flex",
              paddingTop: "80px",
              paddingRight: "50px",
            }}
          >
            <img
              style={{ width: "200px", height: "200px" }}
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTBzC4zUeclLWky5HaAUOGKE8koCoTz0J8aMs_P2ttso2xqOtJF"
              alt=""
            />
          </Grid>
          <Grid item xs={6} style={{ paddingTop: "80px" }}>
            <p>
              <span className="paragrah">Unexpected error occurred.</span>
              <br /> <span className="paragrah"> Please </span>{" "}
              <span
                style={{
                  color: "#c64d35",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                contact your administrator
              </span>
            </p>
           
            <Link id="link" className="orther" to="/project-list">
            <span className="paragrah"> or </span>
              <span
                style={{
                  color: "#3c85e9",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                back to search project
              </span>
            </Link>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Error;
