<template>
  <div class="p-3">
    <div class="pb-12 text-left">
      <span class="font-bold text-lg">Chọn Giá</span>
    </div>

    <!-- Thanh slider điều chỉnh giá -->
    <Slider
      :range="true"
      :min="min"
      :max="max"
      :step="step"
      :tooltip="tooltip"
      :modelValue="modelValue"
      @update:modelValue="updateValue"
    />
    <p class="pt-2 text-sm">
      Giá từ: <strong>{{ modelValue[0] }} Triệu</strong> đến
      <strong>{{ modelValue[1] }} Triệu</strong>
    </p>

    <!-- Checkbox chọn khoảng giá nhanh -->
    <div class="mt-3 grid grid-cols-2 gap-3">
      <div
        v-for="(range, idx) in quickPriceRanges"
        :key="idx"
        class="flex items-center space-x-2 cursor-pointer hover:text-teal-500"
        @click.prevent="applyQuickPrice(range)"
        :class="{ 'text-teal-500': isQuickRangeSelected(range) }"
      >
        <div class="relative">
          <div
            class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
            :class="{
              'bg-teal-500 border-teal-500': isQuickRangeSelected(range),
            }"
          >
            <CheckIcon
              v-if="isQuickRangeSelected(range)"
              class="w-3 h-3 text-white"
            />
          </div>
        </div>
        <span class="text-sm">{{ range.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, defineExpose } from "vue";
import Slider from "@vueform/slider";
import { Check as CheckIcon } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [0, 30],
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 30,
  },
  step: {
    type: Number,
    default: 1,
  },
  tooltip: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

// Danh sách các khoảng giá nhanh
const quickPriceRanges = [
  { label: "Dưới 1 Triệu", min: 0, max: 1 },
  { label: "1 - 2 Triệu", min: 1, max: 2 },
  { label: "2 - 3 Triệu", min: 2, max: 3 },
  { label: "3 - 5 Triệu", min: 3, max: 5 },
  { label: "5 - 10 Triệu", min: 5, max: 10 },
  { label: "Trên 10 Triệu", min: 10, max: 30 },
];

// Lưu trạng thái khoảng giá nhanh được chọn
const quickPriceSelected = ref(null);

/**
 * Cập nhật giá trị slider và phát ra sự kiện
 * @param {Array} val - Giá trị mới của slider [min, max]
 * @param {Boolean} resetQuick - Có reset lựa chọn nhanh hay không
 */
function updateValue(val, resetQuick = true) {
  emits("update:modelValue", val);
  if (resetQuick) {
    quickPriceSelected.value = null;
  }
}

/**
 * Áp dụng khoảng giá nhanh khi người dùng chọn
 * Nếu chọn lại khoảng giá đang active thì sẽ bỏ chọn
 */
function applyQuickPrice(range) {
  if (
    quickPriceSelected.value &&
    quickPriceSelected.value.label === range.label
  ) {
    quickPriceSelected.value = null;
    updateValue([props.min, props.max], false);
  } else {
    quickPriceSelected.value = range;
    updateValue([range.min, range.max], false);
  }
}

/**
 * Kiểm tra xem khoảng giá nhanh có đang được chọn không
 * @param {Object} range - Khoảng giá cần kiểm tra
 * @returns {Boolean} - True nếu đang được chọn
 */
function isQuickRangeSelected(range) {
  return (
    quickPriceSelected.value && quickPriceSelected.value.label === range.label
  );
}

/**
 * Reset lựa chọn khoảng giá nhanh về trạng thái ban đầu
 */
function resetQuickPrice() {
  quickPriceSelected.value = null;
}

// Cung cấp các phương thức cho component cha sử dụng
defineExpose({
  resetQuickPrice,
});
</script>

<!-- Import theme mặc định cho slider -->
<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.vueform-slider .vueform-slider__bar.vueform-slider__bar--active {
  background-color: #e10606;
}
.vueform-slider .vueform-slider__dot {
  border: 2px solid #e10606;
}
</style>
