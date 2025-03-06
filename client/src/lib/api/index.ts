import axios from "axios";

const consumerApi = axios.create({
  baseURL: "/api",
});

// Adding a request interceptor (if any)
// Adding a response interceptor (if any)

export { consumerApi };
