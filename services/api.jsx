import axios from "axios";

const api = axios.create({
  baseURL: "https://www.GPBased.somee.com",
});

export default api;
