import axiosClient from "./axiosClient";

const authApi = {
  signUp: (data) => {
    const url = "/signup";
    return axiosClient.post(url, data);
  },

  signIn: (data) => {
    const url = "/signin";
    return axiosClient.post(url, data);
  }
};

export default authApi;