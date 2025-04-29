<template>
  <DefaultLayout>
    <!-- Breadcrumb định hướng -->
    <div
      class="pt-4 px-6"
      v-if="post"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <div class="text-sm text-gray-500 flex items-center flex-wrap space-x-1">
        <router-link to="/post/beverage" class="text-teal-500 hover:underline">
          Quán nước
        </router-link>
        <span>/</span>
        <span class="font-semibold">
          {{ post.title }}
        </span>
      </div>
    </div>

    <!-- Bố cục trang 2 cột -->
    <div class="flex min-h-screen">
      <!-- Cột trái (nội dung chính) -->
      <div class="flex-1 p-4 bg-gray-100">
        <!-- Thư viện ảnh -->
        <div class="bg-white rounded-xl p-4 text-4xl shadow-lg">
          <div
            v-if="galleryImages.length > 0"
            class="relative w-full h-96 bg-black text-white flex items-center justify-center mb-4 rounded-xl"
          >
            <button
              class="absolute left-0 px-4 py-2 text-3xl"
              @click="prevImage"
              :disabled="galleryImages.length === 0"
            >
              &lt;
            </button>

            <img
              :src="galleryImages[currentImageIndex]"
              alt="gallery image"
              class="max-w-3xl max-h-full object-contain"
            />

            <button
              class="absolute right-0 px-4 py-2 text-3xl"
              @click="nextImage"
              :disabled="galleryImages.length === 0"
            >
              &gt;
            </button>
          </div>
          <!-- Các hình thu nhỏ -->
          <div
            class="flex space-x-2 overflow-x-auto mb-6 items-center justify-center"
          >
            <div
              v-for="(img, index) in galleryImages"
              :key="index"
              @click="currentImageIndex = index"
              class="cursor-pointer flex-shrink-0 w-20 h-20 rounded overflow-hidden"
              :class="{
                'border-3 border-red-500': currentImageIndex === index,
                'border border-gray-300': currentImageIndex !== index,
              }"
            >
              <img
                :src="img"
                alt="Thumbnail"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Hiển thị thông báo lỗi -->
        <div v-if="errorMsg" class="text-red-600">{{ errorMsg }}</div>

        <!-- Chi tiết bài đăng -->
        <div v-else-if="post" class="pt-4">
          <div class="bg-white rounded-xl p-4 text-left shadow-lg">
            <div>
              <div>
                <div
                  class="bg-gray-200 w-15 rounded-lg flex items-center justify-center"
                >
                  <span class="text-sm">#{{ post.id }}</span>
                </div>
                <div class="py-2">
                  <span class="text-2xl font-bold">{{ post.title }}</span>
                </div>

                <!-- Địa chỉ và thông tin khu vực -->
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <div class="flex items-center">
                    <MapPinIcon class="w-4 h-4 mr-1" />
                    <span class="text-black">
                      {{ post.accomodationDTO?.address }}
                    </span>
                    <span class="mx-2">·</span>
                    <span>
                      Khu vực:
                      {{ post.accomodationDTO?.district?.name }}
                    </span>
                  </div>
                  <div class="flex text-sm">
                    <Tag class="w-3 h-4 mr-1 mt-1" />
                    <span
                      ><span class="text-black">Phân loại: </span>
                      {{ post.accomodationDTO?.secondMotel }}</span
                    >
                  </div>
                </div>

                <div
                  class="flex items-center justify-between flex-wrap gap-4 mb-4"
                >
                  <div class="flex items-center flex-wrap gap-4">
                    <div class="flex items-center">
                      <Clock class="w-4 h-4 mr-1 mt-0.5" />
                      <span
                        >Giờ mở cửa:<span class="ml-2 text-gray-600">
                          {{ post.accomodationDTO.openHours }}</span
                        ></span
                      >
                    </div>
                  </div>

                  <!-- Thông tin ngày đăng -->
                  <div class="flex items-center text-sm">
                    <span>Ngày đăng: {{ formatDate(post.createAt) }}</span>
                  </div>
                </div>
              </div>

              <hr class="my-3 mx-6 border-gray-100" />

              <!-- Nội dung chi tiết -->
              <div class="py-2">
                <span class="text-lg font-semibold">Thông tin chi tiết</span>
                <span class="block py-2 break-words">{{ post.content }}</span>
              </div>
              <hr class="my-3 mx-6 border-gray-100" />

              <!-- Các đặc điểm của quán -->
              <div class="py-2">
                <span class="text-lg font-semibold">Đặc điểm</span>
                <div class="grid grid-cols-2 gap-4 p-2">
                  <div class="flex items-center">
                    <SnowflakeIcon class="w-4 h-4 mr-1" />
                    <span>
                      Điều hoà:
                      {{ post.accomodationDTO.airConditioner ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <Truck class="w-4 h-4 mr-1" />
                    <span>
                      Giao hàng :
                      {{ post.accomodationDTO.delivery ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <WifiIcon class="w-4 h-4 mr-1" />
                    <span>
                      Wifi miễn phí:
                      {{ post.accomodationDTO.internet ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <UtensilsCrossed class="w-4 h-4 mr-1" />
                    <span>
                      Phục vụ tại chỗ:
                      {{ post.accomodationDTO.dineIn ? "Có" : "Không" }}
                    </span>
                  </div>

                  <div class="flex items-center">
                    <CircleParking class="w-4 h-4 mr-1" />
                    <span>
                      Chỗ để xe:
                      {{ post.accomodationDTO.parking ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <ShoppingBag class="w-4 h-4 mr-1" />
                    <span>
                      Mua mang đi:
                      {{ post.accomodationDTO.takeAway ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <Expand class="w-4 h-4 mr-1" />
                    <span>
                      Không gian:
                      {{
                        post.accomodationDTO.bigSpace
                          ? "Rộng rãi"
                          : "Bình thường"
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <hr class="my-3 mx-6 border-gray-100" />

              <!-- Hiển thị bản đồ -->
              <div v-if="mapUrl" class="py-2">
                <span class="text-lg font-semibold">Vị trí & bản đồ</span>
                <div class="flex py-2">
                  <MapPin class="w-4 h-4 mt-0.5 mr-1" />
                  <span> Địa chỉ: {{ post.accomodationDTO.address }} </span>
                </div>
                <div class="p-2">
                  <iframe
                    width="100%"
                    height="400"
                    style="border: 0"
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="mapUrl"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Phần bình luận -->
        <div class="mt-4">
          <div v-if="post">
            <div class="mt-4 shadow-lg">
              <Comment v-if="post && post.id" :postId="post.id" />
            </div>
          </div>
        </div>
      </div>

      <!-- Cột phải (thông tin người đăng) -->
      <div class="w-80 p-4 bg-gray-100">
        <!-- Thông tin người đăng -->
        <div
          v-if="post && post.userDTO"
          class="rounded-md p-4 shadow-md text-center bg-white"
        >
          <!-- Avatar -->
          <div
            class="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100"
          >
            <img
              v-if="finalAvatar"
              :src="finalAvatar"
              alt="avatar"
              class="object-cover w-full h-full"
            />
          </div>
          <!-- Thông tin cá nhân -->
          <span class="text-lg font-semibold">
            {{ post.userDTO.fullName }}
          </span>
          <span class="text-xs flex items-center justify-center">
            <span
              class="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"
            ></span>
            Đang hoạt động
          </span>
          <div class="flex pt-2 items-center justify-center">
            <MapPin class="w-4 h-4 mr-2" />
            <span class="text-sm text-gray-500">
              {{ post.userDTO.address }}
            </span>
          </div>
          <div class="flex pb-3 items-center justify-center">
            <Mail class="w-4 h-4 mr-2" />
            <span class="text-sm text-gray-500">
              {{ post.userDTO.email }}
            </span>
          </div>
          <!-- Các nút liên hệ -->
          <div class="text-white">
            <button
              class="bg-teal-500 w-full py-2 rounded-xl mt-4 flex items-center justify-center"
            >
              <Phone class="w-5 h-6 mr-1.5" fill="currentColor" />
              <span class="font-medium">{{ post.userDTO.phone }}</span>
            </button>
          </div>
          <!-- Liên kết Zalo -->
          <div class="text-white">
            <a
              :href="`https://zalo.me/${post.userDTO.phone}`"
              target="_blank"
              class="bg-blue-500 w-full py-2 rounded-xl mt-2 flex items-center justify-center"
            >
              <img
                src="@/assets/zalo-icon.svg"
                alt="Zalo Icon"
                class="w-6 h-6 mr-1.5"
              />
              <span class="font-medium">Nhắn Zalo</span>
            </a>
          </div>

          <!-- Liên kết ShopeeFood (nếu có) -->
          <div
            v-if="
              post.accomodationDTO.linkShopeeFood &&
              post.accomodationDTO.linkShopeeFood.trim() !== ''
            "
            class="text-white"
          >
            <a
              :href="`${post.accomodationDTO.linkShopeeFood}`"
              target="_blank"
              class="bg-orange-200 w-full py-2 rounded-xl mt-2 flex items-center justify-center"
            >
              <img
                src="@/assets/shopee-food-logo.svg"
                alt="Shopee Food Logo"
                class="w-25"
              />
            </a>
          </div>
        </div>
        <!-- Các nút thao tác dành cho chủ bài đăng -->
        <div class="py-8">
          <div v-if="isOwner" class="p-4 bg-white rounded-xl shadow-xl">
            <div class="text-center">
              <span class="font-semibold text-lg">Thao tác</span>
            </div>
            <div class="py-4">
              <router-link
                :to="`/update-post/${post.id}`"
                class="bg-yellow-500 hover:bg-yellow-600 w-full py-2 rounded-xl mt-2 flex items-center justify-center text-white"
              >
                <span class="font-medium">Cập nhật</span>
              </router-link>
            </div>
            <div class="text-white">
              <button
                @click="toggleHidePost"
                :class="
                  post.del === false
                    ? 'bg-red-400 hover:bg-red-500'
                    : 'bg-green-400 hover:bg-green-500'
                "
                class="w-full py-2 rounded-xl mt-2 flex items-center justify-center text-white"
              >
                <span class="font-medium">
                  {{ post.del === false ? "Ẩn tin đăng" : "Hiện tin đăng" }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Comment from "../../components/comment/Comment.vue";
import { getDetailPost, hidePost } from "@/apis/postService.js";
import { getImageByPost } from "@/apis/imageService.js";
import { useAuthStore } from "@/stores/store";

import { getProfile } from "@/apis/authService.js";
import { message } from "ant-design-vue";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  CircleParking,
  Truck,
  UtensilsCrossed,
  ShoppingBag,
  Expand,
  Tag,
} from "lucide-vue-next";
import {
  MapPin as MapPinIcon,
  Snowflake as SnowflakeIcon,
  Wifi as WifiIcon,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const post = ref(null);
const errorMsg = ref("");
const currentUser = ref(null);

// Định dạng ngày tháng
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

// Tạo URL Google Maps
const mapUrl = computed(() => {
  if (!post.value?.accomodationDTO?.address) return "";
  const encodedAddress = encodeURIComponent(post.value.accomodationDTO.address);
  return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
});

// Xử lý hiển thị avatar
const finalAvatar = computed(() => {
  const avatar = post.value?.userDTO?.b64;
  if (avatar) {
    return avatar.startsWith("data:image")
      ? avatar
      : "data:image/png;base64," + avatar;
  }
  return null;
});

// Quản lý thư viện ảnh
const galleryImages = ref([]);
const currentImageIndex = ref(0);

// Điều hướng ảnh
function prevImage() {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + galleryImages.value.length) %
    galleryImages.value.length;
}

function nextImage() {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % galleryImages.value.length;
}

// Lấy thông tin chi tiết bài đăng
async function fetchPost() {
  const id = route.params.id;
  try {
    const { data: result } = await getDetailPost(id);
    post.value = result;
    await loadGalleryImages(result.id);
  } catch (error) {
    errorMsg.value = "Có lỗi khi tải bài đăng";
  }
}

// Tải các hình ảnh của bài đăng
async function loadGalleryImages(postId) {
  try {
    const urls = await getImageByPost(postId);
    galleryImages.value = Array.isArray(urls) ? urls : [];
    currentImageIndex.value = 0;
  } catch (err) {
    // Xử lý lỗi khi tải ảnh
  }
}

// Lấy thông tin người dùng hiện tại
async function fetchProfile() {
  try {
    const response = await getProfile();
    currentUser.value = response.data;
  } catch (error) {
    // Xử lý lỗi khi tải thông tin người dùng
  }
}

// Kiểm tra người xem có phải là chủ bài đăng
const isOwner = computed(() => {
  return (
    currentUser.value &&
    post.value &&
    post.value.userDTO &&
    currentUser.value.id === post.value.userDTO.id
  );
});

// Xử lý ẩn/hiện bài đăng
async function toggleHidePost() {
  try {
    const response = await hidePost(post.value.id);
    message.success(response.data.message);
    post.value.del = post.value.del === false ? true : false;
  } catch (error) {
    message.error("Có lỗi xảy ra khi ẩn/hiện tin đăng");
  }
}

onMounted(() => {
  fetchPost();

  const authStore = useAuthStore();
  if (authStore.isAuthenticated && authStore.token?.trim() !== "") {
    fetchProfile();
  }
});
</script>

<style scoped>
.break-words {
  word-break: break-word;
}
</style>
