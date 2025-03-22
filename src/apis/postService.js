import axios from "@/axios";

//Lấy tất cả bài viết
export const getListPost = async (params) => {
  return axios({
    url: "/api/posts",
    method: "GET",
    params: params,
  });
};

//Lấy chi tiết 1 bài viết
export const getDetailPost = async (id) => {
  return axios({
    url: `api/post/${id}`,
    method: "GET",
  });
};

// Lấy danh sách tin đăng của một người dùng theo userId
export const getPostsByUserId = async (idUser, params) => {
  return axios({
    url: `/api/posts/${idUser}`,
    method: "GET",
    params: params,
  });
};

export const createPost = async (data) => {
  return axios({
    url: `/api/post`,
    method: "POST",
    data,
  });
};

export const updatePost = async (id, data) => {
  return axios({
    url: `/api/post/${id}`,
    method: "PUT",
    data,
  });
};

export const hidePost = async (id) => {
  return axios({
    url: `/api/post/hide/${id}`,
    method: "PUT",
  });
};
