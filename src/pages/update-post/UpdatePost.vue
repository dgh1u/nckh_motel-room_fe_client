<template>
  <DefaultLayout>
    <div class="create-post max-w-3xl mx-auto p-4 space-y-4">
      <div class="block p-4 items-center justify-center flex">
        <span class="font-bold text-3xl text-teal-500">Cập nhật tin đăng</span>
      </div>

      <div class="block bg-white p-4 pb-6 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Hình thức</span>
        </div>

        <label>Loại hình <span class="text-red-500">*</span> </label>
        <div class="flex rounded-lg mt-1">
          <a-select
            v-model:value="formData.accomodation.motel"
            placeholder="Chọn hình thức"
            class="w-full"
          >
            <a-select-option value="PHONG_TRO">Tìm phòng trọ</a-select-option>
            <a-select-option value="O_GHEP">Tìm người ở ghép</a-select-option>
          </a-select>
        </div>
      </div>

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
          <span class="block"
            >Nội dung mô tả <span class="text-red-500">*</span></span
          >
          <div class="flex border border-gray-300 rounded-lg mt-1">
            <textarea
              v-model="formData.content"
              placeholder="Nhập nội dung mô tả"
              rows="4"
              class="w-full p-2 mt-1 border-none outline-none rounded-lg"
            />
          </div>
        </div>

        <div class="py-2">
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
          <small class="text-gray-500"
            >Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000</small
          >
        </div>

        <div class="py-2">
          <label class="block text-gray-700"
            >Diện tích <span class="text-red-500">*</span></label
          >
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

        <div class="py-2">
          <label class="block text-gray-700"
            >Giá điện <span class="text-red-500">*</span></label
          >
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

        <div class="py-2">
          <label class="block text-gray-700"
            >Giá nước <span class="text-red-500">*</span></label
          >
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
      </div>

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
          <label class="block text-gray-700"
            >Địa chỉ <span class="text-red-500">*</span></label
          >
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

      <div class="block bg-white p-4 rounded-xl">
        <h3 class="text-xl font-semibold">Đặc điểm nổi bật</h3>
        <div class="grid grid-cols-2 gap-y-3">
          <div
            v-for="(feature, idx) in featureOptions"
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
        <!-- Nút Trở về -->
        <router-link
          :to="
            formData.accomodation.motel === 'PHONG_TRO'
              ? `/post/motel/${postId}`
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
import { updatePost, getDetailPost } from "@/apis/postService.js";
import { Select, message } from "ant-design-vue";
import { Check as CheckIcon } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";

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
    interior: false,
    airConditioner: false,
    heater: false,
    internet: false,
    toilet: false,
    time: false,
    parking: false,
    security: false,
    owner: false,
    kitchen: false,
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

const featureOptions = ref([
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

onMounted(async () => {
  try {
    const response = await getDetailPost(postId);
    const data = response.data;
    // Giả sử cấu trúc trả về chứa: title, content và accomodationDTO
    formData.title = data.title;
    formData.content = data.content;
    if (data.accomodationDTO) {
      Object.assign(formData.accomodation, data.accomodationDTO);
      if (data.accomodationDTO.district && data.accomodationDTO.district.id) {
        formData.accomodation.idDistrict = data.accomodationDTO.district.id;
      }
    }
  } catch (error) {
    console.error("Lỗi tải thông tin bài đăng:", error);
    message.error("Không thể tải thông tin bài đăng.");
  }
});

const handleUpdatePost = async () => {
  loading.value = true;
  const payload = {
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
    },
  };

  try {
    const response = await updatePost(postId, payload);
    console.log("Cập nhật bài đăng thành công:", response.data);
    message.success("Cập nhật tin thành công!");
    // Chuyển hướng sau khi submit thành công dựa vào giá trị của motel
    if (formData.accomodation.motel === "PHONG_TRO") {
      router.push(`/post/motel/${postId}`);
    } else {
      router.push(`/post/roommate/${postId}`);
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật bài đăng:", error);
    message.error("Đã có lỗi xảy ra khi cập nhật tin.");
  } finally {
    loading.value = false;
  }
};

const toggleFeature = (featureValue) => {
  formData.accomodation[featureValue] = !formData.accomodation[featureValue];
};
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
