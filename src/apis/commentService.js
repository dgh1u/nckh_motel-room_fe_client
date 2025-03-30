import axios from "@/axios";

// Lấy danh sách bình luận (có thể truyền các tham số như start, limit,...)
export const getListComment = async (params) => {
  return axios({
    url: "/api/comments",
    method: "GET",
    params: params,
  });
};

// Đăng một bình luận mới (chú ý cần truyền header Authorization chứa token)
export const createComment = async (data, token) => {
  return axios({
    url: "/api/comment",
    method: "POST",
    data: data,
    headers: {
      Authorization: token,
    },
  });
};

// Chỉnh sửa một bình luận (cần truyền token hợp lệ trong header)
export const updateComment = async (data, token) => {
  return axios({
    url: "/api/comment",
    method: "PUT",
    data: data,
    headers: {
      Authorization: token,
    },
  });
};

// Xóa một bình luận theo id (endpoint yêu cầu quyền ADMIN)
export const deleteComment = async (id) => {
  return axios({
    url: `/api/comment/${id}`,
    method: "DELETE",
  });
};
