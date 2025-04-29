<template>
  <div
    class="bg-white rounded-lg shadow p-4 hover:scale-[1.03] hover:shadow-lg transition flex gap-4"
  >
    <div class="w-1/3 flex flex-col gap-2">
      <!-- Phần hiển thị ảnh chính -->
      <div class="w-full h-40 bg-gray-200 rounded overflow-hidden">
        <img
          :src="threeImages[0]"
          alt="preview"
          @error="onImgError"
          class="object-cover w-full h-full"
        />
      </div>
      <!-- Phần hiển thị 2 ảnh phụ -->
      <div class="flex gap-2 h-20">
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

    <div class="flex-1 flex flex-col py-5">
      <!-- Tiêu đề bài đăng -->
      <span class="text-lg font-bold text-gray-800 mb-1 text-left">{{
        post.title
      }}</span>
      <!-- Hiển thị giá và diện tích -->
      <div class="flex items-center text-red-500 mb-2 gap-3 text-left">
        <span class="font-bold text-lg">{{ formattedPrice }}</span>
        <div class="flex gap-1 text-gray-600 mt-1 ml-5">
          <AcreageIcon class="w-4 h-4 mt-1" />
          <span class="text-base"
            >{{ post.accomodationDTO?.acreage || "N/A" }}m²</span
          >
        </div>
      </div>
      <!-- Hiển thị địa chỉ và khu vực -->
      <div class="flex items-center gap-1 text-sm text-gray-600 mb-2 text-left">
        <MapPinIcon class="w-4 h-4 text-gray-600" />
        <span class="text-black">{{
          post.accomodationDTO?.address || "Địa chỉ không xác định"
        }}</span>
        <span class="mx-1">·</span>
        <span>{{ post.accomodationDTO?.district?.name || "Khu vực?" }}</span>
      </div>
      <!-- Nội dung bài đăng (giới hạn 2 dòng) -->
      <p
        class="line-clamp-2 text-sm text-gray-600 mb-2 leading-relaxed text-left flex-1"
      >
        {{ post.content }}
      </p>
      <!-- Phần footer hiển thị thông tin người đăng và liên hệ -->
      <div class="flex items-center justify-between mt-3">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            <img
              v-if="finalAvatar"
              :src="finalAvatar"
              alt="avatar"
              @error="onImgError"
              class="object-cover w-full h-full"
            />
          </div>
          <span class="text-sm font-medium text-gray-800">{{
            post.userDTO?.fullName || "Người dùng"
          }}</span>
        </div>
        <div class="flex items-center gap-4">
          <div
            class="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-full transition"
          >
            <PhoneIcon class="w-4 h-4 text-white" fill="currentColor" />
            <span class="text-sm font-medium">{{
              post.userDTO?.phone || "Số điện thoại?"
            }}</span>
          </div>
          <span class="text-xs text-gray-400">{{ postedAgo }}</span>
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

// Tính thời gian đã đăng (phút, giờ, ngày)
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
  return `Đăng ${diffDays} ngày trước`;
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}
</style>
