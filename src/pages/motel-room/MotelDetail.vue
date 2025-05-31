<template>
  <DefaultLayout>
    <!-- KHỐI BREADCRUMB TRÊN CÙNG -->
    <div
      class="pt-4 px-6"
      v-if="post"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <div class="text-sm text-gray-500 flex items-center flex-wrap space-x-1">
        <router-link to="/post/motel" class="text-teal-500 hover:underline">
          Cho thuê phòng trọ
        </router-link>
        <span>/</span>

        <span class="font-semibold">
          {{ post.title }}
        </span>
      </div>
    </div>
    <!-- HẾT KHỐI BREADCRUMB -->

    <!-- Bọc toàn bộ trang bằng flex để chia 2 cột trên desktop, 1 cột trên mobile -->
    <div class="flex min-h-screen flex-col lg:flex-row">
      <!-- CỘT TRÁI -->
      <div class="flex-1 p-4 bg-gray-100">
        <!-- GALLERY Ở ĐẦU TRANG -->
        <div class="bg-white rounded-xl p-4 text-4xl shadow-lg">
          <!-- Vùng ảnh chính, có mũi tên trái/phải -->
          <div
            v-if="galleryImages.length > 0"
            class="relative w-full h-64 sm:h-80 lg:h-96 bg-black text-white flex items-center justify-center mb-4 rounded-xl"
          >
            <button
              class="absolute left-0 px-2 sm:px-4 py-2 text-2xl sm:text-3xl z-10"
              @click="prevImage"
              :disabled="galleryImages.length === 0"
            >
              &lt;
            </button>

            <img
              :src="galleryImages[currentImageIndex]"
              alt="gallery image"
              class="max-w-full max-h-full object-contain"
            />

            <button
              class="absolute right-0 px-2 sm:px-4 py-2 text-2xl sm:text-3xl z-10"
              @click="nextImage"
              :disabled="galleryImages.length === 0"
            >
              &gt;
            </button>
          </div>
          <!-- Hàng thumbnail, cuộn ngang -->
          <div
            class="flex space-x-2 overflow-x-auto mb-6 items-center justify-center"
          >
            <div
              v-for="(img, index) in galleryImages"
              :key="index"
              @click="currentImageIndex = index"
              class="cursor-pointer flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden"
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

        <!-- Hiển thị thông báo lỗi nếu có -->
        <div v-if="errorMsg" class="text-red-600">{{ errorMsg }}</div>

        <!-- Hiển thị chi tiết bài đăng nếu có dữ liệu -->
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
                  <!-- Tiêu đề bài đăng -->
                  <span class="text-xl sm:text-2xl font-bold">{{
                    post.title
                  }}</span>
                </div>

                <!-- Địa chỉ -->
                <div
                  class="flex items-center text-sm text-gray-600 mb-2 flex-wrap"
                >
                  <MapPinIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                  <span class="text-black break-words">
                    {{ post.accomodationDTO?.address }}
                  </span>

                  <span class="mx-2 hidden sm:inline">·</span>

                  <span class="w-full sm:w-auto mt-1 sm:mt-0">
                    Khu vực:
                    {{ post.accomodationDTO?.district?.name }}
                  </span>
                </div>

                <!-- Hiển thị thông tin giá, diện tích, giá điện nước, ngày đăng -->
                <div
                  class="flex items-center justify-between flex-wrap gap-2 sm:gap-4 mb-4"
                >
                  <!-- Bên trái: Giá, diện tích, giá điện, giá nước -->
                  <div class="flex items-center flex-wrap gap-2 sm:gap-4">
                    <span class="text-red-500 text-lg sm:text-xl font-bold">
                      {{ formatPrice(post.accomodationDTO.price) }}
                    </span>

                    <div class="flex items-center">
                      <ScanIcon class="w-4 h-4 mr-1 mt-0.5" />
                      <span class="text-sm sm:text-base"
                        >{{ post.accomodationDTO.acreage }}m²</span
                      >
                    </div>

                    <div class="flex items-center">
                      <ZapIcon class="w-4 h-4 mr-1 mt-0.5" />
                      <span class="text-sm sm:text-base"
                        >{{
                          formatElectricWaterPrice(
                            post.accomodationDTO.electricPrice
                          )
                        }}
                        / số</span
                      >
                    </div>

                    <div class="flex items-center">
                      <DropletIcon class="w-4 h-4 mr-1 mt-0.5" />
                      <span class="text-sm sm:text-base"
                        >{{
                          formatElectricWaterPrice(
                            post.accomodationDTO.waterPrice
                          )
                        }}
                        / khối</span
                      >
                    </div>
                  </div>

                  <!-- Bên phải: Ngày đăng -->
                  <div
                    class="flex items-center text-sm w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    <span>Ngày đăng: {{ formatDate(post.createAt) }}</span>
                  </div>
                </div>
              </div>

              <hr class="my-3 mx-2 sm:mx-6 border-gray-100" />

              <!-- Thông tin chi tiết-->
              <div class="py-2">
                <span class="text-lg font-semibold">Thông tin chi tiết</span>
                <span class="block py-2 break-words text-sm sm:text-base">{{
                  post.content
                }}</span>
              </div>
              <hr class="my-3 mx-2 sm:mx-6 border-gray-100" />

              <!-- Đặc điểm -->
              <div class="py-2">
                <span class="text-lg font-semibold">Đặc điểm</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-2">
                  <div class="flex items-center">
                    <BedIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Nội thất:
                      {{
                        post.accomodationDTO.interior ? "Đầy đủ" : "Phòng trống"
                      }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <SnowflakeIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Điều hoà:
                      {{ post.accomodationDTO.airConditioner ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <UserIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Hình thức:
                      {{
                        post.accomodationDTO.owner
                          ? "Không Chung chủ"
                          : "Chung chủ"
                      }}
                    </span>
                  </div>

                  <div class="flex items-center">
                    <ThermometerIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Nóng lạnh:
                      {{ post.accomodationDTO.heater ? "Có" : "Không" }}
                    </span>
                  </div>

                  <div class="flex items-center">
                    <ShieldIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      An ninh:
                      {{ post.accomodationDTO.security ? "Tốt" : "Không tốt" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <WifiIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Internet:
                      {{ post.accomodationDTO.internet ? "Có" : "Không" }}
                    </span>
                  </div>

                  <div class="flex items-center">
                    <ClockIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Giờ giấc:
                      {{ post.accomodationDTO.time ? "Tự do" : "Không tự do" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <CoffeeIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Kệ bếp:
                      {{ post.accomodationDTO.kitchen ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <CarIcon class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Chỗ để xe:
                      {{ post.accomodationDTO.parking ? "Có" : "Không" }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <Toilet class="w-4 h-4 mr-1 flex-shrink-0" />
                    <span class="text-sm sm:text-base">
                      Vệ sinh:
                      {{ post.accomodationDTO.toilet ? "Khép kín" : "Chung" }}
                    </span>
                  </div>
                </div>
              </div>

              <hr class="my-3 mx-2 sm:mx-6 border-gray-100" />

              <!-- Bản đồ -->
              <div v-if="mapUrl" class="py-2">
                <span class="text-lg font-semibold">Vị trí & bản đồ</span>
                <div class="flex py-2">
                  <MapPin class="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
                  <span class="text-sm sm:text-base break-words">
                    Địa chỉ: {{ post.accomodationDTO.address }}
                  </span>
                </div>
                <div class="p-2">
                  <iframe
                    width="100%"
                    height="250"
                    class="sm:h-80 lg:h-96"
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
        <!-- Bình luận -->
        <div class="mt-4">
          <div v-if="post">
            <div class="mt-4 shadow-lg">
              <Comment v-if="post && post.id" :postId="post.id" />
            </div>
          </div>
        </div>
      </div>

      <!-- CỘT PHẢI: chỉ chứa khối thông tin người đăng -->
      <div class="w-full lg:w-80 p-4 bg-gray-100">
        <!-- Thông tin người đăng -->
        <div
          v-if="post && post.userDTO"
          class="rounded-md p-4 shadow-md text-center bg-white"
        >
          <!-- Ảnh đại diện -->
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-100"
          >
            <img
              v-if="finalAvatar"
              :src="finalAvatar"
              alt="avatar"
              class="object-cover w-full h-full"
            />
          </div>
          <!-- Tên + Trạng thái -->
          <span class="text-base sm:text-lg font-semibold block">
            {{ post.userDTO.fullName }}
          </span>
          <span class="text-xs flex items-center justify-center mb-2">
            <span
              class="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"
            ></span>
            Đang hoạt động
          </span>
          <div class="flex pt-2 items-center justify-center">
            <MapPin class="w-4 h-4 mr-1 flex-shrink-0" />
            <span class="text-sm text-gray-500 break-words">
              {{ post.userDTO.address }}
            </span>
          </div>
          <div class="flex pb-3 items-center justify-center">
            <Mail class="w-4 h-4 mr-1 flex-shrink-0" />
            <span class="text-sm text-gray-500 break-words">
              {{ post.userDTO.email }}
            </span>
          </div>
          <!-- Nút gọi điện -->
          <div class="text-white pt-2">
            <button
              class="bg-teal-500 w-full py-2 sm:py-3 rounded-xl mt-4 flex items-center justify-center text-sm sm:text-base"
            >
              <Phone class="w-4 h-4 sm:w-5 sm:h-6 mr-1.5" fill="currentColor" />
              <span class="font-medium">{{ post.userDTO.phone }}</span>
            </button>
          </div>
          <!-- Nút zalo -->
          <div class="text-white">
            <a
              :href="`https://zalo.me/${post.userDTO.phone}`"
              target="_blank"
              class="bg-blue-500 w-full py-2 sm:py-3 rounded-xl mt-2 flex items-center justify-center text-sm sm:text-base"
            >
              <img
                src="@/assets/zalo-icon.svg"
                alt="Zalo Icon"
                class="w-5 h-5 sm:w-6 sm:h-6 mr-1.5"
              />
              <span class="font-medium">Nhắn Zalo</span>
            </a>
          </div>
        </div>
        <!-- Nút thao tác chỉ hiển thị khi người đăng trùng với người xem -->
        <div class="py-4 sm:py-8">
          <div v-if="isOwner" class="p-4 bg-white rounded-xl shadow-xl">
            <div class="text-center">
              <span class="font-semibold text-base sm:text-lg">Thao tác</span>
            </div>
            <div class="pt-4">
              <div
                class="w-full py-2 rounded-xl flex items-center justify-center font-medium bg-sky-100 text-sm sm:text-base"
              >
                <span class="font-normal">Trạng thái:&nbsp;</span>
                <span
                  :class="{
                    'text-green-500': displayStatus === 'Đã duyệt',
                    'text-yellow-500': displayStatus === 'Chờ duyệt',
                    'text-red-500': displayStatus === 'Bị khóa',
                  }"
                >
                  {{ displayStatus }}
                </span>
              </div>
            </div>
            <div class="py-2">
              <router-link
                :to="`/update-post/${post.id}`"
                class="bg-yellow-500 hover:bg-yellow-600 w-full py-2 sm:py-3 rounded-xl flex items-center justify-center text-white text-sm sm:text-base"
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
                class="w-full py-2 sm:py-3 rounded-xl mt-2 flex items-center justify-center text-white text-sm sm:text-base"
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
import { Phone, MapPin, Mail, Toilet } from "lucide-vue-next";
import {
  MapPin as MapPinIcon,
  Scan as ScanIcon,
  Zap as ZapIcon,
  Droplet as DropletIcon,
  Bed as BedIcon,
  Snowflake as SnowflakeIcon,
  Wifi as WifiIcon,
  User as UserIcon,
  Shield as ShieldIcon,
  Coffee as CoffeeIcon,
  Thermometer as ThermometerIcon,
  Clock as ClockIcon,
  Car as CarIcon,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const post = ref(null);
const errorMsg = ref("");
const currentUser = ref(null);

// Hàm định dạng ngày thành chuỗi
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

// Hàm định dạng giá điện nước theo VND
function formatElectricWaterPrice(price) {
  if (!price) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// Tạo URL Google Maps từ địa chỉ
const mapUrl = computed(() => {
  if (!post.value?.accomodationDTO?.address) return "";
  const encodedAddress = encodeURIComponent(post.value.accomodationDTO.address);
  return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
});

const displayStatus = computed(() => {
  if (!post.value) return "";

  if (post.value.approved === true && post.value.notApproved === false) {
    return "Đã duyệt";
  } else if (post.value.approved === true && post.value.notApproved === true) {
    return "Chờ duyệt";
  } else if (post.value.approved === false) {
    return "Bị khóa";
  }
  return "";
});

// Xử lý avatar người dùng
const finalAvatar = computed(() => {
  const avatar = post.value?.userDTO?.b64;
  if (avatar) {
    return avatar.startsWith("data:image")
      ? avatar
      : "data:image/png;base64," + avatar;
  }
  return null;
});

// Xử lý gallery ảnh
const galleryImages = ref([]);
const currentImageIndex = ref(0);

// Định dạng giá phòng (triệu/tháng hoặc đồng/tháng)
function formatPrice(price) {
  if (!price) return "";
  if (price >= 1000000) {
    const millionPrice = (price / 1000000).toFixed(1);
    return `${millionPrice} triệu/tháng`;
  } else {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price);
    return `${formattedPrice} đồng/tháng`;
  }
}

// Chuyển đến ảnh trước đó trong gallery
function prevImage() {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + galleryImages.value.length) %
    galleryImages.value.length;
}

// Chuyển đến ảnh tiếp theo trong gallery
function nextImage() {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % galleryImages.value.length;
}

// Lấy chi tiết bài đăng từ API
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

// Lấy danh sách ảnh của bài đăng
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

// Kiểm tra người xem có phải chủ bài đăng không
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

// Khởi tạo dữ liệu khi component được mount
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
