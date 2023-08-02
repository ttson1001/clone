import {
  Button,
  Grid,
  MenuItem,
  TablePagination,
  TextField,
} from "@mui/material";
import DataGridDemo from "./Table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteProject,
  fetchProjectList2,
  fetchProjectList3,
} from "../Projects/ProjectApi";
import { useLanguage } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";
import Pagging from "../Paging/Paging";

function ProjectList() {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [s, setS] = useState(true);
  const { language, setLanguage, translations } = useLanguage();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const searchObject = {
    searchValue: null,
    status: null,
    pageNumber: page,
    pageSize: rowsPerPage,
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSubmit = () => {
    searchObject.searchValue = searchValue;
    searchObject.status = selectedValue;
    setS(false);
    console.log("sdafsdf", searchObject);
    const fetchData = async () => {
      const options = await fetchProjectList3(searchObject);
      setData(options.data ?? []);
      setCount(options.totalItems);
    };

    fetchData();
  };
  console.log(s);

  const handleDeleteRow = async (ids) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this row?"
      );
      if (!confirmed) {
        return; // User canceled the delete operation.
      }
      const newList = { ids: ids };
      await deleteProject(newList);
      setData((data) => data.filter((row) => !ids.includes(row.id)));
      setCount((prevCount) => prevCount - ids.length);
      const options = await fetchProjectList3(searchObject)
      setData(options.data ?? []);
      setCount(options.totalItems);
      toast.success("Project deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log("Error deleting project: ", error);
      toast.error("Project deleted faill!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleReset = () => {
    searchObject.searchValue = null;
    searchObject.status = null;
    setS(true);
    console.log(searchObject);
    setSearchValue("");
    setSelectedValue("");

    const fetchData = async () => {
      const options = await fetchProjectList3(searchObject);
      setData(options.data ?? []);
      setCount((prevCount) => prevCount = options.totalItems);
    };

    fetchData().catch((e) => {
      console.log("skdfja", e);
    });
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    console.log(searchObject.status);
    if (s === false) {
      searchObject.searchValue = searchValue;
      searchObject.status = selectedValue;
    }
    const fetchData = async () => {
      try {
        const options = await fetchProjectList3(searchObject);
        setData(options.data ?? []);
        setCount(options.totalItems);
        console.log(options.data);
      } catch (error) {
        // console.log("Error occurred during fetch: ", error.code);
        if (error.code === "ERR_NETWORK") navigate("/error"); // Redirect to '/error' page in case of an error
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  return (
    <>
      <div style={{ width: "90%" }}>
        <h2>{translations[language].titlePrjList}</h2>
        <hr />
        <Grid container style={{ padding: "20px" }} spacing={2}>
          <Grid xs={5} style={{ paddingRight: "40px" }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              size="small"
              value={searchValue}
              placeholder={translations[language].searchTxt}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
          <Grid xs={2} style={{ marginRight: "40px" }}>
            <TextField
              size="small"
              id="status"
              name="status"
              placeholder="Project status"
              select
              fullWidth
              value={selectedValue}
              onChange={handleChange}
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) =>
                  value === "" ? translations[language].seletectBox : value,
              }}
            >
              <MenuItem value="">{translations[language].seletectBox}</MenuItem>
              <MenuItem value="NEW">NEW</MenuItem>
              <MenuItem value="PLA">PLA</MenuItem>
              <MenuItem value="INP">INP</MenuItem>
              <MenuItem value="FIN">FIN</MenuItem>
            </TextField>
          </Grid>
          <Grid xs={2} style={{ marginRight: "40px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              {translations[language].searchPrjBtn}
            </Button>
          </Grid>
          <Grid xs={2}>
            <Button onClick={handleReset} variant="text">
              {" "}
              {translations[language].resetSearchPrjBtn}
            </Button>
          </Grid>
        </Grid>

        {/* <div>
        <DataGridDemo data={data} onDeleteRow={handleDeleteRow} />
      </div> */}
        <br />
        <div>
          <Pagging data={data} onDeleteRow={handleDeleteRow} />
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default ProjectList;
