import axios from "axios";
export const fetchOptions = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      return response.data; // Assuming the options are present in the response data
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }
  };