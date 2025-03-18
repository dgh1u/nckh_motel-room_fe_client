<template>
  <DefaultLayout>
    <!-- KHỐI BREADCRUMB TRÊN CÙNG -->
    <div class="pt-4 px-6" v-if="post">
      <div class="text-sm text-gray-500 flex items-center flex-wrap space-x-1">
        <router-link to="/post/roommate" class="text-teal-500 hover:underline">
          Tìm người ở ghép
        </router-link>
        <span>/</span>
        <span class="font-semibold">
          {{ post.title }}
        </span>
      </div>
    </div>
    <!-- HẾT KHỐI BREADCRUMB -->
    <!-- Bọc toàn bộ trang bằng flex để chia 2 cột -->
    <div class="flex min-h-screen">
      <!-- CỘT TRÁI -->
      <div class="flex-1 p-4 bg-gray-100">
        <!-- GALLERY Ở ĐẦU TRANG -->
        <div class="bg-white rounded-xl p-4 text-4xl">
          <div
            class="relative w-full h-96 bg-black text-white flex items-center justify-center mb-4 rounded-xl"
          >
            <button
              class="absolute left-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-3xl"
              @click="prevImage"
            >
              &lt;
            </button>
            <img
              :src="galleryImages[currentImageIndex]"
              alt="gallery image"
              class="max-h-full object-contain"
            />
            <button
              class="absolute right-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-3xl"
              @click="nextImage"
            >
              &gt;
            </button>
          </div>
          <!-- Hàng thumbnail -->
          <div
            class="flex space-x-2 overflow-x-auto mb-6 items-center justify-center"
          >
            <div
              v-for="(img, index) in galleryImages"
              :key="index"
              @click="currentImageIndex = index"
              class="cursor-pointer flex-shrink-0 w-20 h-20 border rounded"
              :class="{
                'border-blue-500': currentImageIndex === index,
                'border-gray-300': currentImageIndex !== index,
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
          <div class="bg-white rounded-xl p-4 text-left">
            <div>
              <div
                class="bg-gray-200 w-15 rounded-lg flex items-center justify-center"
              >
                <span class="text-sm">#{{ post.id }}</span>
              </div>
              <div class="py-2">
                <!-- Tiêu đề bài đăng -->
                <span class="text-2xl font-bold">{{ post.title }}</span>
              </div>
              <!-- Địa chỉ -->
              <div class="flex items-center text-sm text-gray-600 mb-2">
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
              <!-- (Giá, diện tích, giá điện, giá nước, ngày đăng) trên cùng 1 dòng -->
              <div
                class="flex items-center justify-between flex-wrap gap-4 mb-4"
              >
                <!-- Bên trái: Giá, diện tích, giá điện, giá nước -->
                <div class="flex items-center flex-wrap gap-4">
                  <!-- Giá (màu đỏ) -->
                  <span class="text-red-500 text-xl font-bold">
                    {{ formatPrice(post.accomodationDTO.price) }}
                  </span>
                  <!-- Diện tích -->
                  <div class="flex items-center ml-5">
                    <ScanIcon class="w-4 h-4 mr-1 mt-0.5" />
                    <span>{{ post.accomodationDTO.acreage }}m²</span>
                  </div>
                  <!-- Giá điện -->
                  <div class="flex items-center ml-5">
                    <ZapIcon class="w-4 h-4 mr-1 mt-0.5" />
                    <span>
                      {{
                        formatElectricWaterPrice(
                          post.accomodationDTO.electricPrice
                        )
                      }}/ số
                    </span>
                  </div>
                  <!-- Giá nước -->
                  <div class="flex items-center ml-5">
                    <DropletIcon class="w-4 h-4 mr-1 mt-0.5" />
                    <span>
                      {{
                        formatElectricWaterPrice(
                          post.accomodationDTO.waterPrice
                        )
                      }}/ khối
                    </span>
                  </div>
                </div>
                <!-- Bên phải: Ngày đăng -->
                <div class="flex items-center text-sm">
                  <span>Ngày đăng: {{ formatDate(post.createAt) }}</span>
                </div>
              </div>
            </div>

            <hr class="my-3 mx-6 border-gray-100" />

            <!-- GIỚI TÍNH -->
            <div class="py-2">
              <div class="flex items-center">
                <span class="text-lg font-semibold mr-6">Giới tính:</span>
                <!-- Sử dụng dynamic component để chọn icon phù hợp -->
                <component
                  :is="
                    post.gender === true
                      ? Mars
                      : post.gender === false
                      ? Venus
                      : VenusAndMars
                  "
                  class="w-4 h-4 mr-1"
                />
                <span>
                  {{
                    post.gender === true
                      ? "Nam"
                      : post.gender === false
                      ? "Nữ"
                      : "Không yêu cầu"
                  }}
                </span>
              </div>
            </div>

            <hr class="my-3 mx-6 border-gray-100" />

            <!-- Thông tin chi tiết-->
            <div class="py-2">
              <span class="text-lg font-semibold">Thông tin chi tiết</span>
              <span class="block py-2">{{ post.content }}</span>
            </div>
            <hr class="my-3 mx-6 border-gray-100" />
            <!-- Đặc điểm -->
            <div class="py-2">
              <span class="text-lg font-semibold">Đặc điểm</span>
              <div class="grid grid-cols-2 gap-4 p-2">
                <div class="flex items-center">
                  <BedIcon class="w-4 h-4 mr-1" />
                  <span>
                    Nội thất:
                    {{
                      post.accomodationDTO.interior ? "Đầy đủ" : "Phòng trống"
                    }}
                  </span>
                </div>
                <div class="flex items-center">
                  <SnowflakeIcon class="w-4 h-4 mr-1" />
                  <span>
                    Điều hoà:
                    {{ post.accomodationDTO.airConditioner ? "Có" : "Không" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <UserIcon class="w-4 h-4 mr-1" />
                  <span>
                    Hình thức:
                    {{
                      post.accomodationDTO.owner
                        ? "Chung chủ"
                        : "Không chung chủ"
                    }}
                  </span>
                </div>
                <div class="flex items-center">
                  <ThermometerIcon class="w-4 h-4 mr-1" />
                  <span>
                    Nóng lạnh:
                    {{ post.accomodationDTO.heater ? "Có" : "Không" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <ShieldIcon class="w-4 h-4 mr-1" />
                  <span>
                    An ninh:
                    {{ post.accomodationDTO.security ? "Tốt" : "Không tốt" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <WifiIcon class="w-4 h-4 mr-1" />
                  <span>
                    Internet:
                    {{ post.accomodationDTO.internet ? "Có" : "Không" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <ClockIcon class="w-4 h-4 mr-1" />
                  <span>
                    Giờ giấc:
                    {{ post.accomodationDTO.time ? "Tự do" : "Không tự do" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <CoffeeIcon class="w-4 h-4 mr-1" />
                  <span>
                    Kệ bếp:
                    {{ post.accomodationDTO.kitchen ? "Có" : "Không" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <CarIcon class="w-4 h-4 mr-1" />
                  <span>
                    Chỗ để xe:
                    {{ post.accomodationDTO.parking ? "Có" : "Không" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <Toilet class="w-4 h-4 mr-1" />
                  <span>
                    Vệ sinh:
                    {{ post.accomodationDTO.toilet ? "Khép kín" : "Chung" }}
                  </span>
                </div>
              </div>
            </div>

            <hr class="my-3 mx-6 border-gray-100" />

            <!-- Bản đồ -->
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
        <!-- Bình luận (nếu cần) -->
      </div>

      <!-- CỘT PHẢI: Thông tin người đăng -->
      <div class="w-80 p-4 bg-gray-100">
        <div
          v-if="post && post.userDTO"
          class="rounded-md p-4 shadow-md text-center bg-white"
        >
          <!-- Ảnh đại diện -->
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
          <!-- Tên + Trạng thái -->
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
          <!-- Nút gọi điện -->
          <div class="text-white">
            <button
              class="bg-teal-500 w-full py-2 rounded-xl mt-4 flex items-center justify-center"
            >
              <Phone class="w-6 h-6 mr-1.5" />
              <span class="font-medium">{{ post.userDTO.phone }}</span>
            </button>
          </div>
          <!-- Nút zalo -->
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
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import { getDetailPost } from "@/apis/postService.js";
import { Phone, MessageCircle, MapPin, Mail, Toilet } from "lucide-vue-next";
import {
  MapPin as MapPinIcon,
  Scan as ScanIcon,
  Zap as ZapIcon,
  Droplet as DropletIcon,
  Calendar as CalendarIcon,
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
// Import các icon để hiển thị theo giới tính
import { VenusAndMars, Mars, Venus } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const post = ref(null);
const errorMsg = ref("");

// Hàm định dạng ngày
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

// Hàm định dạng giá tiền theo VND
function formatElectricWaterPrice(price) {
  if (!price) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// Tạo URL Google Maps (không dùng API Key)
const mapUrl = computed(() => {
  if (!post.value?.accomodationDTO?.address) return "";
  const encodedAddress = encodeURIComponent(post.value.accomodationDTO.address);
  return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
});

// Xử lý avatar
const finalAvatar = computed(() => {
  const avatar = post.value?.userDTO?.b64;
  if (avatar) {
    return avatar.startsWith("data:image")
      ? avatar
      : "data:image/png;base64," + avatar;
  }
  return null;
});

// ====================== GALLERY CODE ======================
const galleryImages = ref([
  "https://via.placeholder.com/600x400?text=Demo+1",
  "https://via.placeholder.com/600x400?text=Demo+2",
  "https://via.placeholder.com/600x400?text=Demo+3",
  "https://via.placeholder.com/600x400?text=Demo+4",
  "https://via.placeholder.com/600x400?text=Demo+5",
]);

const currentImageIndex = ref(0);

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

function prevImage() {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + galleryImages.value.length) %
    galleryImages.value.length;
}

function nextImage() {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % galleryImages.value.length;
}
// ====================== END GALLERY CODE ======================

async function fetchPost() {
  const id = route.params.id;
  try {
    const response = await getDetailPost(id);
    const result = response.data;
    if (result && result.id) {
      post.value = result;
    } else {
      errorMsg.value = "Lỗi: Không thể tải bài đăng";
    }
  } catch (error) {
    errorMsg.value = "Có lỗi xảy ra khi tải thông tin tin đăng.";
  }
}

onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
/* Tuỳ chỉnh style nếu cần */
</style>
