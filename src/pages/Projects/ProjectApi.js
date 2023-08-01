import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const fetchOptions = async () => {
  try {
    const response = await axios.get("https://localhost:7099/groups");
    return response.data.data; // Assuming the options are present in the response data
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

export const fetchProject = async (id) => {
  if (id === undefined) return null;
  try {
    const response = await axios.get(`https://localhost:7099/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project: ", error);
    return null;
  }
};

export const fetchProjectList = async () => {
  try {
    const response = await axios.get("https://localhost:7099/projects");
    return response.data.data; // Assuming the options are present in the response data
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

export const fetchProjectList2 = async (data) => {
  const response = await axios.post(
    "https://localhost:7099/projects/search",
    data
  );
  return response.data.data;
};

export const fetchProjectNumberList = async (projectNumer) => {
  if (projectNumer === undefined) return null;
  const response = await axios.get(
    `https://localhost:7099/projects/check-project-number/${projectNumer}`
  );
  return response.data.data;
};

export const addProject = async (project) => {
  if (project === undefined) return null;
  try {
    const response = await axios.post(
      `https://localhost:7099/projects/${project}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Errpr fetching project number: ", error);
    return null;
  }
};

export const deleteProject = async (data) => {
  if (!data) return null;
  const response = await axios.delete(`https://localhost:7099/projects`, {
    data: data,
  });
  return response.data.data;
};

export const paging = async (pageNumber, pageSize) => {
  const data = {
    pageSize: pageSize,
    pageNumber: pageNumber,
  };

  if (!data) return null;
  const response = await axios.post(
    `https://localhost:7099/employees/Paging`,
    data
  );
  return response.data;
};
