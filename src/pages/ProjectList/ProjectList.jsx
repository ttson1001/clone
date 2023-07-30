import { Button, Grid, MenuItem, TextField } from "@mui/material";
import DataGridDemo from "./Table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteProject, fetchProjectList2 } from "../Projects/ProjectApi";
import { useLanguage } from "../../LanguageContext";

function ProjectList() {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const {language, setLanguage, translations} = useLanguage();

  const searchObject = {
    searchValue: null,
    status: null
  };

  const handleSubmit = () => {
    searchObject.searchValue = searchValue;
    searchObject.status = selectedValue
    const fetchData = async () => {
      const options = await fetchProjectList2(searchObject);
      setData(options?? []);
    };

    fetchData();
  }

  const handleDeleteRow = async (ids) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this row?");
      if (!confirmed) {
        return; // User canceled the delete operation.
      }
      const newList = { ids: ids };
      await deleteProject(newList)
      setData((data) => data.filter((row) => !ids.includes(row.id)));
      toast.success("Row(s) deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,});
    } catch (error) {
      console.log("Error deleting project: ", error);
      toast.error("Row(s) deleted faill!", {
        position: toast.POSITION.BOTTOM_RIGHT,});
    }
  };

  const handleCliclss = () => {
    toast.success("Row(s) deleted successfully!", {
      autoClose: 1500,
      position: toast.POSITION.TOP_RIGHT,});
      toast.error("Row(s) deleted faill!", {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,});
  }


  const handleReset = () => {
    searchObject.searchValue = null;
    searchObject.status = null;

    setSearchValue("")
    setSelectedValue("")

    const fetchData = async () => {
      const options = await fetchProjectList2(searchObject);
      setData(options ??[]);
    };

    fetchData();
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchProjectList2(searchObject);
      setData(options?? []);
    };  
    
    fetchData();
  }, []);

  return (
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
              renderValue: (value) => (value === "" ? translations[language].seletectBox : value),
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
          <Button type="submit" fullWidth variant="contained" onClick={handleSubmit}>
            {translations[language].searchPrjBtn}
          </Button>
        </Grid>
        <Grid xs={2}>
          <Button onClick={handleReset} variant="text"> {translations[language].resetSearchPrjBtn}</Button>
        </Grid>
      </Grid>

      <div>
        <DataGridDemo data={data} onDeleteRow={handleDeleteRow}/>
      </div>

      <button onClick={handleCliclss}>sssssssssssss</button>
    </div>
  );
}

export default ProjectList;
