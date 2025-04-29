<template>
  <div class="min-h-screen flex">
    <!-- Cột trái: Form đăng nhập -->
    <div
      class="w-full xl:w-1/2 flex flex-col items-center px-8 py-8 bg-white relative"
      data-aos="fade-left"
      data-aos-duration="800"
    >
      <div class="flex-grow flex flex-col items-center justify-center w-full">
        <div class="max-w-lg w-full text-center md:text-left">
          <!-- Tiêu đề và link đăng ký -->
          <div class="mb-12">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">Đăng nhập</h1>
            <p class="text-gray-600 text-base md:text-base">
              Chưa có tài khoản?
              <router-link to="/register" class="text-blue-500 hover:font-bold">
                Đăng ký tại đây.
              </router-link>
            </p>
          </div>

          <!-- Form đăng nhập -->
          <form @submit.prevent="handleLogin" class="space-y-7">
            <!-- Trường nhập email -->
            <div>
              <label
                for="email"
                class="block text-gray-700 font-medium mb-2 text-sm md:text-base"
              >
                Email
              </label>
              <input
                v-model="email"
                type="email"
                id="email"
                required
                @input="clearError('email')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
              />
              <p v-if="errors.email" class="text-red-500 text-base mt-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Trường nhập mật khẩu -->
            <div>
              <label
                for="password"
                class="block text-gray-700 font-medium mb-2 text-sm md:text-base"
              >
                Mật khẩu
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  required
                  @input="clearError('password')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
                />
                <!-- Nút ẩn/hiện mật khẩu -->
                <button
                  type="button"
                  class="absolute inset-y-0 right-4 flex items-center"
                  @click="togglePasswordVisibility"
                >
                  <EyeOff v-if="showPassword" class="w-4 h-4" />
                  <Eye v-else class="w-4 h-4" />
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-base mt-1">
                {{ errors.password }}
              </p>
            </div>

            <!-- Hiển thị lỗi chung -->
            <p
              v-if="generalError"
              class="text-red-500 text-center md:text-center text-base mb-4"
            >
              {{ generalError }}
            </p>

            <!-- Nút đăng nhập -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed text-base"
              >
                <span v-if="loading" class="loader mr-2"></span>
                Đăng nhập
              </button>
            </div>

            <!-- Link quên mật khẩu -->
            <div>
              <router-link
                to="/forgot-password"
                class="text-blue-500 text-base flex items-center justify-center hover:font-bold"
              >
                Quên mật khẩu?
              </router-link>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-sm text-gray-500 text-center">
        &copy; All rights reserved. Made by
        <router-link to="/home" class="text-blue-500 text-sm hover:font-bold">
          HieuDM
        </router-link>
      </div>
    </div>

    <!-- Cột phải: Nền gradient (responsive) -->
    <div
      class="hidden xl:flex w-1/2 bg-gradient-to-br from-purple-500 to-blue-500 items-center justify-center"
    >
      <!-- Vùng dành cho hình nền hoặc nội dung bổ sung -->
    </div>

    <!-- Nút liên hệ Zalo -->
    <a
      href="https://zalo.me/0981266403"
      target="_blank"
      class="fixed bottom-4 right-4 z-50"
    >
      <img src="@/assets/zalo-icon.svg" alt="Zalo contact" class="w-15 h-15" />
    </a>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/store";
import { Eye, EyeOff } from "lucide-vue-next";

// Khai báo các biến reactive
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errors = ref({});
const generalError = ref("");
const router = useRouter();
const authStore = useAuthStore();

// Kiểm tra tính hợp lệ của dữ liệu đầu vào
const validateInput = () => {
  errors.value = {};

  if (!email.value) {
    errors.value.email = "Email không được để trống.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Email không đúng định dạng.";
  }

  if (!password.value) {
    errors.value.password = "Mật khẩu không được để trống.";
  } else if (password.value.length < 6 || password.value.length > 15) {
    errors.value.password = "Mật khẩu phải từ 6-15 kí tự.";
  }

  return Object.keys(errors.value).length === 0;
};

// Xóa thông báo lỗi khi người dùng nhập lại
const clearError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = "";
  }
  generalError.value = "";
};

// Bật/tắt hiển thị mật khẩu
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Xử lý đăng nhập
const handleLogin = async () => {
  loading.value = true;
  generalError.value = "";

  if (!validateInput()) {
    loading.value = false;
    return;
  }

  try {
    await authStore.login(email.value, password.value);

    // Lấy URL chuyển hướng từ localStorage (nếu có)
    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/home";

    // Xóa dữ liệu chuyển hướng
    localStorage.removeItem("redirectAfterLogin");

    // Chuyển hướng người dùng
    router.push(redirectPath);
  } catch (err) {
    generalError.value = err?.message || "Đăng nhập thất bại!";
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped>
@import "@/style.css";
</style>
