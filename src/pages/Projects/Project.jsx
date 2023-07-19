import { Button, MenuItem, TextField } from "@mui/material";
import "./Project.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { fetchOptions } from "./ProjectApi";
import axios from "axios";

const data = {
  name: "",
  projectNumber: 0,
  customer: "",
  status: "",
  startDate: null,
  endDate: null,
  groupId: 0,
  members:""
}

function Project() {
  const [groups, setGroups] = useState([]);

  const formik = useFormik({
    initialValues: {
      projectNumber: "",
      name: "",
      customer: "",
      groupId: 1,
      members: "",
      status: "NEW",
      startDate: null,
      endDate: null,
    },
    validationSchema: Yup.object({
      projectNumber: Yup.string()
        .required("Required")
        .max(4, "Must be 4 number"),
      name: Yup.string().required("Required"),
      customer: Yup.string().required("Required"),
      startDate: Yup.date().required("Required"),
      endDate: Yup.date()
        .nullable()
        .min(
          Yup.ref("startDate"),
          "End date must be later than the start date"
        ),
    }),
    onSubmit: async (values) => {

      data.name = values.name;
      data.customer = values.customer;
      data.projectNumber = Number(values.projectNumber);
      data.status = values.status;
      data.startDate = values.startDate;
      data.endDate = values.endDate;
      data.groupId = Number(values.groupId);
      data.members = values.members;

      try {
        const response = await axios.post(
          "https://localhost:7099/projects",
          data
        );
        console.log("Record created:", response.data);
        // Handle the created record data
      } catch (error) {
        console.error("Error creating record:", error);
        // Handle the error
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchOptions();
      formik.setFieldValue("selectValue", options[0].id);
      setGroups(options);
    };

    fetchData();
  }, []);

  console.log(formik.errors);

  // console.log(formik.values.startDate);
  return (
    <>
      <div style={{ width: "70%" }}>
        <h2>New Project</h2>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} style={{ padding: "20px" }}>
            <Grid xs={2} className="lable">
              Project Number <span className="icon">*</span>
            </Grid>
            <Grid xs={6} style={{ paddingTop: "20px" }}>
              <TextField
                id="projectNumber"
                name="projectNumber"
                value={formik.values.projectNumber}
                onChange={formik.handleChange}
                variant="outlined"
                size="small"
                error={formik.errors.projectNumber ? true : false}
              />
              {formik.errors.projectNumber && (
                <p className="errorMsg">{formik.errors.projectNumber}</p>
              )}
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={2} className="lable">
              Project Name <span className="icon"> *</span>
            </Grid>
            <Grid xs={8} style={{ paddingTop: "20px" }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                size="small"
                error={formik.errors.name ? true : false}
              />
              {formik.errors.name && (
                <p className="errorMsg">{formik.errors.name}</p>
              )}
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={2} className="lable">
              Customer <span className="icon">*</span>
            </Grid>
            <Grid xs={8} style={{ paddingTop: "20px" }}>
              <TextField
                id="customer"
                name="customer"
                value={formik.values.customer}
                onChange={formik.handleChange}
                fullWidth
                size="small"
                error={formik.errors.customer ? true : false}
              />
              {formik.errors.customer && (
                <p className="errorMsg">{formik.errors.customer}</p>
              )}
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={2} className="lable">
              Group <span className="icon">*</span>
            </Grid>
            <Grid xs={2.8} style={{ paddingTop: "20px" }}>
              <TextField
                size="small"
                id="groupId"
                name="groupId"
                value={formik.values.groupId}
                onChange={formik.handleChange}
                select
                fullWidth
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={7.2}></Grid>
            <Grid xs={2} className="lable">
              Members
            </Grid>
            <Grid xs={8} style={{ paddingTop: "20px" }}>
              <TextField
                fullWidth
                id="members"
                name="members"
                value={formik.values.members}
                onChange={formik.handleChange}
                size="small"
              />
            </Grid>
            <Grid xs={2}></Grid>
            <Grid xs={2} className="lable">
              Status <span className="icon">*</span>
            </Grid>
            <Grid xs={2.8} style={{ paddingTop: "20px" }}>
              <TextField
                size="small"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                select
                fullWidth
              >
                <MenuItem value="NEW">NEW</MenuItem>
                <MenuItem value="PLA">PLA</MenuItem>
                <MenuItem value="INP">INP</MenuItem>
                <MenuItem value="FIN">FIN</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={7.2}></Grid>
            <Grid xs={2} className="lable">
              Start date <span className="icon">*</span>
            </Grid>
            <Grid xs={2.8} style={{ paddingTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={(value) => {
                    formik.setFieldValue("startDate", value, true);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: formik.errors.startDate ? true : false,
                    },
                  }}
                />
                {formik.errors.startDate && (
                  <p className="errorMsg">{formik.errors.startDate}</p>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid xs={0.4}></Grid>
            <Grid xs={2} className="lable">
              End date
            </Grid>
            <Grid xs={2.8} style={{ paddingTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={(value) => {
                    formik.setFieldValue("endDate", value, true);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: formik.errors.endDate ? true : false,
                    },
                  }}
                />
                {formik.errors.endDate && (
                  <p className="errorMsg">{formik.errors.endDate}</p>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid xs={1.2}></Grid>
          </Grid>
          <hr />
          <Grid container style={{ padding: "20px" }} spacing={2}>
            <Grid xs={2}></Grid>
            <Grid xs={3}></Grid>
            <Grid xs={3}>
              <Button fullWidth variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button type="submit" fullWidth variant="contained">
                Create Project
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default Project;
