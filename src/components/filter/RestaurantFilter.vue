<template>
  <aside class="hidden md:block w-100 bg-gray-100 shadow-lg rounded-2xl p-4">
    <span class="font-extrabold text-lg mb-4 flex items-center">
      <FilterIcon class="w-5 h-5 mr-2" />
      <span>Bộ lọc</span>
    </span>
    <!-- Phần lọc loại quán ăn - chỉ cho phép chọn một tùy chọn -->
    <div class="mb-6">
      <div class="p-3 text-left">
        <span class="font-bold text-lg mb-2">Loại quán ăn</span>
      </div>
      <div class="grid grid-cols-2">
        <div
          v-for="(secondMotel, idx) in secondMotelOptions"
          :key="idx"
          class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
          :class="{
            'text-teal-500': selectedSecondMotel === secondMotel.value,
          }"
          @click="selectSecondMotel(secondMotel.value)"
        >
          <div class="relative">
            <input
              type="radio"
              class="hidden"
              :checked="selectedSecondMotel === secondMotel.value"
              readonly
            />
            <div
              class="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center"
              :class="{
                'bg-teal-500 border-teal-500':
                  selectedSecondMotel === secondMotel.value,
              }"
            >
              <div
                v-if="selectedSecondMotel === secondMotel.value"
                class="w-3 h-3 rounded-full bg-white"
              ></div>
            </div>
          </div>
          <span class="ml-2 text-sm">{{ secondMotel.label }}</span>
        </div>
      </div>
    </div>

    <!-- Phần lọc khu vực - chỉ cho phép chọn một tùy chọn -->
    <div class="mb-6">
      <div class="p-3 text-left">
        <span class="font-bold text-lg mb-2">Khu vực</span>
      </div>
      <div class="grid grid-cols-2">
        <div
          v-for="(district, idx) in districtOptions"
          :key="idx"
          class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
          :class="{ 'text-teal-500': selectedDistrict === district.value }"
          @click="selectDistrict(district.value)"
        >
          <div class="relative">
            <input
              type="radio"
              class="hidden"
              :checked="selectedDistrict === district.value"
              readonly
            />
            <div
              class="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center"
              :class="{
                'bg-teal-500 border-teal-500':
                  selectedDistrict === district.value,
              }"
            >
              <div
                v-if="selectedDistrict === district.value"
                class="w-3 h-3 rounded-full bg-white"
              ></div>
            </div>
          </div>
          <span class="ml-2 text-sm">{{ district.label }}</span>
        </div>
      </div>
    </div>

    <!-- Phần lọc đặc điểm - cho phép chọn nhiều tùy chọn -->
    <div class="mb-4">
      <div class="p-3 text-left">
        <span class="font-bold text-lg mb-2">Đặc điểm</span>
      </div>
      <div class="grid grid-cols-2">
        <div
          v-for="(feature, idx) in featureOptions"
          :key="idx"
          class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
          :class="{ 'text-teal-500': isFeatureSelected(feature.value) }"
          @click="toggleFeature(feature.value)"
        >
          <div class="relative">
            <input
              type="checkbox"
              class="hidden"
              :checked="isFeatureSelected(feature.value)"
              readonly
            />
            <div
              class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
              :class="{
                'bg-teal-500 border-teal-500': isFeatureSelected(feature.value),
              }"
            >
              <CheckIcon
                v-if="isFeatureSelected(feature.value)"
                class="w-3 h-3 text-white"
              />
            </div>
          </div>
          <span class="ml-2 text-sm">{{ feature.label }}</span>
        </div>
      </div>
    </div>

    <!-- Nút đặt lại bộ lọc -->
    <div class="p-2 text-white">
      <button
        class="flex items-center space-x-2 font-bold border border-red-400 px-5 py-2 rounded bg-red-400 hover:bg-red-500 text-white hover:border-red-500 transition"
        @click="resetAll"
      >
        <ResetIcon class="w-4 h-4" />
        <span>Đặt lại</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, defineEmits } from "vue";

import {
  Filter as FilterIcon,
  Check as CheckIcon,
  RefreshCw as ResetIcon,
} from "lucide-vue-next";

