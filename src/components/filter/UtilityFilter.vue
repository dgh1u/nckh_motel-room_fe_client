<template>
  <aside class="hidden md:block w-100 bg-gray-100 shadow-lg rounded-2xl p-4">
    <span class="font-extrabold text-lg mb-4 flex items-center">
      <FilterIcon class="w-5 h-5 mr-2" />
      <span>Bộ lọc</span>
    </span>
    <!-- Phần lọc theo loại dịch vụ tiện ích - Chỉ cho phép chọn một loại -->
    <div class="mb-6">
      <div class="p-3 text-left">
        <span class="font-bold text-lg mb-2">Loại dịch vụ tiện ích</span>
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

    <!-- Phần lọc theo khu vực - Chỉ cho phép chọn một khu vực -->
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

    <!-- Nút đặt lại tất cả các bộ lọc -->
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

import { Filter as FilterIcon, RefreshCw as ResetIcon } from "lucide-vue-next";

// Khai báo emit để gửi dữ liệu bộ lọc cho component cha khi có thay đổi
const emit = defineEmits(["update:filters"]);

// Danh sách các khu vực có thể chọn
const districtOptions = [
  { label: "An Đào", value: "An Đào" },
  { label: "Đào Nguyên", value: "Đào Nguyên" },
  { label: "Cửu Việt", value: "Cửu Việt" },
  { label: "Thành Chung", value: "Thành Chung" },
  { label: "Ngô Xuân Quảng", value: "Ngọ Xuân Quảng" },
  { label: "Vinhomes OCP", value: "Vinhomes Ocean Park" },
  { label: "Khu vực khác", value: "Khác" },
];

// Danh sách các loại dịch vụ tiện ích có thể chọn
const secondMotelOptions = [
  { label: "Photocopy", value: "Photocopy" },
  { label: "Giặt là", value: "Giặt là" },
  { label: "Học ngoại ngữ", value: "Học ngoại ngữ" },
  { label: "Chụp ảnh", value: "Chụp ảnh" },
];

// Biến theo dõi trạng thái chọn (lưu ý: đã chuyển từ dạng mảng sang dạng đơn giá trị cho khu vực và loại dịch vụ)
const selectedDistrict = ref(null);
const selectedSecondMotel = ref(null);
const selectedFeatures = ref([]);

// Hàm xử lý khi người dùng chọn khu vực
function selectDistrict(value) {
  if (selectedDistrict.value === value) {
    // Bỏ chọn nếu click vào cùng một giá trị đã chọn
    selectedDistrict.value = null;
  } else {
    // Chọn giá trị mới
    selectedDistrict.value = value;
  }
  updateFilters();
}

// Hàm xử lý khi người dùng chọn loại dịch vụ tiện ích
function selectSecondMotel(value) {
  if (selectedSecondMotel.value === value) {
    // Bỏ chọn nếu click vào cùng một giá trị đã chọn
    selectedSecondMotel.value = null;
  } else {
    // Chọn giá trị mới
    selectedSecondMotel.value = value;
  }
  updateFilters();
}

// Hàm xử lý khi người dùng chọn đặc điểm (hỗ trợ chọn nhiều)
function toggleFeature(value) {
  const index = selectedFeatures.value.indexOf(value);
  if (index === -1) {
    selectedFeatures.value.push(value);
  } else {
    selectedFeatures.value.splice(index, 1);
  }
  updateFilters();
}

// Hàm kiểm tra xem một đặc điểm có được chọn hay không
function isFeatureSelected(value) {
  return selectedFeatures.value.includes(value);
}

// Hàm đặt lại tất cả các bộ lọc về trạng thái ban đầu
function resetAll() {
  selectedDistrict.value = null;
  selectedSecondMotel.value = null;
  selectedFeatures.value = [];

  updateFilters();

  // Cuộn trang lên đầu sau khi đặt lại
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Hàm gửi dữ liệu bộ lọc hiện tại về component cha
function updateFilters() {
  emit("update:filters", {
    districtSelected: selectedDistrict.value,
    secondMotelSelected: selectedSecondMotel.value,
    featuresSelected: selectedFeatures.value,
  });
}
</script>

<style scoped>
/* Có thể thêm các tùy chỉnh CSS nếu cần */
</style>
