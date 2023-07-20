import { Button, Grid, InputLabel, MenuItem, TextField } from "@mui/material";
import DataGridDemo from "./Table";
import { useEffect, useState } from "react";

import { fetchProjectList } from "../Projects/ProjectApi";

function ProjectList() {
  const [selectedValue, setSelectedValue] = useState("");

  const [data,SetData] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchProjectList();
      SetData(options);
    };

    fetchData();
  }, []);
  

  return (
    <div style={{ width: "90%" }}>
      <h2>Project List</h2>
      <hr />
      <Grid container style={{ padding: "20px" }} spacing={2}>
        <Grid xs={5} style={{ paddingRight: "40px" }}>
          <TextField fullWidth id="name" name="name" size="small" 
            placeholder="Project number, name, customer name"
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
              renderValue: (value) => (value === "" ? "Project status" : value),
            }}
          >
            <MenuItem value="">Project status</MenuItem>
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="PLA">PLA</MenuItem>
            <MenuItem value="INP">INP</MenuItem>
            <MenuItem value="FIN">FIN</MenuItem>
          </TextField>
        </Grid>
        <Grid xs={2} style={{ marginRight: "40px" }}>
          <Button type="submit" fullWidth variant="contained">
            Search Project
          </Button>
        </Grid>
        <Grid xs={2}>
          <Button variant="text">Reset Search</Button>
        </Grid>
      </Grid>

      <div>
        <DataGridDemo data={data}/>
      </div>
    </div>
  );
}

export default ProjectList;
