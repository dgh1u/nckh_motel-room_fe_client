<script setup>
import { ref } from "vue";
import * as authService from "@/apis/authService";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["password-changed"]);

const newPassword = ref("");
const loading = ref(false);
const errors = ref({});
const generalError = ref("");

const validateInput = () => {
  errors.value = {};
  if (!newPassword.value) {
    errors.value.newPassword = "Mật khẩu không được để trống.";
  } else if (newPassword.value.length < 6 || newPassword.value.length > 15) {
    errors.value.newPassword = "Mật khẩu phải từ 6-15 ký tự.";
  }
  return Object.keys(errors.value).length === 0;
};

const handleChangePassword = async () => {
  if (!validateInput()) return;

  loading.value = true;
  try {
    await authService.forgotPassword(props.email, newPassword.value, props.otp);
    emit("password-changed");
  } catch (error) {
    generalError.value = error?.message || "Đổi mật khẩu thất bại!";
  } finally {
    loading.value = false;
  }
};

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  generalError.value = "";
};
</script>

<template>
  <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
    <h2 class="text-2xl font-semibold text-center text-gray-700 mb-4">
      Nhập mật khẩu mới
    </h2>
    <form @submit.prevent="handleChangePassword">
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-600"
          >Mật khẩu mới</label
        >
        <input
          id="password"
          v-model="newPassword"
          type="password"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập mật khẩu mới"
          @input="clearError('newPassword')"
        />
        <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">
          {{ errors.newPassword }}
        </p>
      </div>
      <p v-if="generalError" class="text-red-500 text-sm text-center mb-4">
        {{ generalError }}
      </p>
      <button
        :disabled="loading"
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-center items-center"
      >
        <svg
          v-if="loading"
          class="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        Xác nhận
      </button>
    </form>
  </div>
</template>
