import axios from "axios";

//LOCAL
// axios.defaults.baseURL = "http://localhost:5000/api";

//SERVER
axios.defaults.baseURL = "https://nyingbe-server.herokuapp.com/";

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem("user");

  if (user) {
    const data = JSON.parse(localStorage.getItem("user"));
    req.headers.authorization = `Bearer ${data.data.data}`;
    return req;
  }
  return req;
});
