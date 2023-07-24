import { Button, MenuItem, TextField } from "@mui/material";
import "./Project.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  fetchOptions,
  fetchProject,
  fetchProjectNumberList,
} from "./ProjectApi";
import axios from "axios";
import {  useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useLanguage } from "../../LanguageContext";




const dataInit = {
  id: 0,
  name: "",
  projectNumber: 0,
  customer: "",
  status: "",
  startDate: null,
  endDate: null,
  groupId: 0,
  members: "",
};

function Project() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [project, setProject] = useState(null);
  const { language, setLanguage, translations } = useLanguage();
  const [check, setChek] = useState(true)
  let { projectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const object = await fetchProject(projectId);
      setProject(object);
    };

    fetchData();
  }, [projectId]);

  const formik = useFormik({
    initialValues: {
      projectNumber: "",
      name: "",
      customer: "",
      groupId: "",
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
      dataInit.name = values.name;
      dataInit.customer = values.customer;
      dataInit.projectNumber = Number(values.projectNumber);
      dataInit.status = values.status;
      dataInit.startDate = values.startDate;
      dataInit.endDate = values.endDate;
      dataInit.groupId = Number(values.groupId);
      dataInit.members = values.members;

      try {
        if (formik.errors !== null) {
          const response = await axios.post(
            "https://localhost:7099/projects",
            dataInit
          );
         
          console.log("Record created:", response.dataInit);
          navigate('/project-list');
        }

        // Handle the created record data
      } catch (error) {
        console.error("Error creating record:", error);
        // Handle the error
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchProjectNumberList(
        Number(formik.values.projectNumber)
      );
      setChek(options);
    };

    fetchData();

  }, [formik.values.projectNumber]);
  console.log(formik.errors.projectNumber);
  console.log("13-", formik.values.projectNumber.length);
  console.log("12-", check === false && formik.values.projectNumber.length > 0);
  if (check === false && formik.values.projectNumber.length > 0){
  }
  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchOptions();
      setGroups(options);
    };

    fetchData();
  }, []);

  

  useEffect(() => {
    // console.log("11-",project.data.name);
    var string = "";
    if (project !== null && projectId !== undefined) {
      for(var i = 0; i<= project.data.employeeDto.length -1; i++){
        console.log("for", i);
      
       if(i=== (project.data.employeeDto.length-1)) string+= project.data.employeeDto[i].visa
       else   string = string + project.data.employeeDto[i].visa + "," 
      }
     console.log("134-", string); 

      formik.values.name = project.data.name;
      formik.values.projectNumber = project.data.projectNumber;
      formik.values.customer = project.data.customer;
      formik.values.groupId = project.data.groupId;
      formik.values.status = project.data.status;
      formik.values.startDate = dayjs(project.data.startDate);
      formik.values.endDate = dayjs(project.data.endDate);
      formik.values.members = string;

      // project.data.employeeDto.forEach(element => {
      //   formik.values.members = formik.values.members.concat(project.data.employeeDto.visa)
      // });
      // console.log("11-",project.data.employeeDto.length);
    }
  }, [project]);

 

  useLayoutEffect(() => {
    if (projectId === undefined) {
      formik.values.name = "";
      formik.values.projectNumber = "";
      formik.values.customer = "";
      formik.values.groupId = "";
      formik.values.status = "NEW";
      formik.values.startDate = null;
      formik.values.endDate = null;
      formik.values.members ="";
    }
  }, [projectId]);
  return (
    <>
      <div style={{ width: "70%" }}>
        <h2>
          {projectId === undefined
            ? translations[language].newProject
            : "Update Project"}
        </h2>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} style={{ padding: "20px" }}>
            <Grid xs={2} className="lable">
              {translations[language].projectNumber}{" "}
              <span className="icon">*</span>
            </Grid>
            <Grid xs={6} style={{ paddingTop: "20px" }}>
              <TextField
                id="projectNumber"
                name="projectNumber"
                value={formik.values.projectNumber}
                onChange={formik.handleChange}
                variant="outlined"
                size="small"
                error={(formik.errors.projectNumber || !check) && projectId ===undefined  ? true : false}
              />
              {formik.errors.projectNumber && (
                <p className="errorMsg">{formik.errors.projectNumber}</p>
              )}
               {(check === false && projectId=== undefined) && (
                <p className="errorMsg">{"Project number is exist!!"}</p>
              )}
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={2} className="lable">
              {translations[language].projectName}{" "}
              <span className="icon"> *</span>
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
              {translations[language].customer} <span className="icon">*</span>
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
              {translations[language].group} <span className="icon">*</span>
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
                  <MenuItem key={group.id ?? ""} value={group.id ?? ""}>
                    {group.employeeDTO.visa}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={7.2}></Grid>
            <Grid xs={2} className="lable">
              {translations[language].members}
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
              {translations[language].status} <span className="icon">*</span>
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
              {translations[language].startDate} <span className="icon">*</span>
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
              {translations[language].endDate}
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
