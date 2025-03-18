<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as authService from "@/apis/authService";
import Verify from "../verify/Verify.vue";
import { Eye, EyeOff } from "lucide-vue-next";

const email = ref("");
const password = ref("");
const fullName = ref("");
const address = ref("");
const phone = ref("");
const showPassword = ref(false);
const loading = ref(false);
const generalError = ref("");
const errors = ref({});
const showVerifyPopup = ref(false);
const showSuccessAlert = ref(false);

const router = useRouter();

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
    errors.value.password = "Mật khẩu phải từ 6-15 ký tự.";
  }

  if (!fullName.value) {
    errors.value.fullName = "Họ tên không được để trống.";
  }

  if (!address.value) {
    errors.value.address = "Địa chỉ không được để trống.";
  }

  if (!phone.value) {
    errors.value.phone = "Số điện thoại không được để trống.";
  } else if (!/^[0-9]{10,11}$/.test(phone.value)) {
    errors.value.phone = "Số điện thoại không hợp lệ.";
  }

  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  loading.value = true;
  generalError.value = "";

  if (!validateInput()) {
    loading.value = false;
    return;
  }

  try {
    await authService.register(
      email.value,
      password.value,
      fullName.value,
      address.value,
      phone.value
    );
    showVerifyPopup.value = true;
  } catch (error) {
    generalError.value = error?.message;
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleVerified = () => {
  showVerifyPopup.value = false;
  showSuccessAlert.value = true;
  setTimeout(() => {
    router.push("/login");
  }, 1700);
};

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  generalError.value = "";
};
</script>

<template>
  <div class="relative">
    <!-- Alert Xác thực thành công -->
    <div
      v-if="showSuccessAlert"
      class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-50"
    >
      <div
        class="bg-green-200 p-12 rounded-2xl shadow-2xl text-center flex flex-col items-center gap-6 opacity-0 animate-fade-in scale-150"
      >
        <!-- SVG dấu tick -->
        <svg
          class="w-24 h-24 text-green-800 animate-draw"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path class="tick-path" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="text-4xl font-extrabold text-green-900">
          Xác thực thành công!
        </p>
      </div>
    </div>

    <!-- Layout 2 cột -->
    <div class="min-h-screen flex">
      <!-- Cột trái: Form đăng ký -->
      <div
        class="w-full xl:w-1/2 flex flex-col items-center px-8 py-8 bg-white relative"
      >
        <div class="flex-grow flex flex-col items-center justify-center w-full">
          <div class="max-w-lg w-full text-center md:text-left">
            <!-- Tiêu đề + Link đăng nhập -->
            <div class="mb-12">
              <h1 class="text-3xl md:text-4xl font-bold mb-4">Tạo tài khoản</h1>
              <p class="text-gray-600 text-base md:text-base">
                Đã có tài khoản?
                <router-link to="/login" class="text-blue-500 hover:font-bold">
                  Đăng nhập.
                </router-link>
              </p>
            </div>

            <!-- Form đăng ký -->
            <form @submit.prevent="handleRegister" class="space-y-5">
              <!-- Họ tên và Email trên cùng 1 dòng -->
              <div class="flex flex-col md:flex-row md:gap-4">
                <!-- Họ tên -->
                <div class="md:w-1/2">
                  <label
                    for="fullName"
                    class="block text-gray-700 font-medium mb-2 text-base md:text-base"
                  >
                    Họ tên
                  </label>
                  <input
                    v-model="fullName"
                    type="text"
                    id="fullName"
                    placeholder="Họ tên"
                    required
                    @input="clearError('fullName')"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
                  />
                  <p v-if="errors.fullName" class="text-red-500 text-base mt-1">
                    {{ errors.fullName }}
                  </p>
                </div>

                <!-- Email -->
                <div class="md:w-1/2">
                  <label
                    for="email"
                    class="block text-gray-700 font-medium mb-2 text-base md:text-base"
                  >
                    Email
                  </label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                    @input="clearError('email')"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
                  />
                  <p v-if="errors.email" class="text-red-500 text-base mt-1">
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <!-- Mật khẩu -->
              <div>
                <label
                  for="password"
                  class="block text-gray-700 font-medium mb-2 text-base md:text-base"
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
                  <!-- Toggle hiển thị mật khẩu -->
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

              <!-- Địa chỉ -->
              <div>
                <label
                  for="address"
                  class="block text-gray-700 font-medium mb-2 text-base md:text-base"
                >
                  Địa chỉ
                </label>
                <input
                  v-model="address"
                  type="text"
                  id="address"
                  required
                  @input="clearError('address')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
                />
                <p v-if="errors.address" class="text-red-500 text-base mt-1">
                  {{ errors.address }}
                </p>
              </div>

              <!-- Số điện thoại -->
              <div>
                <label
                  for="phone"
                  class="block text-gray-700 font-medium mb-2 text-base md:text-base"
                >
                  Số điện thoại
                </label>
                <input
                  v-model="phone"
                  type="tel"
                  id="phone"
                  required
                  @input="clearError('phone')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
                />
                <p v-if="errors.phone" class="text-red-500 text-base mt-1">
                  {{ errors.phone }}
                </p>
              </div>

              <!-- Checkbox Điều khoản & Điều kiện -->
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  v-model="agreeTerms"
                  class="w-4 h-4 accent-blue-500 cursor-pointer"
                />
                <label for="terms" class="text-gray-700 text-base">
                  Tôi đồng ý với
                  <a
                    href="#"
                    class="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Điều khoản & Điều kiện
                  </a>
                </label>
              </div>

              <!-- Lỗi chung -->
              <p
                v-if="generalError"
                class="text-red-500 text-center text-base mb-4"
              >
                {{ generalError }}
              </p>

              <!-- Nút đăng ký  -->
              <div>
                <button
                  type="submit"
                  class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed text-base"
                >
                  <span v-if="loading" class="loader mr-2"></span>
                  Đăng ký
                </button>
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

      <!-- Cột phải: Nền gradient -->
      <div
        class="hidden xl:flex w-1/2 bg-gradient-to-br from-purple-500 to-blue-500 items-center justify-center"
      >
        <!-- Tuỳ ý chèn hình nền -->
      </div>

      <!-- Nút Zalo cố định -->
      <a
        href="https://zalo.me/0981266403"
        target="_blank"
        class="fixed bottom-4 right-4 z-50"
      >
        <img
          src="@/assets/zalo-icon.svg"
          alt="Zalo contact"
          class="w-15 h-15"
        />
      </a>
    </div>
  </div>

  <!-- Popup xác thực -->
  <transition name="fade">
    <div
      v-if="showVerifyPopup"
      class="fixed inset-0 flex items-center backdrop-blur-md justify-center"
    >
      <Verify :email="email" @verified="handleVerified" />
    </div>
  </transition>
</template>

<style scoped>
@import "@/style.css";
</style>
