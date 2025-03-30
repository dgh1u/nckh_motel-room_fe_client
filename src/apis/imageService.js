// src/services/imageService.js
import axios from "@/axios";

// Upload một ảnh cho một bài đăng
export const uploadImage = async (idPost, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios({
    url: `/api/uploadImage/post/${idPost}`,
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Upload nhiều ảnh cho một bài đăng
export const uploadMultipleImages = async (idPost, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  return axios({
    url: `/api/uploadMultipleFiles/post/${idPost}`,
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Xóa tất cả ảnh của một bài đăng
export const deleteImagesByPost = async (idPost) => {
  return axios({
    url: `/api/deleteImage/post/${idPost}`,
    method: "DELETE",
  });
};

// Lấy danh sách ImageDto (Base64) của một bài đăng (dùng khi chỉnh sửa)
export const getImageDTOByPost = async (idPost) => {
  return axios({
    url: `/api/imageByte/post/${idPost}`,
    method: "GET",
  });
};

// Lấy danh sách URL ảnh của một bài đăng (dùng khi xem chi tiết)
export const getImageByPost = async (idPost) => {
  return axios({
    url: `/api/image/post/${idPost}`,
    method: "GET",
  });
};

// Tải về một ảnh (responseType = blob để xử lý file nhị phân)
export const downloadImage = async (fileId) => {
  return axios({
    url: `/api/image/${fileId}`,
    method: "GET",
    responseType: "blob",
  });
};
