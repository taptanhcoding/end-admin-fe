import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// axiosClient.interceptors.request.use(async (config) => {
//   // config.headers['Content-Type'] = 'multipart/form-data';
//   // const token = localStorage.getItem('token')
//   // if (token) {
//   //   config.headers["Authorization"] =
//   //     "Bearer " +token
//   // }
//   const token = localStorage.getItem("token");
//   console.log(token);

//   return config;
// });

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const token = localStorage.getItem("token");
    if(token) config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

axiosClient.interceptors.response.use(
  async (res) => {
    const { token, refreshToken } = res.data;

    if (!!token) {
      localStorage.setItem("tokenUser", token);
    }
    if (!!refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    return res.data;
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axiosClient
          .post("/api/customer/refresh-token", {
            refreshToken
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
              "refreshToken",
              response.data.refreshToken
            );
          })
          .catch((err) => {
            return Promise.reject(err);
          });
        return axios(error.config);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
