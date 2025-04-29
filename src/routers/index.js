import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./authRoutes";
import homeRoutes from "./homeRoutes";
import { useAuthStore } from "@/stores/store";

// Khai báo các routes của ứng dụng
const routes = [
  ...authRoutes,
  ...homeRoutes,
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/not-found/NotFound.vue"), // Trang 404
  },
];

// Khởi tạo router với cấu hình cuộn trang
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Khôi phục vị trí cuộn trước đó nếu có
    if (savedPosition) {
      return savedPosition;
    } else {
      // Cuộn lên đầu trang khi chuyển route
      return { top: 0 };
    }
  },
});

// Bảo vệ route - kiểm tra quyền truy cập
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Chuyển hướng nếu route yêu cầu xác thực
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Lưu URL đích để chuyển hướng sau khi đăng nhập
    localStorage.setItem("redirectAfterLogin", to.fullPath);
    next({ name: "Login" });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Chuyển hướng nếu route chỉ dành cho khách không đăng nhập
    next({ name: "Home" });
  } else {
    // Cho phép truy cập route
    next();
  }
});

export default router;
