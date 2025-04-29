<template>
  <ProfileLayout>
    <!-- Container của giao diện nạp tiền -->
    <div class="block items-center pb-8 justify-center flex">
      <span class="font-bold text-3xl text-teal-500"
        >Nạp tiền vào tài khoản</span
      >
    </div>
    <div
      class="max-w-158 mx-auto p-8 bg-white border border-gray-200 rounded-md shadow-sm"
    >
      <span class="block text-base text-gray-700 mb-3">
        Chọn nhanh số tiền cần nạp
      </span>

      <!-- Danh sách các mệnh giá nhanh dạng radio button tùy chỉnh -->
      <div class="flex flex-wrap gap-4 mb-6">
        <label
          v-for="(amount, index) in quickAmounts"
          :key="index"
          class="flex items-center gap-2 px-4 py-2 w-32 rounded-md cursor-pointer transition-colors border"
          :class="
            selectedAmount === amount
              ? 'bg-gray-200  border-teal-400'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
          "
        >
          <!-- Ẩn input radio gốc -->
          <input
            type="radio"
            name="amountGroup"
            :value="amount"
            v-model="selectedAmount"
            class="sr-only"
          />
          <!-- Hiển thị radio tùy chỉnh -->
          <div
            class="w-4 h-4 border rounded-full flex items-center justify-center"
            :class="
              selectedAmount === amount
                ? 'bg-teal-500 border-teal-500'
                : 'bg-white border-gray-300'
            "
          >
            <div
              v-if="selectedAmount === amount"
              class="w-2 h-2 rounded-full bg-white"
            ></div>
          </div>
          <span class="text-sm font-medium">
            {{ formatMoney(amount) }}
          </span>
        </label>
      </div>

      <!-- Ô nhập số tiền thủ công -->
      <div class="mb-6">
        <span class="block text-base text-gray-700 mb-3 mt-8">
          Hoặc nhập số tiền cần nạp
        </span>

        <div
          class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
        >
          <input
            ref="manualInput"
            type="text"
            placeholder="Nhập số tiền cần nạp"
            v-model="manualPrice"
            @blur="onBlur"
            class="w-full p-2 border-none outline-none rounded-lg"
          />
          <span class="p-2 border-l border-gray-300">₫</span>
        </div>
        <div v-if="spelledOutPrice" class="mt-1 text-sm text-gray-500 italic">
          {{ spelledOutPrice }}
        </div>
      </div>

      <!-- Ô nhập lời nhắn -->
      <div>
        <span class="block text-base text-gray-700 mb-3 mt-8"> Lời nhắn </span>
        <input
          type="text"
          v-model="desc"
          placeholder="Nhập lời nhắn (nếu cần)"
          maxlength="20"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Khối hiển thị thông tin nạp tiền -->
    <div
      class="max-w-158 mx-auto mt-6 p-6 mb-6 rounded-md shadow"
      style="background-color: #e0f5ff"
    >
      <span class="block text-lg font-bold text-gray-700 mb-6">
        Thông tin nạp tiền
      </span>
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-600">Số tiền nạp</span>
        <span class="text-sm font-medium text-gray-800">
          {{ formatMoney(price) }}₫
        </span>
      </div>
      <hr class="border-teal-300 my-2" />
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm text-gray-600">Lời nhắn</span>
        <span class="text-sm text-gray-800">
          {{ desc || "..." }}
        </span>
      </div>
    </div>
    <!-- Nút tạo link thanh toán -->
    <div class="max-w-158 mx-auto mt-6 text-white">
      <button
        @click="createPaymentLink"
        class="w-full inline-flex items-center justify-center gap-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
      >
        Tiếp tục <MoveRight class="w-5 h-5" />
      </button>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import { paymentApi } from "@/apis/paymentService";
import { MoveRight } from "lucide-vue-next";

/**
 * Định dạng số tiền theo định dạng tiền tệ Việt Nam
 */
function formatMoney(num) {
  return new Intl.NumberFormat("vi-VN").format(num);
}

// Danh sách các mệnh giá nạp tiền nhanh
const quickAmounts = [
  5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000,
];

// Lưu mệnh giá đang được chọn
const selectedAmount = ref(quickAmounts[0]);

// Giá trị hiển thị trong ô nhập thủ công
const manualPrice = ref(formatMoney(selectedAmount.value));

// Lời nhắn kèm theo giao dịch
const desc = ref("");

// Cập nhật ô nhập thủ công khi thay đổi mệnh giá
watch(selectedAmount, (newVal) => {
  if (newVal) {
    manualPrice.value = formatMoney(newVal);
  }
});

// Cập nhật lại selectedAmount nếu nhập giá trị khớp với mệnh giá có sẵn
watch(manualPrice, (newVal) => {
  const sanitized = newVal.trim();
  if (sanitized === "") return;
  const parsed = Number(sanitized.replace(/\./g, "").replace(/,/g, ""));
  if (quickAmounts.includes(parsed)) {
    selectedAmount.value = parsed;
  } else {
    selectedAmount.value = null;
  }
});

// Tính toán giá trị cuối cùng của số tiền cần nạp
const price = computed(() => {
  const sanitized = manualPrice.value.trim();
  if (!sanitized) return selectedAmount.value || quickAmounts[0];
  const parsed = Number(sanitized.replace(/\./g, "").replace(/,/g, ""));
  return !isNaN(parsed) && parsed > 0
    ? parsed
    : selectedAmount.value || quickAmounts[0];
});

/**
 * Chuyển đổi số tiền sang dạng chữ tiếng Việt
 */
function convertNumberToWordsVN(num) {
  if (!num || num <= 0) return "";
  if (num === 5000) return "năm nghìn đồng";
  if (num === 10000) return "mười nghìn đồng";
  if (num === 20000) return "hai mươi nghìn đồng";
  if (num === 50000) return "năm mươi nghìn đồng";
  if (num === 100000) return "một trăm nghìn đồng";
  if (num === 200000) return "hai trăm nghìn đồng";
  if (num === 500000) return "năm trăm nghìn đồng";
  if (num === 1000000) return "một triệu đồng";
  return `${formatMoney(num)} đồng`;
}

// Hiển thị số tiền dạng chữ
const spelledOutPrice = computed(() => {
  return convertNumberToWordsVN(price.value);
});

/**
 * Định dạng lại số tiền khi người dùng nhập xong
 */
function onBlur() {
  const sanitized = manualPrice.value.trim();
  if (sanitized === "") return;
  const parsed = Number(sanitized.replace(/\./g, "").replace(/,/g, ""));
  if (!isNaN(parsed)) {
    manualPrice.value = formatMoney(parsed);
  }
}

/**
 * Tạo link thanh toán và chuyển hướng người dùng
 */
async function createPaymentLink() {
  try {
    const requestData = {
      price: price.value,
      desc: desc.value,
    };
    const response = await paymentApi(requestData);
    window.location.href = response.url;
  } catch (error) {
    console.error("Lỗi tạo link thanh toán:", error.message);
    throw error;
  }
}
</script>
