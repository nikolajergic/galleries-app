import axios from "axios";

export default class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    this.client.interceptors.request.use(function (request) {
      const token = localStorage.getItem("token");

      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
      return request;
    });
  }
}