// Khai báo emit để gửi dữ liệu bộ lọc về component cha
const emit = defineEmits(["update:filters"]);

// Danh sách các tùy chọn khu vực
const districtOptions = [
  { label: "An Đào", value: "An Đào" },
  { label: "Đào Nguyên", value: "Đào Nguyên" },
  { label: "Cửu Việt", value: "Cửu Việt" },
  { label: "Thành Chung", value: "Thành Chung" },
  { label: "Ngô Xuân Quảng", value: "Ngọ Xuân Quảng" },
  { label: "Vinhomes OCP", value: "Vinhomes Ocean Park" },
  { label: "Khu vực khác", value: "Khác" },
];

// Danh sách các tùy chọn loại quán ăn
const secondMotelOptions = [
  { label: "Cơm", value: "Cơm" },
  { label: "Món nước", value: "Món nước" },
  { label: "Xôi và Bánh mì", value: "Xôi và Bánh mì" },
  { label: "Cháo", value: "Cháo" },
  { label: "Ăn vặt", value: "Ăn vặt" },
  { label: "Đồ ăn nhanh", value: "Đồ ăn nhanh" },
  { label: "Quán nhậu", value: "Quán nhậu" },
];

// Danh sách các tùy chọn đặc điểm
const featureOptions = [
  { label: "Có điều hòa", value: "has_aircon" },
  { label: "Có giao hàng", value: "has_delivery" },
  { label: "Không gian rộng", value: "has_bigSpace" },
  { label: "Phục vụ tại chỗ", value: "has_dineIn" },
  { label: "Có chỗ để xe", value: "has_parking" },
  { label: "Mua mang đi", value: "has_takeAway" },
  { label: "Wifi miễn phí", value: "has_internet" },
];

// Các biến lưu trữ trạng thái lọc
const selectedDistrict = ref(null); // Lưu khu vực được chọn (chỉ 1)
const selectedSecondMotel = ref(null); // Lưu loại quán được chọn (chỉ 1)
const selectedFeatures = ref([]); // Lưu các đặc điểm được chọn (nhiều)

// Xử lý khi chọn khu vực - chỉ cho phép chọn một khu vực
function selectDistrict(value) {
  if (selectedDistrict.value === value) {
    // Nếu click vào giá trị đã chọn, bỏ chọn nó
    selectedDistrict.value = null;
  } else {
    // Chọn giá trị mới
    selectedDistrict.value = value;
  }
  updateFilters();
}

// Xử lý khi chọn loại quán ăn - chỉ cho phép chọn một loại
function selectSecondMotel(value) {
  if (selectedSecondMotel.value === value) {
    // Nếu click vào giá trị đã chọn, bỏ chọn nó
    selectedSecondMotel.value = null;
  } else {
    // Chọn giá trị mới
    selectedSecondMotel.value = value;
  }
  updateFilters();
}

// Xử lý khi chọn đặc điểm - cho phép chọn nhiều đặc điểm
function toggleFeature(value) {
  const index = selectedFeatures.value.indexOf(value);
  if (index === -1) {
    // Nếu chưa có trong mảng, thêm vào
    selectedFeatures.value.push(value);
  } else {
    // Nếu đã có trong mảng, xóa đi
    selectedFeatures.value.splice(index, 1);
  }
  updateFilters();
}

// Kiểm tra xem một đặc điểm có được chọn hay không
function isFeatureSelected(value) {
  return selectedFeatures.value.includes(value);
}

// Đặt lại tất cả các bộ lọc về trạng thái ban đầu
function resetAll() {
  selectedDistrict.value = null;
  selectedSecondMotel.value = null;
  selectedFeatures.value = [];

  updateFilters();

  // Cuộn trang lên đầu
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Gửi trạng thái bộ lọc hiện tại về component cha
function updateFilters() {
  emit("update:filters", {
    districtSelected: selectedDistrict.value,
    secondMotelSelected: selectedSecondMotel.value,
    featuresSelected: selectedFeatures.value,
  });
}
</script>
