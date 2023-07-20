import axios from "axios";
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

