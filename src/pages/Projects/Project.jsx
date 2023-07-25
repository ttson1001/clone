import { Button, MenuItem, TextField } from "@mui/material";
import "./Project.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchOptions,
  fetchProject,
  fetchProjectNumberList,
} from "./ProjectApi";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  const { language, setLanguage, translations } = useLanguage();
  const [check, setChek] = useState(true);
  let { projectId } = useParams();
  console.log("sdf", projectId);

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
      version: null,
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

      console.log(values.endDate);
      dataInit.groupId = Number(values.groupId);
      dataInit.members = values.members;
      dataInit.version = values.version

      try {
        if (formik.errors !== null && projectId === undefined) {
          const response = await axios.post(
            "https://localhost:7099/projects",
            dataInit
          );
          console.log("Record created:", response.dataInit);
          navigate("/project-list");
        } else {
          dataInit.id = projectId;
          const response = await axios.put(
            "https://localhost:7099/projects",
            dataInit
          );
          console.log("Record created:", response.dataInit);
          navigate("/project-list");
        }
      } catch (error) {
        if(error.response.status === 500) navigate("/error");
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

  if (check === false && formik.values.projectNumber.length > 0) {
  }
  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchOptions();
      setGroups(options);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const object = await fetchProject(projectId);
      var members = "";
      if (object != null) {
        for (var i = 0; i <= object.data.employeeDto.length - 1; i++) {
          if (i === object.data.employeeDto.length - 1)
            members += object.data.employeeDto[i].visa;
          else members = members + object.data.employeeDto[i].visa + ",";
          formik.setFieldValue("name", object.data.name, true);
          formik.setFieldValue(
            "projectNumber",
            object.data.projectNumber,
            true
          );
          formik.setFieldValue("version", object.data.version, true);
          formik.setFieldValue("customer", object.data.customer, true);
          formik.setFieldValue("groupId", object.data.groupId, true);
          formik.setFieldValue("status", object.data.status, true);
          formik.setFieldValue("startDate", dayjs(object.data.startDate, true));
          console.log(object.data.endDate !== "0001-01-01T00:00:00");
          if (object.data.endDate !== "0001-01-01T00:00:00") {
            formik.setFieldValue("endDate", dayjs(object.data.endDate, true));
          } else {
            formik.setFieldValue("endDate", null, true);
          }
          formik.setFieldValue("members", members, true);
        }
      }
    };
    fetchData();
  }, [projectId]);

  console.log(formik.values.version);
  const handleBlur = (field) => () => {
    formik.setFieldTouched(field, true);
  };

  useEffect(() => {
    if (!projectId) {
      formik.setFieldValue("name", "");
      formik.setFieldValue("projectNumber", "");
      formik.setFieldValue("customer", "");
      formik.setFieldValue("groupId", "");
      formik.setFieldValue("status", "NEW");
      formik.setFieldValue("startDate", null);
      formik.setFieldValue("endDate", null);
      formik.setFieldValue("members", "");
    }
  }, [projectId]);

  return (
    <>
      <div style={{ width: "70%" }}>
        <h2>
          {projectId === undefined
            ? translations[language].newProject
            : translations[language].updateProject}
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
                onBlur={handleBlur("projectNumber")}
                variant="outlined"
                size="small"
                error={
                  (formik.errors.projectNumber || !check) &&
                  formik.touched.projectNumber
                }
                disabled={projectId !== undefined}
              />
              {formik.errors.projectNumber && formik.touched.projectNumber && (
                <p className="errorMsg">{formik.errors.projectNumber}</p>
              )}
              {check === false && projectId === undefined && (
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
                onBlur={handleBlur("name")}
                onChange={formik.handleChange}
                size="small"
                error={formik.errors.name && formik.touched.name ? true : false}
              />
              {formik.errors.name && formik.touched.name && (
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
                onBlur={handleBlur("customer")}
                onChange={formik.handleChange}
                fullWidth
                size="small"
                error={
                  formik.errors.customer && formik.touched.customer
                    ? true
                    : false
                }
              />
              {formik.errors.customer && formik.touched.customer && (
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
                  onSelectedSectionsChange={handleBlur("startDate")}
                  onChange={(value) => {
                    formik.setFieldValue("startDate", value, true);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error:
                        formik.errors.startDate && formik.touched.startDate,
                    },
                  }}
                />
                {formik.touched.startDate && formik.errors.startDate && (
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
                {translations[language].cancel}
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button type="submit" fullWidth variant="contained">
                {projectId !== undefined
                  ? translations[language].updateProject
                  : "Create Project"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default Project;
