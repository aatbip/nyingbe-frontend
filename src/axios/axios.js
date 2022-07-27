import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem("user");

  if (user) {
    const data = JSON.parse(localStorage.getItem("user"));
    req.headers.authorization = `Bearer ${data.data.data}`;
    return req;
  }
  return req;
});
