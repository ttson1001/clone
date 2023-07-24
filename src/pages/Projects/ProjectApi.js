import axios from "axios";
import { async } from "q";
export const fetchOptions = async () => {
  try {
    const response = await axios.get(
      "https://localhost:7099/groups"
    );
    return response.data.data; // Assuming the options are present in the response data
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

export const fetchProject = async (id) => {
    if(id === undefined) return null;
  try {
    const response = await axios.get(`https://localhost:7099/projects/${id}`);
    return response.data;
    
  }catch (error){
    console.error("Error fetching project: ", error)
    return null;
  }
};

export const fetchProjectList = async () => {
  try {
    const response = await axios.get(
      "https://localhost:7099/projects"
    );
    return response.data.data; // Assuming the options are present in the response data
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

export const fetchProjectList2 = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:7099/projects/search",
      data
    );
    return response.data.data;
    // Handle the created record data
  } catch (error) {
    console.error("Error creating record:", error);
    // Handle the error
  }
};

export const fetchProjectNumberList = async (projectNumer) => {
  if(projectNumer === undefined) return null;
  try {
    const response = await axios.get(
      `https://localhost:7099/projects/check-project-number/${projectNumer}`
    );
    return response.data.data;
    
  } catch (error) {
    console.error("Errpr fetching project number: ", error)
    return null;
  }
}


