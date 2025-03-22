<template>
  <!-- Container chính: flex ngang -->
  <div
    class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition flex gap-4"
  >
    <!-- (1) Cột trái: luôn tạo mảng 3 ảnh (1 ảnh lớn + 2 ảnh nhỏ) -->
    <div class="w-1/3 flex flex-col gap-2">
      <!-- Ảnh lớn đầu tiên -->
      <div class="w-full h-40 bg-gray-200 rounded overflow-hidden">
        <img
          :src="threeImages[0]"
          alt="preview"
          class="object-cover w-full h-full"
        />
      </div>
      <!-- 2 ảnh nhỏ bên dưới -->
      <div class="flex gap-2 h-20">
        <div class="w-1/2 bg-gray-200 rounded overflow-hidden">
          <img
            :src="threeImages[1]"
            alt="preview"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="w-1/2 bg-gray-200 rounded overflow-hidden">
          <img
            :src="threeImages[2]"
            alt="preview"
            class="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>

    <!-- (2) Cột phải: thông tin bài đăng -->
    <div class="flex-1 flex flex-col py-5">
      <!-- Tiêu đề (align trái) -->
      <span class="text-lg font-bold text-gray-800 mb-1 text-left">
        {{ post.title }}
      </span>

      <!-- Giá + diện tích trên cùng một dòng -->
      <div class="flex items-center text-red-500 mb-2 gap-3 text-left">
        <!-- Giá -->
        <span class="font-bold text-lg">{{ formattedPrice }}</span>
        <!-- Diện tích -->
        <div class="flex gap-1 text-gray-600 mt-1 ml-5">
          <AcreageIcon class="w-4 h-4 mt-1" />
          <span class="text-base"
            >{{ post.accomodationDTO?.acreage || "N/A" }}m²</span
          >
        </div>
      </div>

      <!-- Địa chỉ -->
      <div class="flex items-center gap-1 text-sm text-gray-600 mb-2 text-left">
        <!-- Icon -->
        <MapPinIcon class="w-4 h-4 text-gray-600" />

        <!-- Địa chỉ -->
        <span class="text-black">
          {{ post.accomodationDTO?.address || "Địa chỉ không xác định" }}
        </span>

        <!-- Dấu chấm giữa -->
        <span class="mx-1">·</span>

        <!-- Tên quận/huyện -->
        <span>
          {{ post.accomodationDTO?.district?.name || "Khu vực?" }}
        </span>
      </div>

      <!-- Mô tả tóm tắt -->
      <p
        class="line-clamp-2 text-sm text-gray-600 mb-2 leading-relaxed text-left flex-1"
      >
        {{ post.content }}
      </p>

      <!-- (3) Khu vực thông tin người đăng -->
      <div class="flex items-center justify-between mt-3">
        <!-- Bên trái: avatar + tên -->
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            <img
              v-if="finalAvatar"
              :src="finalAvatar"
              alt="avatar"
              class="object-cover w-full h-full"
            />
          </div>
          <span class="text-sm font-medium text-gray-800">
            {{ post.userDTO?.fullName || "Người dùng" }}
          </span>
        </div>

        <!-- Bên phải: phone + thời gian đăng -->
        <div class="flex items-center gap-4">
          <!-- Div xanh lá với icon phone + số điện thoại -->
          <div
            class="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-full transition"
          >
            <PhoneIcon class="w-4 h-4" />
            <span class="text-sm font-medium">
              {{ post.userDTO?.phone || "Số điện thoại?" }}
            </span>
          </div>

          <span class="text-xs text-gray-400">
            {{ postedAgo }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import {
  Scan as AcreageIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
} from "lucide-vue-next";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

/**
 * (A) Luôn tạo mảng 3 ảnh:
 * - Nếu post.imageStrings < 3 => bổ sung placeholder cho đủ 3.
 */
const threeImages = computed(() => {
  const placeholders = [
    "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image",
    "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image",
    "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image",
  ];
  if (props.post.imageStrings && props.post.imageStrings.length) {
    const images = [...props.post.imageStrings];
    while (images.length < 3) {
      images.push(placeholders[images.length]);
    }
    return images.slice(0, 3);
  }
  return placeholders;
});

/**
 * (B) Tạo mảng ảnh phụ: bỏ ảnh đầu, lấy tối đa 2 ảnh.
 */
const moreImages = computed(() => {
  return threeImages.value.slice(1, 3);
});

/**
 * (C) Định dạng giá theo yêu cầu:
 * - Nếu giá >= 1,000,000 thì hiển thị dạng "1.6 triệu/tháng"
 * - Nếu giá < 1,000,000 thì hiển thị dạng "700.000 đồng/tháng"
 */
function formatCustomPrice(price) {
  if (!price || typeof price !== "number") {
    return "Giá: Thoả thuận";
  }
  if (price >= 1000000) {
    const million = (price / 1000000).toFixed(1);
    return `${million} triệu/tháng`;
  } else {
    const formatted = new Intl.NumberFormat("vi-VN").format(price);
    return `${formatted} đồng/tháng`;
  }
}

const formattedPrice = computed(() => {
  const price = props.post.accomodationDTO?.price;
  return formatCustomPrice(price);
});

/**
 * (D) Tính thời gian đăng: "Đăng X giờ trước" hoặc "Đăng X ngày trước"
 */
const postedAgo = computed(() => {
  if (!props.post.createAt) return "";
  const createTime = new Date(props.post.createAt).getTime();
  const diffMs = Date.now() - createTime;
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 24) {
    return `Đăng ${diffHours} giờ trước`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `Đăng ${diffDays} ngày trước`;
  }
});

/**
 * (E) Xử lý avatar:
 * Nếu post.userDTO.b64 có sẵn và không bắt đầu bằng "data:image" thì tự thêm tiền tố.
 */
const finalAvatar = computed(() => {
  const avatar = props.post.userDTO?.b64;
  if (avatar) {
    return avatar.startsWith("data:image")
      ? avatar
      : "data:image/png;base64," + avatar;
  }
  return null;
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}
</style>
