import Login from "../pages/login/Login.vue";
import Register from "../pages/register/Register.vue";
import ForgotPassword from "../pages/forgot-password/ForgotPassword.vue";
import Verify from "../pages/verify/Verify.vue";

export default [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false, // Không yêu cầu đăng nhập
    },
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      requiresAuth: false,
    },
  },
];
