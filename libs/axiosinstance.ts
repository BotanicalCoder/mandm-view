import axios from "axios";
// const config = useRuntimeConfig();
// console.log(config)
// const baseUrl = useRuntimeConfig().public.API_ENDPOINT;
let isRetryPending = false;

// console.log(baseUrl);

const axiosinstance = axios.create({
  baseURL: "https://kams.kolomoni.ng/api/",
});
const abortCont = new AbortController();

axiosinstance.interceptors.request.use((req) => {
  req.signal = abortCont.signal;
  return req;
});

export default axiosinstance;
