<template>
  <aside class="hidden md:block w-100 bg-white shadow-xl rounded-2xl p-4">
    <span
      class="font-extrabold text-lg mb-4 flex items-center"
      data-aos="zoom-out-right"
      data-aos-duration="800"
    >
      <FilterIcon class="w-5 h-5 mr-2" />
      <span>Bộ lọc</span>
    </span>

    <!-- KHOẢNG GIÁ -->
    <div class="mb-6" data-aos="zoom-out-right" data-aos-duration="800">
      <PriceRange
        v-model="priceRangeLocal"
        :min="0"
        :max="30"
        :step="1"
        :tooltip="true"
      />
    </div>

    <!-- DIỆN TÍCH -->
    <div class="mb-6" data-aos="zoom-out-right" data-aos-duration="800">
      <AcreageRange
        v-model="acreageRangeLocal"
        :min="0"
        :max="100"
        :step="1"
        :tooltip="true"
      />
    </div>

    <!-- GIỚI TÍNH -->
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

    <!-- KHU VỰC -->
    <div class="mb-6">
      <div class="p-3 text-left">
        <span class="font-bold text-lg mb-2">Khu vực</span>
      </div>
      <div class="grid grid-cols-2">
        <div
          v-for="(district, idx) in districtOptions"
          :key="idx"
          class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
          :class="{ 'text-teal-500': isDistrictSelected(district.value) }"
          @click="toggleDistrict(district.value)"
        >
          <div class="relative">
            <input
              type="checkbox"
              class="hidden"
              :checked="isDistrictSelected(district.value)"
              readonly
            />
            <div
              class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
              :class="{
                'bg-teal-500 border-teal-500': isDistrictSelected(
                  district.value
                ),
              }"
            >
              <CheckIcon
                v-if="isDistrictSelected(district.value)"
                class="w-3 h-3 text-white"
              />
            </div>
          </div>
          <span class="ml-2 text-sm">{{ district.label }}</span>
        </div>
      </div>
    </div>

    <!-- ĐẶC ĐIỂM -->
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
import PriceRange from "@/components/range-slider/PriceRange.vue";
import AcreageRange from "@/components/range-slider/AcreageRange.vue";
import {
  Filter as FilterIcon,
  Check as CheckIcon,
  RefreshCw as ResetIcon,
} from "lucide-vue-next";

// Sử dụng emit để gửi dữ liệu bộ lọc cho component cha khi có thay đổi
const emit = defineEmits(["update:filters"]);

// Khai báo state riêng cho bộ lọc trong component con
const priceRangeLocal = ref([0, 30]);
const acreageRangeLocal = ref([5, 95]);

const districtOptions = [
  { label: "An Đào", value: "An Đào" },
  { label: "Đào Nguyên", value: "Dậu Nguyên" },
  { label: "Cửu Việt", value: "Cửu Việt" },
  { label: "Thành Chung", value: "Thành Chung" },
  { label: "Ngô Xuân Quảng", value: "Ngọ Xuân Quảng" },
  { label: "Vinhomes OCP", value: "Vinhomes Ocean Park" },
  { label: "Khu vực khác", value: "Khác" },
];

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

// State để lưu các lựa chọn cho khu vực và đặc điểm
const selectedDistricts = ref([]);
const selectedFeatures = ref([]);

// Thêm state cho bộ lọc giới tính
const genderSelected = ref(null);

// Hàm xử lý khi người dùng click chọn khu vực
function toggleDistrict(value) {
  const index = selectedDistricts.value.indexOf(value);
  if (index === -1) {
    selectedDistricts.value.push(value);
  } else {
    selectedDistricts.value.splice(index, 1);
  }
  updateFilters();
}

function isDistrictSelected(value) {
  return selectedDistricts.value.includes(value);
}

// Hàm xử lý khi người dùng click chọn đặc điểm
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

// Hàm xử lý khi người dùng click chọn giới tính
function toggleGender(value) {
  if (genderSelected.value === value) {
    genderSelected.value = null;
  } else {
    genderSelected.value = value;
  }
  updateFilters();
}

// Hàm đặt lại toàn bộ bộ lọc
function resetAll() {
  priceRangeLocal.value = [0, 30];
  acreageRangeLocal.value = [0, 100];
  selectedDistricts.value = [];
  selectedFeatures.value = [];
  genderSelected.value = null;
  updateFilters();
}

// Hàm gửi state bộ lọc về cho component cha
function updateFilters() {
  emit("update:filters", {
    priceRange: priceRangeLocal.value,
    acreageRange: acreageRangeLocal.value,
    districtsSelected: selectedDistricts.value,
    featuresSelected: selectedFeatures.value,
    gender: genderSelected.value,
  });
}

// Theo dõi thay đổi của slider để cập nhật bộ lọc
watch(priceRangeLocal, updateFilters);
watch(acreageRangeLocal, updateFilters);
</script>

<style scoped>
/* Tuỳ chỉnh style nếu cần */
</style>
