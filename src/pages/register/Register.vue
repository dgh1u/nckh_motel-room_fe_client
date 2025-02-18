<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as authService from "@/apis/authService";
import Verify from "../verify/Verify.vue";

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
    <!-- Nội dung chính -->
    <div
      class="flex items-center justify-center min-h-screen bg-gradient-to-t from-sky-200 to-sky-100"
    >
      <div
        v-if="showSuccessAlert"
        class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-50"
      >
        <div
          class="bg-green-200 p-12 rounded-2xl shadow-2xl text-center flex flex-col items-center gap-6 opacity-0 animate-fade-in scale-150"
        >
          <!-- SVG dấu tick với hiệu ứng vẽ dần nhưng giữ nét đã vẽ -->
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

      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          ĐĂNG KÝ
        </h2>
        <form @submit.prevent="handleRegister">
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300"
              @input="clearError('email')"
              required
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-medium mb-2"
              >Mật khẩu</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300"
              @input="clearError('password')"
              required
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="fullName" class="block text-gray-700 font-medium mb-2"
              >Họ tên</label
            >
            <input
              v-model="fullName"
              type="fullName"
              id="fullName"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300"
              @input="clearError('fullName')"
              required
            />
            <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">
              {{ errors.fullName }}
            </p>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="address" class="block text-gray-700 font-medium mb-2"
              >Địa chỉ</label
            >
            <input
              v-model="address"
              type="address"
              id="address"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300"
              @input="clearError('address')"
              required
            />
            <p v-if="errors.address" class="text-red-500 text-sm mt-1">
              {{ errors.address }}
            </p>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="phone" class="block text-gray-700 font-medium mb-2"
              >Số điện thoại</label
            >
            <input
              v-model="phone"
              type="phone"
              id="phone"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300"
              @input="clearError('phone')"
              required
            />
            <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
              {{ errors.phone }}
            </p>
          </div>
          <!-- General Error -->
          <p v-if="generalError" class="text-red-500 text-center text-sm mb-4">
            {{ generalError }}
          </p>
          <!-- Button -->
          <div class="mt-6">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <span v-if="loading" class="loader"></span>
              Đăng ký
            </button>
          </div>
        </form>
        <!-- Links -->
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600">
            Đã có tài khoản?
            <router-link to="/login" class="text-blue-500 hover:underline"
              >Đăng nhập ngay</router-link
            >
          </p>
        </div>
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
  </div>
</template>

<style scoped>
@import "@/style.css";
</style>
