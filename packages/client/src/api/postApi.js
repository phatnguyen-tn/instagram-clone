import axiosClient from "./axiosClient";

const postApi = {
  createPost: (data) => {
    const url = "/createpost";
    return axiosClient.post(url, data, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  },

  getAll: () => {
    const url = "/allpost";
    return axiosClient.get(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  },

  getFollowingPost: () => {
    const url = "/getsubpost";
    return axiosClient.get(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  },

  myPost: () => {
    const url = "/mypost";
    return axiosClient.get(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  },

  like: (id) => {
    const url = "/like";
    return axiosClient.put(
      url,
      { postId: id },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  },

  unlike: (id) => {
    const url = "/unlike";
    return axiosClient.put(
      url,
      { postId: id },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  },

  comment: (text, id) => {
    const url = "/comment";
    return axiosClient.put(
      url,
      { text, postId: id },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  },

  delete: (id) => {
    const url = `/delete/${id}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  },
};

export default postApi;
