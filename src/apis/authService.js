import axios from "@/http";

// Đăng nhập
export const login = (email, password) => {
  return axios.post("login", { email, password }).then((response) => {
    console.log("response: ", response);
    if (response?.success) {
      // Lưu thông tin người dùng vào localStorage nếu success
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      return userData; // Trả về thông tin người dùng
    }
    throw response.error; // Ném lỗi từ backend để frontend xử lý
  });
};

// Đăng ký
export const register = (email, password, fullName, address, phone) => {
  return axios
    .post("register", {
      email,
      password,
      fullName,
      address,
      phone,
    }) // Gửi dữ liệu đăng ký
    .then((response) => {
      if (response?.success) {
        return response.data; // Trả về dữ liệu phản hồi từ server nếu success là true
      } else {
        throw response.error; // Ném lỗi nếu success là false
      }
    });
};

// Xác thực tài khoản
export const verifyAccount = (email, otp) => {
  return axios.put("verify-account", { email, otp }).then((response) => {
    if (response?.success) {
      return response.data;
    }
    throw response.error;
  });
};

// Gửi lại OTP
export const regenerateOTP = (email) => {
  return axios.put("regenerate-otp", { email }).then((response) => {
    if (response?.success) {
      return response.data;
    }
    throw response.error;
  });
};

//Quên mật khẩu
export const forgotPassword = (email, password, otp) => {
  return axios
    .put("forgot-password", { email, password, otp })
    .then((response) => {
      if (response?.success) {
        return response.data;
      }
      throw response.error;
    });
};

// Đăng xuất: Xóa thông tin người dùng khỏi localStorage
export const logout = () => {
  localStorage.removeItem("user"); // Xóa thông tin người dùng trong localStorage
};

// Lấy thông tin người dùng hiện tại từ localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem("user"); // Lấy dữ liệu từ localStorage
  return user ? JSON.parse(user) : null;
};

// Lấy vai trò người dùng hiện tại từ thông tin BE trả về
export const getCurrentUserRole = () => {
  const user = this.getCurrentUser();
  return user ? user.role : null; // Trả về role nếu tồn tại
};

// Tạo header Authorization (JWT token) để gửi cùng với yêu cầu API
export const authHeader = () => {
  const user = this.getCurrentUser();
  return user && user.token ? { Authorization: "Bearer " + user.token } : {};
};
