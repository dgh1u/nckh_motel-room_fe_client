<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as authService from "@/apis/authService";
import PopupNewPassword from "./PopupNewPassword.vue";
import Verify from "../verify/Verify.vue";

const email = ref("");
const loading = ref(false);
const generalError = ref("");
const errors = ref({});
const showVerifyPopup = ref(false);
const showNewPasswordPopup = ref(false);
const showSuccessAlert = ref(false);

const otpValue = ref("");
const router = useRouter();

const validateInput = () => {
  errors.value = {};
  if (!email.value) {
    errors.value.email = "Email không được để trống.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Email không đúng định dạng.";
  }
  return Object.keys(errors.value).length === 0;
};

const handleSubmitEmail = async () => {
  loading.value = true;
  generalError.value = "";

  if (!validateInput()) {
    loading.value = false;
    return;
  }

  try {
    await authService.regenerateOTP(email.value);
    showVerifyPopup.value = true;
  } catch (error) {
    generalError.value = error?.message || "Không tìm thấy email.";
  } finally {
    loading.value = false;
  }
};

const handleOtpVerified = (otp) => {
  otpValue.value = otp;
  showVerifyPopup.value = false;
  showNewPasswordPopup.value = true;
};

const handlePasswordChanged = () => {
  showNewPasswordPopup.value = false;
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
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-t from-sky-200 to-sky-100"
  >
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
      <h2 class="text-2xl font-semibold text-center mb-4">QUÊN MẬT KHẨU</h2>
      <p class="text-center text-gray-600 mb-6">
        Vui lòng nhập email để tìm kiếm tài khoản của bạn.
      </p>

      <form @submit.prevent="handleSubmitEmail">
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

        <p v-if="generalError" class="text-red-500 text-center mb-4">
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
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Popup xác thực -->
  <transition name="fade">
    <div
      v-if="showVerifyPopup"
      class="fixed inset-0 flex items-center backdrop-blur-md justify-center"
    >
      <Verify :email="email" @verified="handleOtpVerified" />
    </div>
  </transition>

  <!-- Popup Nhập mật khẩu mới -->
  <div
    v-if="showNewPasswordPopup"
    class="fixed inset-0 flex items-center backdrop-blur-md justify-center"
  >
    <PopupNewPassword
      :email="email"
      :otp="otpValue"
      @password-changed="handlePasswordChanged"
    />
  </div>

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
        Đổi mật khẩu thành công!
      </p>
    </div>
  </div>
</template>
<style scoped>
@import "@/style.css";
</style>
