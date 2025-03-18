<template>
  <div class="p-3">
    <div class="pb-12 text-left">
      <span class="font-bold text-lg">Chọn diện tích</span>
    </div>

    <!-- Slider -->
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
      Diện tích từ: <strong>{{ modelValue[0] }} m²</strong> đến
      <strong>{{ modelValue[1] }} m²</strong>
    </p>

    <!-- Checkbox chọn nhanh -->
    <div class="mt-3 grid grid-cols-2 gap-3">
      <div
        v-for="(range, idx) in quickAcreageRanges"
        :key="idx"
        class="flex items-center space-x-2 cursor-pointer hover:text-teal-500"
        @click.prevent="applyQuickAcreage(range)"
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
import { defineProps, defineEmits, ref } from "vue";
import Slider from "@vueform/slider";
import { Check as CheckIcon } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [0, 100],
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
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

// Các quick range cho diện tích
const quickAcreageRanges = [
  { label: "Dưới 15m²", min: 0, max: 15 },
  { label: "15 - 20m²", min: 15, max: 20 },
  { label: "20 - 30m²", min: 20, max: 30 },
  { label: "30 - 50m²", min: 30, max: 50 },
  { label: "Trên 50m²", min: 50, max: 100 },
];

const quickAcreageSelected = ref(null);

/**
 * Cập nhật giá trị slider.
 * @param {Array} val - Giá trị mới của slider.
 * @param {Boolean} [resetQuick=true]
 */
function updateValue(val, resetQuick = true) {
  emits("update:modelValue", val);
  if (resetQuick) {
    quickAcreageSelected.value = null;
  }
}

// Xử lý khi tick checkbox chọn nhanh
function applyQuickAcreage(range) {
  if (
    quickAcreageSelected.value &&
    quickAcreageSelected.value.label === range.label
  ) {
    quickAcreageSelected.value = null;
    updateValue([props.min, props.max], false);
  } else {
    quickAcreageSelected.value = range;
    updateValue([range.min, range.max], false);
  }
}

// Kiểm tra xem range này có đang được chọn không
function isQuickRangeSelected(range) {
  return (
    quickAcreageSelected.value &&
    quickAcreageSelected.value.label === range.label
  );
}
</script>

<!-- Import theme mặc định -->
<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.vueform-slider .vueform-slider__bar.vueform-slider__bar--active {
  background-color: #e10606;
}
.vueform-slider .vueform-slider__dot {
  border: 2px solid #e10606;
}
</style>
