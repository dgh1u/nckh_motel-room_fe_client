import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./authRoutes";
import homeRoutes from "./homeRoutes";
import { useAuthStore } from "@/stores/store";

// Các route khác của ứng dụng
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

// Tạo Router với scrollBehavior
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Nếu có savedPosition (như khi dùng nút back/forward) thì khôi phục vị trí đó
    if (savedPosition) {
      return savedPosition;
    } else {
      // Với các chuyển hướng khác, cuộn về đầu trang
      return { top: 0 };
    }
  },
});

// Xử lý Route Guard
router.beforeEach((to, from, next) => {
  // Lấy trạng thái xác thực từ Pinia store
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Kiểm tra xem route yêu cầu đăng nhập không
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Lưu URL đích vào localStorage trước khi chuyển hướng đến trang login
    localStorage.setItem("redirectAfterLogin", to.fullPath);

    // Chuyển hướng đến trang login
    next({ name: "Login" });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Nếu route chỉ dành cho khách và người dùng đã đăng nhập
    next({ name: "Home" });
  } else {
    // Cho phép tiếp tục đến trang đích
    next();
  }
});

export default router;
