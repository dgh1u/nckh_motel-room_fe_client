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
  <div class="min-h-screen flex">
    <!-- Cột trái: Form đăng nhập -->
    <div
      class="w-full xl:w-1/2 flex flex-col items-center px-8 py-8 bg-white relative"
      data-aos="fade-left"
      data-aos-duration="800"
    >
      <div class="flex-grow flex flex-col items-center justify-center w-full">
        <div class="max-w-lg w-full text-center md:text-left">
          <!-- Tiêu đề + Link đăng ký -->
          <div class="mb-12">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">
              Đặt lại mật khẩu
            </h1>
            <p class="text-gray-600 text-base md:text-base">
              Vui lòng nhập Email của bạn để lấy lại mật khẩu!
            </p>
          </div>

          <!-- Form đăng nhập -->
          <form @submit.prevent="handleSubmitEmail" class="space-y-7">
            <!-- Email -->
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

      <!-- Footer -->
      <div class="text-sm text-gray-500 text-center">
        &copy; Toàn bộ bản quyền thuộc
        <router-link to="/home" class="text-blue-500 text-sm hover:font-bold">
          Duong Minh Hieu
        </router-link>
      </div>
    </div>

    <!-- Cột phải: Nền gradient (chỉ hiển thị trên màn hình lớn) -->
    <div
      class="hidden xl:flex w-1/2 bg-gradient-to-br from-teal-400 to-sky-300 items-center justify-center"
    >
      <div class="text-center text-white px-8">
        <!-- Tên trường -->

        <h2 class="text-xl font-bold">HỌC VIỆN NÔNG NGHIỆP VIỆT NAM</h2>
        <h3 class="text-2xl font-semibold">KHOA CÔNG NGHỆ THÔNG TIN</h3>

        <!-- Logo -->
        <!-- Logo -->

        <div class="flex items-center justify-center gap-8">
          <img
            src="@/assets/marquee-items/vnua-logo.png"
            alt="VNUA Logo"
            class="w-22 h-22 object-contain"
          />
          <img
            src="@/assets/vnua-services-logo.png"
            alt="Second Logo"
            class="w-48 h-48 object-contain"
          />
        </div>

        <!-- Tên dịch vụ -->
        <div class="mb-6">
          <h4 class="text-3xl font-bold mb-4">VNUA Services</h4>
          <p class="text-xl">
            Kênh thông tin dịch vụ khu vực Học viện Nông nghiệp Việt Nam
          </p>
        </div>

        <!-- Thông tin sinh viên -->
        <div class="text-lg">
          <p>(*) Dương Minh Hiếu - 6667537</p>
        </div>
      </div>
    </div>

    <!-- Nút Zalo cố định -->
    <a
      href="https://zalo.me/0981266403"
      target="_blank"
      class="fixed bottom-4 right-4 z-50"
    >
      <img src="@/assets/zalo-icon.svg" alt="Zalo contact" class="w-15 h-15" />
    </a>
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
  </div>
</template>
<style scoped>
@import "@/style.css";
</style>
