<template>
  <ProfileLayout>
    <div data-aos="zoom-out" data-aos-duration="800" class="ml-20">
      <span class="text-4xl font-extrabold mb-4">Thông tin tài khoản</span>
      <span class="block pt-2 text-2xl font-semibold mb-10 text-blue-400"
        >Cơ bản</span
      >

      <form
        class="space-y-6 max-w-3xl mt-10"
        @submit.prevent="onSubmit"
        data-aos="zoom-out"
        data-aos-duration="800"
      >
        <!-- Email (disable) và Họ tên -->
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block mb-2 font-medium">Email</label>
            <input
              type="text"
              v-model="profileData.email"
              placeholder="Email của bạn"
              class="w-full border border-gray-200 h-12 p-3 rounded focus:outline-none focus:border-blue-500 bg-gray-50"
              disabled
            />
          </div>
          <div>
            <label class="block mb-2 font-medium">Họ tên</label>
            <input
              type="text"
              v-model="profileData.fullName"
              placeholder="Họ và tên của bạn"
              class="w-full border border-gray-300 h-12 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <!-- Địa chỉ -->
        <div>
          <label class="block mb-2 font-medium">Địa chỉ</label>
          <input
            type="text"
            v-model="profileData.address"
            placeholder="Địa chỉ của bạn"
            class="w-full border border-gray-300 h-12 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

        <!-- Số điện thoại -->
        <div>
          <label class="block mb-2 font-medium">Số điện thoại</label>
          <input
            type="text"
            v-model="profileData.phone"
            placeholder="Số điện thoại của bạn"
            class="w-full border border-gray-300 h-12 p-3 rounded focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>
      </form>
      <!-- Nút hành động -->
      <div class="flex gap-6 mt-10 text-white font-semibold">
        <button
          type="button"
          class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-300 text-lg"
          @click="onCancel"
        >
          Hủy
        </button>

        <button
          type="submit"
          class="px-6 py-3 bg-blue-400 rounded-lg hover:bg-blue-500 text-lg"
          @click="onSubmit"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProfileLayout from "../../../layouts/ProfileLayout.vue";
import { getProfile, updateProfile } from "@/apis/authService.js";
import { message } from "ant-design-vue";

// Dữ liệu form
const profileData = ref({
  email: "",
  fullName: "",
  address: "",
  phone: "",
});

// Lưu trữ bản sao ban đầu của dữ liệu profile để reset form khi ấn "Hủy"
let initialProfileData = {};

onMounted(async () => {
  try {
    const response = await getProfile();
    const { email, fullName, address, phone } = response.data;
    profileData.value.email = email;
    profileData.value.fullName = fullName;
    profileData.value.address = address;
    profileData.value.phone = phone;
    // Lưu lại bản sao ban đầu
    initialProfileData = { email, fullName, address, phone };
  } catch (error) {
    alert("Lỗi khi lấy thông tin tài khoản!");
    console.error("Lỗi khi lấy thông tin profile:", error);
  }
});

// Hàm submit form: Gửi yêu cầu cập nhật thông tin profile (PUT)
const onSubmit = async () => {
  try {
    await updateProfile(profileData.value);
    message.success("Cập nhật thông tin thành công!");
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Cập nhật thất bại!";
    message.error(errorMsg);
    console.error("Lỗi khi cập nhật profile:", error);
  }
};

// Hàm hủy: Reset form về trạng thái ban đầu lấy từ API getProfile
const onCancel = () => {
  profileData.value = { ...initialProfileData };
  console.log("Form reset to initial profile data:", initialProfileData);
};
</script>

<style scoped>
/* CSS tuỳ chỉnh nếu cần */
</style>
