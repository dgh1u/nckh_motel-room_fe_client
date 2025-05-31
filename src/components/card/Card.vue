<template>
  <div
    class="bg-white rounded-lg shadow p-2 sm:p-4 hover:scale-[1.03] hover:shadow-lg transition flex flex-col sm:flex-row gap-2 sm:gap-4"
  >
    <!-- Phần hiển thị ảnh -->
    <div class="w-full sm:w-1/3 flex flex-col gap-2">
      <!-- Phần hiển thị ảnh chính -->
      <div class="w-full h-32 sm:h-40 bg-gray-200 rounded overflow-hidden">
        <img
          :src="threeImages[0]"
          alt="preview"
          @error="onImgError"
          class="object-cover w-full h-full"
        />
      </div>
      <!-- Phần hiển thị 2 ảnh phụ - ẩn trên mobile -->
      <div class="hidden sm:flex gap-2 h-20">
        <img
          :src="threeImages[1]"
          alt="preview"
          @error="onImgError"
          class="object-cover w-1/2 h-full rounded overflow-hidden"
        />
        <img
          :src="threeImages[2]"
          alt="preview"
          @error="onImgError"
          class="object-cover w-1/2 h-full rounded overflow-hidden"
        />
      </div>
    </div>

    <div class="flex-1 flex flex-col py-1 sm:py-3">
      <!-- Tiêu đề bài đăng -->
      <span
        class="text-base sm:text-lg font-bold text-gray-800 mb-1 text-left line-clamp-1 sm:line-clamp-none"
        >{{ post.title }}</span
      >

      <!-- Hiển thị giá và diện tích -->
      <div
        class="flex flex-col sm:flex-row sm:items-center text-red-500 mb-2 gap-1 sm:gap-3 text-left"
      >
        <span class="font-bold text-base sm:text-lg">{{ formattedPrice }}</span>
        <div class="flex gap-1 text-gray-600 sm:ml-5">
          <AcreageIcon class="w-4 h-4 mt-1" />
          <span class="text-sm sm:text-base"
            >{{ post.accomodationDTO?.acreage || "N/A" }}m²</span
          >
        </div>
      </div>

      <!-- Hiển thị địa chỉ và khu vực -->
      <div
        class="flex items-start sm:items-center gap-1 text-xs sm:text-sm text-gray-600 pt-1 text-left"
      >
        <MapPinIcon
          class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mt-0.5 sm:mt-0 flex-shrink-0"
        />
        <div class="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-1">
          <span class="text-black text-xs sm:text-sm line-clamp-1">{{
            post.accomodationDTO?.address || "Địa chỉ không xác định"
          }}</span>
          <span class="hidden sm:inline mx-1">·</span>
          <span class="text-xs sm:text-sm">{{
            post.accomodationDTO?.district?.name || "Khu vực?"
          }}</span>
        </div>
      </div>

      <!-- Nội dung bài đăng (giới hạn 2 dòng trên desktop, 1 dòng trên mobile) -->
      <div class="pt-2 sm:pt-4">
        <p
          class="line-clamp-2 text-xs sm:text-sm text-gray-600 leading-relaxed text-left flex-1"
        >
          {{ post.content }}
        </p>
      </div>

      <!-- Phần footer hiển thị thông tin người đăng và liên hệ -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3 gap-2 sm:gap-0"
      >
        <!-- Thông tin người đăng -->
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0"
          >
            <img
              v-if="finalAvatar"
              :src="finalAvatar"
              alt="avatar"
              @error="onImgError"
              class="object-cover w-full h-full"
            />
          </div>
          <span class="text-xs sm:text-sm font-medium text-gray-800 truncate">{{
            post.userDTO?.fullName || "Người dùng"
          }}</span>
        </div>

        <!-- Thông tin liên hệ và thời gian -->
        <div
          class="flex items-center justify-between sm:justify-end gap-2 sm:gap-4"
        >
          <div
            class="flex items-center gap-1 sm:gap-2 bg-teal-500 hover:bg-teal-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition text-xs sm:text-sm"
          >
            <PhoneIcon
              class="w-3 h-3 sm:w-4 sm:h-4 text-white"
              fill="currentColor"
            />
            <span class="font-medium">{{
              post.userDTO?.phone || "Số điện thoại?"
            }}</span>
          </div>
          <span class="text-xs text-gray-400 flex-shrink-0">{{
            postedAgo
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted, watch } from "vue";
import {
  Scan as AcreageIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
} from "lucide-vue-next";
import { getImageByPost } from "@/apis/imageService";

const props = defineProps({ post: { type: Object, required: true } });
// Ảnh mặc định khi không có ảnh thực
const placeholders = [
  "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image",
  "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image",
  "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image",
];
const fetchedImages = ref([]);

// Hàm lấy ảnh từ API theo ID bài đăng
async function fetchImages() {
  if (!props.post.id) return;
  try {
    const images = await getImageByPost(props.post.id);
    fetchedImages.value = Array.isArray(images) ? images : [];
  } catch {
    fetchedImages.value = [];
  }
}
onMounted(fetchImages);
watch(() => props.post.id, fetchImages);

// Lấy 3 ảnh đầu tiên, nếu không đủ thì dùng ảnh placeholder
const threeImages = computed(() => {
  const imgs = fetchedImages.value.slice(0, 3);
  while (imgs.length < 3) imgs.push(placeholders[imgs.length]);
  return imgs;
});

// Xử lý khi ảnh không tải được
function onImgError(event) {
  console.error("⚠️ Image failed to load:", event.target.src);
}

// Định dạng giá tiền (triệu/tháng hoặc đồng/tháng)
const formattedPrice = computed(() => {
  const price = props.post.accomodationDTO?.price;
  if (!price) return "Giá: Thoả thuận";
  return price >= 1000000
    ? `${(price / 1000000).toFixed(1)} triệu/tháng`
    : `${new Intl.NumberFormat("vi-VN").format(price)} đồng/tháng`;
});

// Tính thời gian đã đăng (phút, giờ, ngày, tuần, tháng, năm)
const postedAgo = computed(() => {
  if (!props.post.createAt) return "";
  const createTime = new Date(props.post.createAt).getTime();
  const diffMs = Date.now() - createTime;
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 60) {
    return `Đăng ${diffMinutes} phút trước`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `Đăng ${diffHours} giờ trước`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `Đăng ${diffDays} ngày trước`;
  }

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `Đăng ${diffWeeks} tuần trước`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `Đăng ${diffMonths} tháng trước`;
  }

  const diffYears = Math.floor(diffDays / 365);
  return `Đăng ${diffYears} năm trước`;
});

// Xử lý hiển thị avatar người dùng
const finalAvatar = computed(() => {
  const avatar = props.post.userDTO?.b64;
  return avatar
    ? avatar.startsWith("data:image")
      ? avatar
      : `data:image/png;base64,${avatar}`
    : null;
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}
</style>
