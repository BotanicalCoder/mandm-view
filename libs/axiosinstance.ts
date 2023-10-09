import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "https://kams.kolomoni.ng/api/",
});
const abortCont = new AbortController();

axiosinstance.interceptors.request.use((req) => {
  req.signal = abortCont.signal;
  return req;
});

export default axiosinstance;
