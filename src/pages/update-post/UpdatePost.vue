<template>
  <DefaultLayout>
    <div class="create-post max-w-3xl mx-auto p-4 space-y-4">
      <!-- Tiêu đề trang -->
      <div class="block p-4 items-center justify-center flex">
        <span class="font-bold text-3xl text-teal-500">Cập nhật tin đăng</span>
      </div>

      <!-- PHẦN HÌNH THỨC -->
      <div class="block bg-white p-4 pb-6 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Hình thức</span>
        </div>
        <label>Loại hình <span class="text-red-500">*</span></label>
        <div class="flex rounded-lg mt-1">
          <a-select
            v-model:value="formData.accomodation.motel"
            placeholder="Chọn hình thức"
            class="w-full"
          >
            <a-select-option value="PHONG_TRO">Tìm phòng trọ</a-select-option>
            <a-select-option value="O_GHEP">Tìm người ở ghép</a-select-option>
            <a-select-option value="QUAN_AN">Quán ăn</a-select-option>
            <a-select-option value="QUAN_NUOC">Quán nước</a-select-option>
            <a-select-option value="CUA_HANG">Cửa hàng</a-select-option>
            <a-select-option value="TIEN_ICH">Tiện ích</a-select-option>
          </a-select>
        </div>
        <!-- Selection phụ cho QUAN_AN -->
        <div v-if="formData.accomodation.motel === 'QUAN_AN'" class="mt-3">
          <label>Loại quán ăn <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại quán ăn"
              class="w-full"
            >
              <a-select-option value="Cơm">Cơm</a-select-option>
              <a-select-option value="Món nước">Món nước</a-select-option>
              <a-select-option value="Xôi và Bánh mì"
                >Xôi và Bánh mì</a-select-option
              >
              <a-select-option value="Cháo">Cháo</a-select-option>
              <a-select-option value="Ăn vặt">Ăn vặt</a-select-option>
              <a-select-option value="Đồ ăn nhanh">Đồ ăn nhanh</a-select-option>
              <a-select-option value="Quán nhậu">Quán nhậu</a-select-option>
            </a-select>
          </div>
        </div>

        <!-- Selection phụ cho QUán nước -->
        <div v-if="formData.accomodation.motel === 'QUAN_NUOC'" class="mt-3">
          <label>Loại quán nước <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại quán nước"
              class="w-full"
            >
              <a-select-option value="Quán Cà phê">Quán Cà phê</a-select-option>
              <a-select-option value="Quán Trà chanh"
                >Quán Trà chanh</a-select-option
              >
              <a-select-option value="Trà đá vỉa hè"
                >Trà đá vỉa hè</a-select-option
              >
              <a-select-option value="Quán Trà sữa"
                >Quán Trà sữa</a-select-option
              >
            </a-select>
          </div>
        </div>

        <!-- Selection phụ cho CUA_HANG -->
        <div v-if="formData.accomodation.motel === 'CUA_HANG'" class="mt-3">
          <label>Loại cửa hàng <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại cửa hàng"
              class="w-full"
            >
              <a-select-option value="Tạp hóa">Tạp hóa</a-select-option>
              <a-select-option value="Cửa hàng tiện lợi"
                >Cửa hàng tiện lợi</a-select-option
              >
              <a-select-option value="Văn phòng phẩm"
                >Văn phòng phẩm</a-select-option
              >
              <a-select-option value="Điện lạnh">Điện lạnh</a-select-option>
              <a-select-option value="Gia dụng">Gia dụng</a-select-option>
              <a-select-option value="Hiệu thuốc">Hiệu thuốc</a-select-option>
              <a-select-option value="Quần áo">Quần áo</a-select-option>
              <a-select-option value="Hiệu sách">Hiệu sách</a-select-option>
              <a-select-option value="Điện thoại">Điện thoại</a-select-option>
              <a-select-option value="Máy tính">Máy tính</a-select-option>
              <a-select-option value="Đồng hồ">Đồng hồ</a-select-option>
              <a-select-option value="Kính mắt">Kính mắt</a-select-option>
            </a-select>
          </div>
        </div>

        <!-- Selection phụ cho Tiện ích -->
        <div v-if="formData.accomodation.motel === 'TIEN_ICH'" class="mt-3">
          <label>Loại Tiện ích <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại Tiện ích"
              class="w-full"
            >
              <a-select-option value="Photocopy">Photocopy</a-select-option>
              <a-select-option value="Giặt là">Giặt là</a-select-option>
              <a-select-option value="Học ngoại ngữ"
                >Học ngoại ngữ</a-select-option
              >
              <a-select-option value="Chụp ảnh">Chụp ảnh</a-select-option>
            </a-select>
          </div>
        </div>
      </div>

      <!-- PHẦN GIỚI TÍNH (nếu O_GHEP) -->
      <div
        v-if="formData.accomodation.motel === 'O_GHEP'"
        class="block bg-white p-4 rounded-xl"
      >
        <div class="py-2">
          <span class="font-bold text-base">Giới tính</span>
        </div>
        <label>Giới tính yêu cầu</label>
        <div class="flex rounded-lg mt-1">
          <a-select
            v-model:value="formData.accomodation.gender"
            placeholder="Chọn giới tính"
            class="w-full"
          >
            <a-select-option :value="true">Nam</a-select-option>
            <a-select-option :value="false">Nữ</a-select-option>
            <a-select-option :value="null">Không yêu cầu</a-select-option>
          </a-select>
        </div>
      </div>

      <!-- PHẦN THÔNG TIN MÔ TẢ -->
      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Thông tin mô tả</span>
        </div>
        <div class="py-2">
          <label>Tiêu đề <span class="text-red-500">*</span></label>
          <div class="flex border border-gray-300 rounded-lg mt-1">
            <input
              v-model="formData.title"
              type="text"
              placeholder="Nhập tiêu đề"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
          </div>
        </div>
        <div class="py-2">
          <span class="block">
            Nội dung mô tả <span class="text-red-500">*</span>
          </span>
          <div class="flex border border-gray-300 rounded-lg mt-1">
            <textarea
              v-model="formData.content"
              placeholder="Nhập nội dung mô tả"
              rows="4"
              class="w-full p-2 mt-1 border-none outline-none rounded-lg"
            />
          </div>
        </div>
        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label>Giá cho thuê <span class="text-red-500">*</span></label>
          <div class="flex border border-gray-300 rounded-lg mt-1 w-120">
            <input
              v-model.number="formData.accomodation.price"
              type="number"
              placeholder="VD: 1000000 (cho 1 triệu)"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">đồng/tháng</span>
          </div>
          <small class="text-gray-500">
            Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
          </small>
        </div>
        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label class="block text-gray-700">
            Diện tích <span class="text-red-500">*</span>
          </label>
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
          >
            <input
              v-model.number="formData.accomodation.acreage"
              type="number"
              placeholder="Nhập diện tích"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">m²</span>
          </div>
        </div>
        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label class="block text-gray-700">
            Giá điện <span class="text-red-500">*</span>
          </label>
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
          >
            <input
              v-model.number="formData.accomodation.electricPrice"
              type="number"
              placeholder="VD: 3500"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">đồng/kWh</span>
          </div>
        </div>
        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label class="block text-gray-700">
            Giá nước <span class="text-red-500">*</span>
          </label>
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
          >
            <input
              v-model.number="formData.accomodation.waterPrice"
              type="number"
              placeholder="VD: 30000"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">đồng/m³</span>
          </div>
        </div>
        <div
          v-if="
            formData.accomodation.motel === 'QUAN_AN' ||
            formData.accomodation.motel === 'QUAN_NUOC' ||
            formData.accomodation.motel === 'CUA_HANG' ||
            formData.accomodation.motel === 'TIEN_ICH'
          "
          class="py-2"
        >
          <label class="block text-gray-700"
            >Giờ mở cửa <span class="text-red-500">*</span></label
          >
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-36"
          >
            <a-time-range-picker
              v-model:value="openHoursValue"
              type="number"
              format="HH:mm"
              placeholder="Nhập giờ mở cửa"
              class="w-full border-none outline-none rounded-lg"
              @change="handleTimeChange"
            />
          </div>
        </div>

        <div
          v-if="
            formData.accomodation.motel === 'QUAN_AN' ||
            formData.accomodation.motel === 'QUAN_NUOC'
          "
          class="py-2"
        >
          <label class="block text-gray-700"
            >Link ShopeeFood <span class="text-red-500">*</span></label
          >
          <div class="flex items-center border border-gray-300 rounded-lg mt-1">
            <input
              v-model.number="formData.accomodation.linkShopeeFood"
              type="text"
              placeholder="Nhập link ShopeeFood (nếu có)"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
          </div>
        </div>
      </div>

      <!-- PHẦN KHU VỰC -->
      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Khu vực</span>
        </div>
        <div class="py-2">
          <label>Khu vực <span class="text-red-500">*</span></label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.idDistrict"
              placeholder="Chọn khu vực"
              class="w-full"
            >
              <a-select-option
                v-for="district in districtList"
                :key="district.id"
                :value="district.id"
              >
                {{ district.name }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="py-2">
          <label class="block text-gray-700">
            Địa chỉ <span class="text-red-500">*</span>
          </label>
          <div class="flex items-center rounded-lg mt-1 w-120">
            <input
              v-model="formData.accomodation.address"
              type="text"
              placeholder="VD: Số 12, Ngõ 34..."
              class="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div class="map-wrapper py-2">
          <label class="block text-gray-700">Bản đồ</label>
          <div class="flex items-center border border-gray-300 rounded-lg mt-1">
            <iframe
              width="100%"
              height="300"
              class="border-0"
              :src="`https://www.google.com/maps?q=${encodeURIComponent(
                displayMapAddress
              )}&output=embed`"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- PHẦN ĐẶC ĐIỂM NỔI BẬT -->
      <div
        v-if="
          formData.accomodation.motel === 'PHONG_TRO' ||
          formData.accomodation.motel === 'O_GHEP'
        "
        class="block bg-white p-4 rounded-xl"
      >
        <div class="py-2">
          <span class="font-bold text-base">Đặc điểm nổi bật</span>
        </div>
        <div class="grid grid-cols-2 gap-y-3">
          <div
            v-for="(feature, idx) in featureOptionsMotel"
            :key="idx"
            class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
            :class="{ 'text-teal-500': formData.accomodation[feature.value] }"
            @click="toggleFeature(feature.value)"
          >
            <div class="relative">
              <input
                type="checkbox"
                class="hidden"
                :checked="formData.accomodation[feature.value]"
                readonly
              />
              <div
                class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
                :class="{
                  'bg-teal-500 border-teal-500':
                    formData.accomodation[feature.value],
                }"
              >
                <CheckIcon
                  v-if="formData.accomodation[feature.value]"
                  class="w-3 h-3 text-white"
                />
              </div>
            </div>
            <span class="ml-2 text-sm">{{ feature.label }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="
          formData.accomodation.motel === 'QUAN_AN' ||
          formData.accomodation.motel === 'QUAN_NUOC'
        "
        class="block bg-white p-4 rounded-xl"
      >
        <div class="py-2">
          <span class="font-bold text-base">Đặc điểm nổi bật</span>
        </div>
        <div class="grid grid-cols-2 gap-y-3">
          <div
            v-for="(feature, idx) in featureOptionsStore"
            :key="idx"
            class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
            :class="{ 'text-teal-500': formData.accomodation[feature.value] }"
            @click="toggleFeature(feature.value)"
          >
            <div class="relative">
              <input
                type="checkbox"
                class="hidden"
                :checked="formData.accomodation[feature.value]"
                readonly
              />
              <div
                class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
                :class="{
                  'bg-teal-500 border-teal-500':
                    formData.accomodation[feature.value],
                }"
              >
                <CheckIcon
                  v-if="formData.accomodation[feature.value]"
                  class="w-3 h-3 text-white"
                />
              </div>
            </div>
            <span class="ml-2 text-sm">{{ feature.label }}</span>
          </div>
        </div>
      </div>

      <!-- PHẦN HÌNH ẢNH (UPLOAD, PREVIEW, XOÁ) -->
      <div class="block bg-white p-4 rounded-xl">
        <h3 class="font-bold text-base">Hình ảnh</h3>
        <div
          class="relative border-2 border-dashed border-teal-500 rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer hover:bg-teal-50 transition"
        >
          <FolderUp class="w-12 h-12 text-teal-500" />
          <span class="mt-2 text-gray-500">Tải ảnh từ thiết bị</span>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <small
          v-if="newFiles.length < 5 && existingImages.length === 0"
          class="text-red-500 block mt-2"
        >
          Vui lòng chọn ít nhất 5 ảnh.
        </small>
        <div class="mt-6 grid grid-cols-3 gap-4">
          <!-- Ảnh cũ (base64) -->
          <div
            v-for="(img, idx) in existingImages"
            :key="idx"
            class="relative bg-white rounded-lg shadow overflow-hidden"
          >
            <img :src="img.preview" class="w-full h-32 object-cover" />
            <button
              @click="removeExisting(idx)"
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-red-500"
            >
              <Trash2 class="w-4 h-4" /><span class="text-xs">Xóa</span>
            </button>
          </div>
          <!-- Ảnh mới -->
          <div
            v-for="(file, idx) in newFiles"
            :key="idx"
            class="relative bg-white rounded-lg shadow overflow-hidden"
          >
            <img :src="file.preview" class="w-full h-32 object-cover" />
            <button
              @click="removeNew(idx)"
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-red-500"
            >
              <Trash2 class="w-4 h-4" /><span class="text-xs">Xóa</span>
            </button>
          </div>
        </div>
      </div>

      <!-- NÚT SUBMIT VÀ TRỞ VỀ -->
      <div class="text-white font-semibold">
        <button
          class="submit-btn bg-teal-500 px-4 py-2 rounded hover:bg-teal-600 w-full flex items-center justify-center"
          :disabled="loading"
          @click="handleUpdatePost"
        >
          <div
            v-if="loading"
            class="loader mr-2 animate-spin rounded-full h-5 w-5 border-b-2 border-white"
          ></div>
          <span>
            <span v-if="!loading">Cập nhật bài đăng</span>
            <span v-if="loading">Đang cập nhật...</span>
          </span>
        </button>
        <router-link
          :to="
            formData.accomodation.motel === 'PHONG_TRO'
              ? `/post/motel/${postId}`
              : formData.accomodation.motel === 'QUAN_AN'
              ? `/post/restaurant/${postId}`
              : formData.accomodation.motel === 'QUAN_NUOC'
              ? `/post/beverage/${postId}`
              : formData.accomodation.motel === 'CUA_HANG'
              ? `/post/store/${postId}`
              : formData.accomodation.motel === 'TIEN_ICH'
              ? `/post/utility/${postId}`
              : `/post/roommate/${postId}`
          "
          class="bg-gray-500 hover:bg-gray-600 w-full py-2 rounded-xl mt-2 flex items-center justify-center text-white"
        >
          <span class="font-medium">Trở về</span>
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import { Select, message } from "ant-design-vue";
import { Check as CheckIcon, FolderUp, Trash2 } from "lucide-vue-next";
import dayjs from "dayjs";
import { updatePost, getDetailPost } from "@/apis/postService.js";
import {
  getImageDTOByPost, // Lấy mảng ImageDTO (base64)
  deleteImagesByPost,
  uploadMultipleImages,
} from "@/apis/imageService.js";

const openHoursValue = ref(null);
/**
 * Hàm chuyển base64 -> File
 */
function base64ToFile(base64, fileName, fileType) {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new File([intArray], fileName, { type: fileType });
}

const ASelect = Select;
const ASelectOption = ASelect.Option;

const formData = reactive({
  title: "",
  content: "",
  accomodation: {
    id: null,
    motel: "PHONG_TRO",
    price: "",
    acreage: "",
    electricPrice: "",
    waterPrice: "",
    gender: "",
    address: "",
    idDistrict: "",
    interior: "",
    airConditioner: "",
    heater: "",
    internet: "",
    toilet: "",
    time: "",
    parking: "",
    security: "",
    owner: "",
    kitchen: "",
    secondMotel: "",
    openHours: "",
    delivery: "",
    dineIn: "",
    takeAway: "",
    bigSpace: "",
    linkShopeeFood: "",
  },
});

const districtList = ref([
  { id: 1, name: "An Đào" },
  { id: 4, name: "Đào Nguyên" },
  { id: 5, name: "Cửu Việt" },
  { id: 6, name: "Thành Chung" },
  { id: 7, name: "Ngô Xuân Quảng" },
  { id: 8, name: "Vinhomes Ocean Park" },
  { id: 9, name: "Khác" },
]);

const featureOptionsMotel = ref([
  { label: "Đầy đủ nội thất", value: "interior" },
  { label: "Có điều hòa", value: "airConditioner" },
  { label: "Có nóng lạnh", value: "heater" },
  { label: "Có internet", value: "internet" },
  { label: "Vệ sinh khép kín", value: "toilet" },
  { label: "Giờ giấc tự do", value: "time" },
  { label: "Có chỗ để xe", value: "parking" },
  { label: "An ninh tốt", value: "security" },
  { label: "Không chung chủ", value: "owner" },
  { label: "Kệ bếp", value: "kitchen" },
]);

const featureOptionsStore = ref([
  { label: "Có giao hàng", value: "delivery" },
  { label: "Phục vụ tại chỗ", value: "dineIn" },
  { label: "Mua mang đi", value: "takeAway" },
  { label: "Không gian rộng", value: "bigSpace" },
  { label: "Có chỗ để xe", value: "parking" },
  { label: "Có điều hòa", value: "airConditioner" },
  { label: "Wifi miễn phí", value: "internet" },
]);

const mapAddress = ref("");
const addressTimer = ref(null);
const loading = ref(false);

const displayMapAddress = computed(() => {
  return mapAddress.value.trim() || "VNUA";
});

watch(
  () => formData.accomodation.address,
  (newAddress) => {
    if (addressTimer.value) clearTimeout(addressTimer.value);
    addressTimer.value = setTimeout(() => {
      mapAddress.value = newAddress;
    }, 1000);
  }
);

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

/**
 * Mảng ảnh cũ: Lưu dưới dạng ImageDTO -> { id, fileName, fileType, base64, preview }
 */
const existingImages = ref([]);
/**
 * Mảng ảnh mới (File)
 */
const newFiles = ref([]);
/**
 * Số lượng ảnh ban đầu (để biết người dùng có xóa ảnh cũ không)
 */
const initialImageCount = ref(0);

/**
 * onMounted: Lấy chi tiết bài đăng + mảng ImageDTO (base64) ảnh cũ
 */
onMounted(async () => {
  try {
    // 1) Lấy detail post
    const resp = await getDetailPost(postId);
    console.log("Detail post:", resp.data);
    const data = resp.data;
    formData.title = data.title;
    formData.content = data.content;
    if (data.accomodationDTO) {
      Object.assign(formData.accomodation, data.accomodationDTO);
      if (data.accomodationDTO.district && data.accomodationDTO.district.id) {
        formData.accomodation.idDistrict = data.accomodationDTO.district.id;
      }
    }

    if (data.accomodationDTO && data.accomodationDTO.openHours) {
      // Parse giờ mở cửa từ string để hiển thị trong time picker
      const timeStr = data.accomodationDTO.openHours;
      const parts = timeStr.split("-").map((t) => t.trim());

      if (parts.length === 2) {
        // Thay đổi từ moment sang dayjs
        openHoursValue.value = [
          dayjs(`2023-01-01 ${parts[0]}`),
          dayjs(`2023-01-01 ${parts[1]}`),
        ];
      }
    }

    // 2) Gọi API getImageDTOByPost => lấy ảnh cũ dạng base64
    const imgRes = await getImageDTOByPost(postId);
    console.log("Response từ getImageDTOByPost:", imgRes);
    console.log("Data từ getImageDTOByPost:", imgRes.data);

    // Kiểm tra xem mảng ImageDTO nằm ở imgRes.data hay sâu hơn (vd. imgRes.data.data)
    const imageArray = imgRes; // Nếu backend trả về { data: [...] } thì thay bằng: imgRes.data.data
    if (imageArray && Array.isArray(imageArray)) {
      existingImages.value = imageArray.map((img) => {
        const previewUrl = `data:${img.fileType};base64,${img.uri}`;
        console.log("Item ImageDTO:", img, "=> preview:", previewUrl);
        return {
          id: img.id,
          fileName: img.fileName,
          fileType: img.fileType,
          base64: img.uri,
          preview: previewUrl,
        };
      });
      initialImageCount.value = existingImages.value.length;
      console.log("Số ảnh cũ ban đầu:", initialImageCount.value);
    } else {
      existingImages.value = [];
      initialImageCount.value = 0;
      console.warn("API không trả về mảng ImageDTO, data nhận:", imgRes.data);
    }
  } catch (error) {
    console.error("Lỗi khi tải detail post:", error);
    message.error("Không thể tải dữ liệu bài đăng.");
  }
});

/**
 * Khi user chọn file mới
 */
function handleFileChange(e) {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    if (existingImages.value.length + newFiles.value.length < 8) {
      file.preview = URL.createObjectURL(file);
      newFiles.value.push(file);
      console.log("Đã thêm file mới:", file.name);
    } else {
      message.error("Tối đa 8 ảnh");
    }
  });
  e.target.value = null;
}

/**
 * Xoá ảnh cũ (base64) ra khỏi existingImages
 */
function removeExisting(idx) {
  console.log("Xoá ảnh cũ tại idx =", idx, ":", existingImages.value[idx]);
  existingImages.value.splice(idx, 1);
}

/**
 * Xoá file mới ra khỏi newFiles
 */
function removeNew(idx) {
  console.log("Xoá ảnh mới tại idx =", idx, ":", newFiles.value[idx].name);
  URL.revokeObjectURL(newFiles.value[idx].preview);
  newFiles.value.splice(idx, 1);
}

/**
 * Xây dựng payload updatePost
 */
function buildPayload() {
  return {
    title: formData.title,
    content: formData.content,
    accomodation: {
      id: formData.accomodation.id,
      acreage: formData.accomodation.acreage,
      address: formData.accomodation.address,
      airConditioner: formData.accomodation.airConditioner,
      interior: formData.accomodation.interior,
      electricPrice: formData.accomodation.electricPrice,
      heater: formData.accomodation.heater,
      internet: formData.accomodation.internet,
      motel: formData.accomodation.motel,
      parking: formData.accomodation.parking,
      price: formData.accomodation.price,
      owner: formData.accomodation.owner,
      toilet: formData.accomodation.toilet,
      time: formData.accomodation.time,
      waterPrice: formData.accomodation.waterPrice,
      gender: formData.accomodation.gender,
      district: { id: formData.accomodation.idDistrict },
      kitchen: formData.accomodation.kitchen,
      security: formData.accomodation.security,
      secondMotel: formData.accomodation.secondMotel,
      openHours: formData.accomodation.openHours,
      delivery: formData.accomodation.delivery,
      dineIn: formData.accomodation.dineIn,
      takeAway: formData.accomodation.takeAway,
      bigSpace: formData.accomodation.bigSpace,
      linkShopeeFood: formData.accomodation.linkShopeeFood,
    },
  };
}

const handleTimeChange = (time) => {
  if (time && Array.isArray(time) && time.length === 2) {
    const formatTime = (timeValue) => {
      if (!timeValue) return "";
      const date = new Date(timeValue);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const startTime = formatTime(time[0]);
    const endTime = formatTime(time[1]);

    // Lưu trực tiếp dưới dạng chuỗi
    formData.accomodation.openHours = `${startTime} - ${endTime}`;
  }
};

/**
 * Khi nhấn "Cập nhật bài đăng"
 */
async function handleUpdatePost() {
  // Validate tiêu đề chỉ khi là PHONG_TRO hoặc O_GHEP
  if (
    formData.accomodation.motel === "PHONG_TRO" ||
    formData.accomodation.motel === "O_GHEP"
  ) {
    // Validate tiêu đề:
    if (!formData.title.trim()) {
      message.error("Tiêu đề không được để trống");
      return;
    }
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 100
    ) {
      message.error("Tiêu đề phải từ 10 đến 100 ký tự");
      return;
    }

    // Validate nội dung mô tả:
    if (!formData.content.trim()) {
      message.error("Nội dung mô tả không được để trống");
      return;
    }
    if (
      formData.content.trim().length < 50 ||
      formData.content.trim().length > 500
    ) {
      message.error("Nội dung mô tả phải từ 50 đến 500 ký tự");
      return;
    }
    if (!formData.accomodation.price) {
      message.error("Giá cho thuê không được để trống");
      return;
    }
    if (!formData.accomodation.acreage) {
      message.error("Diện tích không được để trống");
      return;
    }
    if (!formData.accomodation.electricPrice) {
      message.error("Giá điện không được để trống");
      return;
    }
    if (!formData.accomodation.waterPrice) {
      message.error("Giá nước không được để trống");
      return;
    }
    if (!formData.accomodation.idDistrict) {
      message.error("Khu vực không được để trống");
      return;
    }
    if (!formData.accomodation.address.trim()) {
      message.error("Địa chỉ không được để trống");
      return;
    }
  }

  if (
    formData.accomodation.motel === "QUAN_AN" ||
    formData.accomodation.motel === "QUAN_NUOC" ||
    formData.accomodation.motel === "CUA_HANG" ||
    formData.accomodation.motel === "TIEN_ICH"
  ) {
    // Validate tiêu đề:
    if (!formData.title.trim()) {
      message.error("Tiêu đề không được để trống");
      return;
    }
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 100
    ) {
      message.error("Tiêu đề phải từ 10 đến 100 ký tự");
      return;
    }

    // Validate nội dung mô tả:
    if (!formData.content.trim()) {
      message.error("Nội dung mô tả không được để trống");
      return;
    }
    if (
      formData.content.trim().length < 50 ||
      formData.content.trim().length > 500
    ) {
      message.error("Nội dung mô tả phải từ 50 đến 500 ký tự");
      return;
    }
    if (!formData.accomodation.openHours) {
      message.error("Giờ mở cửa không được để trống");
      return;
    }

    if (!formData.accomodation.idDistrict) {
      message.error("Khu vực không được để trống");
      return;
    }
    if (!formData.accomodation.address.trim()) {
      message.error("Địa chỉ không được để trống");
      return;
    }
  }
  // Validate số lượng ảnh (tổng số ảnh cũ và ảnh mới) phải >= 5
  const totalImages = existingImages.value.length + newFiles.value.length;
  if (totalImages < 5) {
    message.error("Bạn phải tải lên ít nhất 5 ảnh");
    return;
  }

  loading.value = true;
  try {
    console.log("Cập nhật bài đăng với payload:", buildPayload());
    await updatePost(postId, buildPayload());
    console.log("Cập nhật bài đăng thành công.");

    // Kiểm tra thay đổi ảnh
    const hasChanges =
      existingImages.value.length < initialImageCount.value ||
      newFiles.value.length > 0;
    console.log("Kiểm tra thay đổi ảnh:", {
      existingLength: existingImages.value.length,
      initialCount: initialImageCount.value,
      newFilesCount: newFiles.value.length,
      hasChanges,
    });

    if (hasChanges) {
      console.log("Có thay đổi ảnh => Xoá toàn bộ trên server + re-upload");
      await deleteImagesByPost(postId);

      // Chuyển các ảnh cũ (base64) còn lại thành File
      const reuploadOldFiles = existingImages.value.map((img) => {
        const file = base64ToFile(img.base64, img.fileName, img.fileType);
        console.log("Convert base64 -> File:", file);
        return file;
      });

      // Gộp ảnh cũ + ảnh mới
      const finalFiles = [...reuploadOldFiles, ...newFiles.value];
      console.log("finalFiles để upload:", finalFiles);

      if (finalFiles.length) {
        console.log("Upload lại ảnh cũ + mới...");
        await uploadMultipleImages(postId, finalFiles);
      }
    }

    message.success("Cập nhật tin thành công!");
    if (formData.accomodation.motel === "PHONG_TRO") {
      router.push(`/post/motel/${postId}`);
    } else if (formData.accomodation.motel === "O_GHEP") {
      router.push(`/post/roommate/${postId}`);
    } else if (formData.accomodation.motel === "QUAN_AN") {
      router.push(`/post/restaurant/${postId}`);
    } else if (formData.accomodation.motel === "QUAN_NUOC") {
      router.push(`/post/beverage/${postId}`);
    } else if (formData.accomodation.motel === "CUA_HANG") {
      router.push(`/post/store/${postId}`);
    } else {
      router.push(`/post/utility/${postId}`);
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật bài đăng:", error);
    message.error("Đã có lỗi xảy ra khi cập nhật tin.");
  } finally {
    loading.value = false;
  }
}

/**
 * Toggle feature
 */
function toggleFeature(featureValue) {
  formData.accomodation[featureValue] = !formData.accomodation[featureValue];
  console.log(
    "Toggle feature:",
    featureValue,
    formData.accomodation[featureValue]
  );
}
</script>

<style scoped>
.submit-btn:hover {
  background-color: #2980b9;
}
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
