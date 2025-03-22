<template>
  <ProfileLayout>
    <div class="create-post max-w-3xl mx-auto space-y-4">
      <div
        class="block items-center pb-4 justify-center flex"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
        <span class="font-bold text-3xl text-teal-500">Đăng tin cho thuê</span>
      </div>
      <div
        class="block bg-white p-4 pb-6 rounded-xl"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
        <div class="py-2">
          <span class="font-bold text-base">Hình thức</span>
        </div>

        <label>Loại hình <span class="text-red-500">*</span> </label>
        <div class="flex border border-gray-300 rounded-lg mt-1">
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
        class="block bg-white p-4 rounded-xl"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
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

      <div
        v-if="formData.accomodation.motel === 'O_GHEP'"
        class="block bg-white p-4 rounded-xl"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
        <div class="py-2">
          <span class="font-bold text-base">Giới tính</span>
        </div>
        <label>Giới tính yêu cầu</label>
        <div class="flex border border-gray-300 rounded-lg mt-1">
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

      <div
        class="block bg-white p-4 rounded-xl"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
        <div class="py-2">
          <span class="font-bold text-base">Khu vực</span>
        </div>
        <div class="py-2">
          <label>Khu vực <span class="text-red-500">*</span></label>

          <div class="flex border border-gray-300 rounded-lg mt-1">
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
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
          >
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

      <div
        class="block bg-white p-4 rounded-xl"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
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
      <div
        class="text-white font-semibold"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
        <button
          class="submit-btn bg-teal-500 px-4 py-2 rounded hover:bg-teal-600 w-full flex items-center justify-center"
          :disabled="loading"
          @click="handleCreatePost"
        >
          <div
            v-if="loading"
            class="loader mr-2 animate-spin rounded-full h-5 w-5 border-b-2 border-white"
          ></div>
          <span>
            <span v-if="!loading">Tạo bài viết</span>
            <span v-if="loading">Đang tạo...</span>
          </span>
        </button>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { createPost } from "@/apis/postService.js";
// Import các component của Ant Design Vue
import { Select, message, Spin } from "ant-design-vue";
const { Option: ASelectOption } = Select;
import { Check as CheckIcon } from "lucide-vue-next";
import ProfileLayout from "@/layouts/ProfileLayout.vue";

// Import các component của Ant Design Vue trực tiếp trong setup
const ASelect = Select;
const ASelectOptionComponent = ASelectOption;
const ASpin = Spin;

// Khai báo các biến reactive
const formData = reactive({
  title: "",
  content: "",
  accomodation: {
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

// Computed properties
const displayMapAddress = computed(() => {
  return mapAddress.value.trim() || "VNUA";
});

// Watchers
watch(
  () => formData.accomodation.address,
  (newAddress) => {
    if (addressTimer.value) clearTimeout(addressTimer.value);
    addressTimer.value = setTimeout(() => {
      mapAddress.value = newAddress;
    }, 1000);
  }
);

// Methods
const handleCreatePost = async () => {
  loading.value = true;

  setTimeout(async () => {
    try {
      const response = await createPost(formData);
      console.log("Tạo bài viết thành công:", response.data);
      message.success("Đăng tin thành công!");
      resetForm();
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      message.error("Đã có lỗi xảy ra khi đăng tin.");
    } finally {
      loading.value = false;
    }
  }, 1000);
};

const toggleFeature = (featureValue) => {
  formData.accomodation[featureValue] = !formData.accomodation[featureValue];
};

const resetForm = () => {
  Object.assign(formData, {
    title: "",
    content: "",
    accomodation: {
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
};
</script>

<style scoped>
.submit-btn:hover {
  background-color: #2980b9;
}
.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
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
