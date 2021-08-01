import axiosClient from "./axiosClient";

const userApi = {
  getProfile: (userId) => {
    const url = `/user/${userId}`;
    return axiosClient.get(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  },

  follow: (followId) => {
    const url = "/follow";
    return axiosClient.put(
      url,
      {
        followId,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  },

  unfollow: (unfollowId) => {
    const url = "/unfollow";
    return axiosClient.put(
      url,
      {
        unfollowId,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  },

  updatePic: (pic) => {
    const url = "/updatepic";
    return axiosClient.put(
      url,
      {
        pic,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  },
};

export default userApi;
