import axios from "axios";
import { NLP_API_ENDPOINT } from "../utils/variables";

console.log(NLP_API_ENDPOINT);
const apiClient = axios.create({
  baseURL: NLP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
