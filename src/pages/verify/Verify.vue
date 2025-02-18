div
<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import * as authService from "@/apis/authService";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["verified"]);
const otpInputs = reactive(["", "", "", "", "", ""]);
const loading = ref(false);
const generalError = ref("");
const otpError = ref("");
const timer = ref("02:00");
const countdown = ref(120);
let timerInterval;

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  clearInterval(timerInterval);
});

const startCountdown = () => {
  timerInterval = setInterval(() => {
    countdown.value--;
    const minutes = String(Math.floor(countdown.value / 60)).padStart(2, "0");
    const seconds = String(countdown.value % 60).padStart(2, "0");
    timer.value = `${minutes}:${seconds}`;
    if (countdown.value <= 0) {
      clearInterval(timerInterval);
      alert("Hết thời gian! Vui lòng thử lại.");
    }
  }, 1000);
};

const focusNext = (index) => {
  if (index < otpInputs.length - 1) {
    document.getElementById(`otp-${index + 1}`).focus();
  }
};

const focusPrev = (index) => {
  if (index > 0) {
    document.getElementById(`otp-${index - 1}`).focus();
  }
};

const getOtp = () => otpInputs.join("");

const handleVerify = async () => {
  const otp = getOtp();
  if (otp.length !== 6) {
    otpError.value = "OTP phải đủ 6 ký tự.";
    return;
  }
  loading.value = true;
  try {
    await authService.verifyAccount(props.email, otp);
    emit("verified", otp);
    clearInterval(timerInterval);
  } catch (error) {
    generalError.value =
      error?.message || "Xác thực thất bại. Vui lòng thử lại!";
  } finally {
    loading.value = false;
  }
};

const handleRegenerateOTP = async () => {
  loading.value = true;
  try {
    await authService.regenerateOTP(props.email);
    alert("OTP mới đã được gửi!");
    countdown.value = 120;
    clearInterval(timerInterval);
    startCountdown();
  } catch (error) {
    generalError.value =
      error?.message || "Không thể gửi lại OTP. Vui lòng thử lại!";
  } finally {
    loading.value = false;
  }
};

const clearError = () => {
  otpError.value = "";
  generalError.value = "";
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
    <h2 class="text-2xl font-bold text-center mb-4">XÁC THỰC TÀI KHOẢN</h2>
    <p class="text-center mb-4">
      Mã OTP đã được gửi tới <strong>{{ email }}</strong>
    </p>

    <form @submit.prevent="handleVerify">
      <div class="flex justify-center gap-2 mb-4">
        <input
          v-for="(digit, index) in otpInputs"
          :key="index"
          :id="'otp-' + index"
          v-model="otpInputs[index]"
          maxlength="1"
          type="text"
          class="w-12 h-12 text-center text-xl border rounded-lg"
          @input="
            (e) => {
              clearError();
              if (e.target.value) focusNext(index);
            }
          "
          @keydown.backspace="
            (e) => {
              if (!otpInputs[index]) focusPrev(index);
            }
          "
        />
      </div>

      <p v-if="otpError" class="text-red-500 text-center text-sm mb-2">
        {{ otpError }}
      </p>
      <p v-if="generalError" class="text-red-500 text-center text-sm mb-2">
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

    <div class="text-center mt-4">
      <span class="text-gray-700">Mã có hiệu lực trong:</span>
      <span class="text-gray-900 font-bold ml-1">{{ timer }}</span>
    </div>

    <div class="text-center mt-4">
      <span class="text-gray-700">Không nhận được mã? </span>
      <button
        @click="handleRegenerateOTP"
        class="text-blue-500 font-bold hover:underline"
      >
        Gửi lại
      </button>
    </div>
  </div>
</template>

<style scoped>
@import "@/style.css";
</style>
