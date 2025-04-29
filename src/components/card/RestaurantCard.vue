<template>
  <div
    class="rounded-lg p-4 hover:scale-[1.03] hover:shadow-lg hover:bg-white transition flex flex-col w-full"
  >
    <div class="w-full flex flex-col gap-2">
      <div class="w-full h-60 bg-gray-200 rounded-2xl overflow-hidden">
        <img
          :src="thumbnailImage"
          alt="preview"
          @error="onImgError"
          class="object-cover w-full h-full"
        />
      </div>
    </div>

    <div class="flex-1 flex flex-col py-3">
      <!-- Hiển thị tiêu đề bài đăng -->
      <span
        class="line-clamp-1 text-lg font-bold text-gray-800 mb-1 text-left"
        >{{ post.title }}</span
      >
      <div class="flex items-center text-red-500 mb-2 gap-3 text-left">
        <!-- Hiển thị giờ mở cửa -->
        <div class="flex gap-1 text-gray-600 mt-1">
          <Clock class="w-4 h-4 mt-1" />
          <span class="text-sm">{{
            post.accomodationDTO?.openHours || "N/A"
          }}</span>
        </div>
        <!-- Hiển thị loại nhà trọ -->
        <div class="flex gap-1 text-gray-600 mt-1 ml-5">
          <Tag class="w-4 h-4 mt-1" />
          <span class="text-sm">{{ post.accomodationDTO?.secondMotel }}</span>
        </div>
        <!-- Hiển thị trạng thái giao hàng -->
        <div
          v-if="post.accomodationDTO?.delivery === true"
          class="flex gap-1 text-gray-600 mt-1 ml-5"
        >
          <Truck class="w-4 h-4 mt-1" />
          <span class="text-sm">Có ship</span>
        </div>
      </div>
      <!-- Hiển thị thông tin địa chỉ -->
      <div class="flex items-center gap-1 text-sm text-gray-600 mb-2 text-left">
        <MapPinIcon class="w-4 h-4 text-gray-600" />
        <span
          class="text-black max-w-[55%] truncate"
          title="{{ post.accomodationDTO?.address || 'Địa chỉ không xác định' }}"
          >{{ post.accomodationDTO?.address || "Địa chỉ không xác định" }}</span
        >
        <span class="mx-1">·</span>
        <span>{{ post.accomodationDTO?.district?.name || "Khu vực?" }}</span>
      </div>
      <!-- Các nút liên hệ và liên kết -->
      <div class="flex items-center justify-between mt-3 ml-auto gap-3">
        <!-- Nút liên kết đến ShopeeFood nếu có -->
        <div
          v-if="
            post.accomodationDTO.linkShopeeFood &&
            post.accomodationDTO.linkShopeeFood.trim() !== ''
          "
        >
          <a
            :href="`${post.accomodationDTO.linkShopeeFood}`"
            target="_blank"
            class="flex ml-20 items-center gap-2 bg-orange-200 hover:bg-orange-300 text-white px-4 py-2 rounded-full transition"
          >
            <img
              src="@/assets/shopee-food-logo.svg"
              alt="Zalo Icon"
              class="w-20"
            />
          </a>
        </div>
        <!-- Nút liên hệ điện thoại -->
        <div class="flex items-center gap-2 ml-auto">
          <div
            class="flex gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-full transition"
          >
            <PhoneIcon class="w-4 h-4 mt-0.5 text-white" fill="currentColor" />
            <span class="text-sm font-medium">{{
              post.userDTO?.phone || "Số điện thoại?"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted, watch } from "vue";
import {
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Clock,
  Truck,
  Tag,
} from "lucide-vue-next";
import { getImageByPost } from "@/apis/imageService";

const props = defineProps({ post: { type: Object, required: true } });
const placeholder =
  "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image";
const fetchedImages = ref([]);

// Lấy danh sách hình ảnh của bài đăng
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

// Lấy hình ảnh đầu tiên làm thumbnail hoặc sử dụng ảnh placeholder
const thumbnailImage = computed(() => {
  return fetchedImages.value.length > 0 ? fetchedImages.value[0] : placeholder;
});

// Xử lý lỗi khi không tải được hình ảnh
function onImgError(event) {
  console.error("⚠️ Image failed to load:", event.target.src);
}
</script>

<style scoped>
/* Giới hạn nội dung text chỉ hiển thị 1 dòng */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}
</style>
