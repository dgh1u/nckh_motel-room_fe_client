<template>
  <aside class="hidden md:block w-100 bg-gray-100 shadow-lg rounded-2xl p-4">
    <span class="font-extrabold text-lg mb-4 flex items-center">
      <FilterIcon class="w-5 h-5 mr-2" />
      <span>Bộ lọc</span>
    </span>
    <!-- Phần lọc loại cửa hàng - Chỉ cho phép chọn một loại tại một thời điểm -->
    <div class="mb-6">
      <div class="p-3 text-left">
        <span class="font-bold text-lg mb-2">Loại cửa hàng</span>
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

    <!-- Phần lọc khu vực - Chỉ cho phép chọn một khu vực tại một thời điểm -->
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

import { Filter as FilterIcon, RefreshCw as ResetIcon } from "lucide-vue-next";

// Khai báo emit để gửi dữ liệu bộ lọc cho component cha
const emit = defineEmits(["update:filters"]);

// Danh sách các khu vực
const districtOptions = [
  { label: "An Đào", value: "An Đào" },
  { label: "Đào Nguyên", value: "Đào Nguyên" },
  { label: "Cửu Việt", value: "Cửu Việt" },
  { label: "Thành Chung", value: "Thành Chung" },
  { label: "Ngô Xuân Quảng", value: "Ngọ Xuân Quảng" },
  { label: "Vinhomes OCP", value: "Vinhomes Ocean Park" },
  { label: "Khu vực khác", value: "Khác" },
];

// Danh sách các loại cửa hàng
const secondMotelOptions = [
  { label: "Tạp hóa", value: "Tạp hóa" },
  { label: "Cửa hàng tiện lợi", value: "Cửa hàng tiện lợi" },
  { label: "Văn phòng phẩm", value: "Văn phòng phẩm" },
  { label: "Điện lạnh", value: "Điện lạnh" },
  { label: "Gia dụng", value: "Gia dụng" },
  { label: "Hiệu thuốc", value: "Hiệu thuốc" },
  { label: "Quần áo", value: "Quần áo" },
  { label: "Hiệu sách", value: "Hiệu sách" },
  { label: "Điện thoại", value: "Điện thoại" },
  { label: "Máy tính", value: "Máy tính" },
  { label: "Đồng hồ", value: "Đồng hồ" },
  { label: "Kính mắt", value: "Kính mắt" },
];

// Khai báo biến lưu trữ giá trị được chọn
const selectedDistrict = ref(null);
const selectedSecondMotel = ref(null);
const selectedFeatures = ref([]);

// Xử lý chọn khu vực (chỉ được chọn một)
function selectDistrict(value) {
  if (selectedDistrict.value === value) {
    // Bỏ chọn nếu click vào giá trị đã được chọn
    selectedDistrict.value = null;
  } else {
    // Chọn giá trị mới
    selectedDistrict.value = value;
  }
  updateFilters();
}

// Xử lý chọn loại cửa hàng (chỉ được chọn một)
function selectSecondMotel(value) {
  if (selectedSecondMotel.value === value) {
    // Bỏ chọn nếu click vào giá trị đã được chọn
    selectedSecondMotel.value = null;
  } else {
    // Chọn giá trị mới
    selectedSecondMotel.value = value;
  }
  updateFilters();
}

// Xử lý chọn đặc điểm (có thể chọn nhiều)
function toggleFeature(value) {
  const index = selectedFeatures.value.indexOf(value);
  if (index === -1) {
    selectedFeatures.value.push(value);
  } else {
    selectedFeatures.value.splice(index, 1);
  }
  updateFilters();
}

// Kiểm tra xem đặc điểm có được chọn không
function isFeatureSelected(value) {
  return selectedFeatures.value.includes(value);
}

// Đặt lại tất cả các bộ lọc về giá trị mặc định
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

// Cập nhật và gửi trạng thái bộ lọc về component cha
function updateFilters() {
  emit("update:filters", {
    districtSelected: selectedDistrict.value,
    secondMotelSelected: selectedSecondMotel.value,
    featuresSelected: selectedFeatures.value,
  });
}
</script>

<style scoped>
/* Phần style trống - thêm khi cần */
</style>
