<template>
  <aside class="hidden md:block w-100 bg-white shadow-xl rounded-2xl p-4">
    <span class="font-extrabold text-lg mb-4 flex items-center">
      <FilterIcon class="w-5 h-5 mr-2" />
      <span>Bộ lọc</span>
    </span>

    <!-- Thanh trượt khoảng giá -->
    <div class="mb-6">
      <PriceRange
        v-model="priceRangeLocal"
        :min="0"
        :max="30"
        :step="1"
        :tooltip="true"
      />
    </div>

    <!-- Thanh trượt diện tích -->
    <div class="mb-6">
      <AcreageRange
        v-model="acreageRangeLocal"
        :min="0"
        :max="100"
        :step="1"
        :tooltip="true"
      />
    </div>

    <!-- Bộ lọc giới tính -->
    <div class="mb-6">
      <div class="p-3 text-left">
        <span class="font-bold text-lg mb-2">Giới tính</span>
      </div>
      <div class="grid grid-cols-2">
        <div
          class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
          :class="{ 'text-teal-500': genderSelected === true }"
          @click="toggleGender(true)"
        >
          <div class="relative">
            <input
              type="checkbox"
              class="hidden"
              :checked="genderSelected === true"
              readonly
            />
            <div
              class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
              :class="{
                'bg-teal-500 border-teal-500': genderSelected === true,
              }"
            >
              <CheckIcon
                v-if="genderSelected === true"
                class="w-3 h-3 text-white"
              />
            </div>
          </div>
          <span class="ml-2 text-sm">Nam</span>
        </div>
        <div
          class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
          :class="{ 'text-teal-500': genderSelected === false }"
          @click="toggleGender(false)"
        >
          <div class="relative">
            <input
              type="checkbox"
              class="hidden"
              :checked="genderSelected === false"
              readonly
            />
            <div
              class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
              :class="{
                'bg-teal-500 border-teal-500': genderSelected === false,
              }"
            >
              <CheckIcon
                v-if="genderSelected === false"
                class="w-3 h-3 text-white"
              />
            </div>
          </div>
          <span class="ml-2 text-sm">Nữ</span>
        </div>
      </div>
    </div>

    <!-- Bộ lọc khu vực - Chỉ chọn một -->
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

    <!-- Bộ lọc đặc điểm - Chọn nhiều -->
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
import { ref, watch, defineEmits } from "vue";
import PriceRange from "@/components/range-slider/PriceRange.vue";
import AcreageRange from "@/components/range-slider/AcreageRange.vue";
import {
  Filter as FilterIcon,
  Check as CheckIcon,
  RefreshCw as ResetIcon,
} from "lucide-vue-next";

// Định nghĩa emit để truyền dữ liệu bộ lọc cho component cha
const emit = defineEmits(["update:filters"]);

// Khai báo các giá trị mặc định cho bộ lọc
const priceRangeLocal = ref([0, 30]);
const acreageRangeLocal = ref([5, 95]);

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

// Danh sách các đặc điểm phòng trọ có thể chọn
const featureOptions = [
  { label: "Đầy đủ nội thất", value: "full_furniture" },
  { label: "Kệ bếp", value: "has_kitchen" },
  { label: "Có điều hòa", value: "has_aircon" },
  { label: "Có nóng lạnh", value: "has_washer" },
  { label: "Có internet", value: "has_internet" },
  { label: "Vệ sinh khép kín", value: "no_toilet" },
  { label: "Không Chung chủ", value: "no_owner" },
  { label: "Giờ giấc tự do", value: "free_time" },
  { label: "An ninh tốt", value: "security_24_7" },
  { label: "Có chỗ để xe", value: "has_parking" },
];

// Khai báo biến lưu giá trị đã chọn cho từng bộ lọc
const selectedDistrict = ref(null); // Chỉ chọn một khu vực
const selectedFeatures = ref([]); // Chọn nhiều đặc điểm
const genderSelected = ref(null); // Giới tính (true: Nam, false: Nữ, null: Không chọn)

// Xử lý chọn khu vực (chỉ chọn một)
function selectDistrict(value) {
  if (selectedDistrict.value === value) {
    // Nếu chọn lại khu vực đã chọn, bỏ chọn nó
    selectedDistrict.value = null;
  } else {
    // Chọn khu vực mới
    selectedDistrict.value = value;
  }
  updateFilters();
}

// Xử lý chọn đặc điểm (chọn nhiều)
function toggleFeature(value) {
  const index = selectedFeatures.value.indexOf(value);
  if (index === -1) {
    // Nếu chưa chọn, thêm vào danh sách
    selectedFeatures.value.push(value);
  } else {
    // Nếu đã chọn, loại bỏ khỏi danh sách
    selectedFeatures.value.splice(index, 1);
  }
  updateFilters();
}

// Kiểm tra đặc điểm đã được chọn hay chưa
function isFeatureSelected(value) {
  return selectedFeatures.value.includes(value);
}

// Xử lý chọn giới tính
function toggleGender(value) {
  if (genderSelected.value === value) {
    // Nếu chọn lại giới tính đã chọn, bỏ chọn nó
    genderSelected.value = null;
  } else {
    // Chọn giới tính mới
    genderSelected.value = value;
  }
  updateFilters();
}

// Đặt lại tất cả bộ lọc về giá trị mặc định
function resetAll() {
  priceRangeLocal.value = [0, 30];
  acreageRangeLocal.value = [0, 100];
  selectedDistrict.value = null;
  selectedFeatures.value = [];
  genderSelected.value = null;
  updateFilters();
}

// Gửi dữ liệu bộ lọc hiện tại tới component cha
function updateFilters() {
  emit("update:filters", {
    priceRange: priceRangeLocal.value,
    acreageRange: acreageRangeLocal.value,
    districtSelected: selectedDistrict.value,
    featuresSelected: selectedFeatures.value,
    gender: genderSelected.value,
  });
}

// Theo dõi thay đổi của các thanh trượt để cập nhật bộ lọc
watch(priceRangeLocal, updateFilters);
watch(acreageRangeLocal, updateFilters);
</script>

<style scoped>
/* Có thể thêm các tùy chỉnh CSS nếu cần */
</style>
