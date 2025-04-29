<template>
  <DefaultLayout>
    <div class="min-h-screen bg-gray-100 flex justify-center pt-30 p-4">
      <div
        class="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl h-100 w-full grid grid-cols-1 md:grid-cols-2"
      >
        <!-- Phần hiển thị trạng thái giao dịch -->
        <div class="flex flex-col justify-center items-center p-8">
          <component
            :is="paymentStatus ? CircleCheck : XCircle"
            :class="paymentStatus ? 'text-green-500' : 'text-red-500'"
            class="w-25 h-25 mb-4"
          />
          <h2 class="text-3xl font-semibold text-gray-800 text-center">
            {{
              paymentStatus ? "Giao dịch thành công!" : "Giao dịch thất bại!"
            }}
          </h2>
          <div class="pt-3 text-white">
            <button
              @click="goBack"
              class="px-6 py-2 bg-teal-400 text-white rounded-lg shadow hover:bg-teal-600 transition duration-200"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
        <!-- Phần hiển thị chi tiết giao dịch -->
        <div class="bg-gray-50 p-6 flex flex-col justify-center">
          <h1 class="text-5xl font-bold text-gray-900 text-right">
            {{ paymentResult.amount }}₫
          </h1>
          <div class="mt-6 space-y-6">
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Mã giao dịch:</span>
              <span class="text-gray-600">{{ paymentResult.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Mã đơn hàng:</span>
              <span class="text-gray-600">{{ paymentResult.orderCode }}</span>
            </div>

            <template v-if="paymentStatus">
              <div class="flex justify-between">
                <span class="font-medium text-gray-700"
                  >Thời gian giao dịch:</span
                >
                <span class="text-gray-600">
                  {{ paymentResult.transactionDateTime }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-gray-700">Số tài khoản:</span>
                <span class="text-gray-600">
                  {{ paymentResult.counterAccountNumber }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="font-medium text-gray-700">Ngân hàng:</span>

                <img
                  v-if="bankData.logo"
                  :src="bankData.logo"
                  alt="Bank Logo"
                  class="w-6 ml-55"
                />

                <span class="text-gray-600 text-center">{{
                  bankData.name
                }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CircleCheck, XCircle } from "lucide-vue-next";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import { getPaymentResult } from "@/apis/paymentService.js";
import { getBankData } from "../../components/bank-name/bankName";

const route = useRoute();
const router = useRouter();
const paymentStatus = ref(false);
const paymentResult = ref({});
const loading = ref(true);
const error = ref("");

// Lấy thông tin ngân hàng dựa vào mã ngân hàng từ kết quả giao dịch
const bankData = computed(() => {
  return getBankData(paymentResult.value.counterAccountBankId);
});

// Lấy kết quả giao dịch từ API dựa vào ID trong params
const fetchPaymentResult = async () => {
  try {
    const { id } = route.params;
    const res = await getPaymentResult(id);
    paymentResult.value = res;
    paymentStatus.value = res.success;
  } catch (err) {
    error.value = "Không thể lấy kết quả giao dịch. Chi tiết: " + err.message;
  } finally {
    loading.value = false;
  }
};

// Điều hướng về trang chủ
const goBack = () => router.push("/home");

// Tự động lấy kết quả giao dịch khi component được tạo
onMounted(fetchPaymentResult);
</script>

<style scoped></style>
