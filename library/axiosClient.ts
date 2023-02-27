import axios from 'axios'

console.log(process.env.NEXT_PUBLIC_API_URL);

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosClient.interceptors.request.use(async (config) => {
    // config.headers['Content-Type'] = 'multipart/form-data';
    const token = window.localStorage.getItem("tokenUser");
    if (token) {
      config.headers["Authorization"] =
        "Bearer " + window.localStorage.getItem("tokenUser");
    }
    return config;
  });
  
  axiosClient.interceptors.response.use(
    async (res) => {
      const { tokenCustomer, refreshTokenCusTomer } = res.data;
  
      if (tokenCustomer) {
        window.localStorage.setItem("tokenUser", tokenCustomer);
      }
      if (refreshTokenCusTomer) {
        window.localStorage.setItem("refreshTokenUser", refreshTokenCusTomer);
      }
  
      return res.data;
    },
    async (error) => {
      if (error.response.status === 401) {
        const refreshTokenUser = window.localStorage.getItem("refreshTokenUser");
        if (refreshTokenUser) {
          await axiosClient
            .post("/admin/refresh-token", {
              refreshToken: window.localStorage.getItem("refreshTokenUser"),
            })
            .then((response) => {
              window.localStorage.setItem("token", response.data.token);
              window.localStorage.setItem(
                "refreshTokenUser",
                response.data.refreshTokenCustomer
              );
            })
            .catch((err) => {
              return Promise.reject(err);
            });
          return axios(error.config);
        }
        return Promise.reject(error);
      }
      console.warn("Error status", error.response.status);
      return Promise.reject(error);
    }
  );


export default axiosClient