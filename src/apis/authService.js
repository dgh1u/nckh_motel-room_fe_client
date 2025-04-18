import axios from "@/axios";

//Đăng nhập
export const loginUser = async (email, password) => {
  return axios({
    url: "/auth/login",
    method: "POST",
    data: { email, password },
  }).then((response) => response.data);
};

//Đăng xuất
export const logoutUser = async () => {};

//Đăng ký
export const register = async (email, password, fullName, address, phone) => {
  return axios({
    url: "/auth/register",
    method: "POST",
    data: { email, password, fullName, address, phone },
  }).then((response) => {
    if (response?.success) {
      return response.data;
    }
    throw response.error;
  });
};

//Xác thực tài khoản
export const verifyAccount = async (email, otp) => {
  return axios({
    url: "/auth/verify-account",
    method: "PUT",
    data: { email, otp },
  }).then((response) => {
    if (response?.success) {
      return response.data;
    }
    throw response.error;
  });
};

//Gửi lại OTP
export const regenerateOTP = async (email) => {
  return axios({
    url: "/auth/regenerate-otp",
    method: "PUT",
    data: { email },
  }).then((response) => {
    if (response?.success) {
      return response.data;
    }
    throw response.error;
  });
};

//Quên mật khẩu
export const forgotPassword = async (email, password, otp) => {
  return axios({
    url: "/auth/forgot-password",
    method: "PUT",
    data: { email, password, otp },
  }).then((response) => {
    if (response?.success) {
      return response.data;
    }
    throw response.error;
  });
};

// Lấy token từ localStorage (key = "auth")
export const getToken = () => {
  const authData = localStorage.getItem("auth");
  return authData ? JSON.parse(authData)?.user?.token : null;
};

// Lấy thông tin hồ sơ
export const getProfile = async () => {
  const token = getToken();
  return axios({
    url: "/auth/profile",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Cập nhật hồ sơ
export const updateProfile = async (data) => {
  const token = getToken();
  return axios({
    url: "/auth/profile",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

// Lấy avatar
export const getAvatar = async (id) => {
  if (!id) {
    const profileRes = await getProfile();
    id = profileRes.data.id;
  }
  return axios({
    url: `/user/${id}/avatar`,
    method: "GET",
  });
};

// Cập nhật avatar
export const postAvatar = async (id, avatarFile) => {
  if (!id) {
    const profileRes = await getProfile();
    id = profileRes.data.id;
  }
  const formData = new FormData();
  formData.append("avatar", avatarFile);

  return axios({
    url: `/user/${id}/avatar`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
