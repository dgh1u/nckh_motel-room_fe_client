<template>
  <aside class="hidden md:block w-100 bg-gray-100 shadow-lg rounded-2xl p-4">
    <span class="font-extrabold text-lg mb-4 flex items-center">
      <FilterIcon class="w-5 h-5 mr-2" />
      <span>Bộ lọc</span>
    </span>
    <!-- LOẠI QUÁN ĂN - Modified to select only one at a time -->
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

    <!-- KHU VỰC - Modified to select only one at a time -->
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

    <!-- ĐẶC ĐIỂM - This section remains with multiple selections -->
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

    <!-- NÚT ĐẶT LẠI -->
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
import { ref, watch, defineEmits } from "vue";

import {
  Filter as FilterIcon,
  Check as CheckIcon,
  RefreshCw as ResetIcon,
} from "lucide-vue-next";

// Sử dụng emit để gửi dữ liệu bộ lọc cho component cha khi có thay đổi
const emit = defineEmits(["update:filters"]);

const districtOptions = [
  { label: "An Đào", value: "An Đào" },
  { label: "Đào Nguyên", value: "Đào Nguyên" },
  { label: "Cửu Việt", value: "Cửu Việt" },
  { label: "Thành Chung", value: "Thành Chung" },
  { label: "Ngô Xuân Quảng", value: "Ngọ Xuân Quảng" },
  { label: "Vinhomes OCP", value: "Vinhomes Ocean Park" },
  { label: "Khu vực khác", value: "Khác" },
];

const secondMotelOptions = [
  { label: "Cơm", value: "Cơm" },
  { label: "Món nước", value: "Món nước" },
  { label: "Xôi và Bánh mì", value: "Xôi và Bánh mì" },
  { label: "Cháo", value: "Cháo" },
  { label: "Ăn vặt", value: "Ăn vặt" },
  { label: "Đồ ăn nhanh", value: "Đồ ăn nhanh" },
  { label: "Quán nhậu", value: "Quán nhậu" },
];

const featureOptions = [
  { label: "Có điều hòa", value: "has_aircon" },
  { label: "Có giao hàng", value: "has_delivery" },
  { label: "Không gian rộng", value: "has_bigSpace" },
  { label: "Phục vụ tại chỗ", value: "has_dineIn" },
  { label: "Có chỗ để xe", value: "has_parking" },
  { label: "Mua mang đi", value: "has_takeAway" },
  { label: "Wifi miễn phí", value: "has_internet" },
];

// Thay đổi từ mảng thành một giá trị duy nhất cho Khu vực và Loại quán ăn
const selectedDistrict = ref(null);
const selectedSecondMotel = ref(null);
// Đặc điểm vẫn cho phép chọn nhiều
const selectedFeatures = ref([]);

// Hàm xử lý chọn khu vực (chỉ một giá trị)
function selectDistrict(value) {
  if (selectedDistrict.value === value) {
    // Nếu click vào cùng một giá trị đã chọn, bỏ chọn nó
    selectedDistrict.value = null;
  } else {
    // Chọn giá trị mới, tự động bỏ chọn giá trị cũ
    selectedDistrict.value = value;
  }
  updateFilters();
}

// Hàm xử lý chọn loại quán ăn (chỉ một giá trị)
function selectSecondMotel(value) {
  if (selectedSecondMotel.value === value) {
    // Nếu click vào cùng một giá trị đã chọn, bỏ chọn nó
    selectedSecondMotel.value = null;
  } else {
    // Chọn giá trị mới, tự động bỏ chọn giá trị cũ
    selectedSecondMotel.value = value;
  }
  updateFilters();
}

// Hàm xử lý khi người dùng click chọn đặc điểm (cho phép nhiều lựa chọn)
function toggleFeature(value) {
  const index = selectedFeatures.value.indexOf(value);
  if (index === -1) {
    selectedFeatures.value.push(value);
  } else {
    selectedFeatures.value.splice(index, 1);
  }
  updateFilters();
}

function isFeatureSelected(value) {
  return selectedFeatures.value.includes(value);
}

// Hàm đặt lại toàn bộ bộ lọc
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

// Hàm gửi state bộ lọc về cho component cha
function updateFilters() {
  emit("update:filters", {
    districtSelected: selectedDistrict.value,
    secondMotelSelected: selectedSecondMotel.value,
    featuresSelected: selectedFeatures.value,
  });
}
</script>

<style scoped>
/* Tuỳ chỉnh style nếu cần */
</style>
