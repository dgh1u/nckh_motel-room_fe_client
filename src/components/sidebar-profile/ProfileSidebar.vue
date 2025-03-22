<template>
  <aside class="h-full bg-white p-10 shadow-md">
    <!-- Thông tin người dùng -->
    <div
      class="flex flex-col items-center mb-5"
      data-aos="zoom-out-right"
      data-aos-duration="800"
    >
      <!-- Khối bọc avatar và các nút thao tác -->
      <div class="relative">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="User Avatar"
          class="w-30 h-30 rounded-full object-cover"
        />
        <button
          type="button"
          class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow"
          @click="onChangeAvatar"
          title="Chọn ảnh mới"
        >
          <RefreshCw class="w-4 h-4" />
        </button>
        <!-- Input file ẩn -->
        <input
          ref="avatarInputRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileSelected"
        />
        <button
          v-if="selectedFile"
          type="button"
          class="absolute bottom-0 right-10 bg-white rounded-full p-2 shadow"
          @click="onSaveAvatar"
          title="Lưu avatar"
        >
          <Save class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div
      class="flex flex-col items-center mt-1 font-semibold mb-5"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      {{ userEmail }}
    </div>

    <div
      class="mb-6 px-3 py-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between whitespace-nowrap"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <!-- Phần hiển thị số dư -->
      <div class="flex flex-col mr-2">
        <span class="text-sm text-gray-600">Số dư tài khoản</span>
        <span class="text-md font-bold">0</span>
      </div>

      <!-- Nút "Nạp tiền" -->
      <button
        class="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1.5 rounded-xl transition duration-150"
        @click="handleDeposit"
      >
        <CreditCard size="16" />
        <span class="text-sm font-bold">Nạp tiền</span>
      </button>
    </div>
    <!-- Menu điều hướng -->
    <nav class="space-y-3" data-aos="zoom-out" data-aos-duration="800">
      <router-link
        to="/profile"
        class="flex items-center block py-2 px-10 rounded hover:text-teal-500 font-medium text-gray-700"
        active-class="bg-teal-400 text-white"
        exact
      >
        <User class="inline-block w-5 h-5 mr-2" />
        Thông tin tài khoản
      </router-link>
      <router-link
        to="/create-post"
        class="flex items-center block py-2 px-10 rounded hover:text-teal-500 font-medium text-gray-700"
        active-class="bg-teal-400 text-white"
      >
        <FolderPen class="inline-block w-5 h-5 mr-2" />
        Đăng tin
      </router-link>
      <router-link
        to="/my-posts"
        class="flex items-center block py-2 px-10 rounded hover:text-teal-500 font-medium text-gray-700"
        active-class="bg-teal-400 text-white"
      >
        <Folder class="inline-block w-5 h-5 mr-2" />
        Danh sách tin đăng
      </router-link>
      <router-link
        to="/profile/security"
        class="flex items-center block py-2 px-10 rounded hover:text-teal-500 font-medium text-gray-700"
        active-class="bg-teal-400 text-white"
      >
        <CreditCard class="inline-block w-5 h-5 mr-2" />
        Nạp tiền
      </router-link>
      <router-link
        to="/profile/orders"
        class="flex items-center block py-2 px-10 rounded hover:text-teal-500 font-medium text-gray-700"
        active-class="bg-teal-400 text-white"
      >
        <Clock class="inline-block w-5 h-5 mr-2" />
        Lịch sử nạp tiền
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/store";
import {
  RefreshCw,
  Save,
  User,
  Lock,
  Clock,
  LogOut,
  Bookmark,
  CreditCard,
  Folder,
  FolderPen,
} from "lucide-vue-next";
import { message } from "ant-design-vue";
import { postAvatar, getProfile } from "@/apis/authService";

const authStore = useAuthStore();

const userEmail = ref("");
onMounted(async () => {
  try {
    const profileRes = await getProfile();
    userEmail.value = profileRes.data.email;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
});

// Biến tạm để lưu preview avatar
const previewAvatar = ref("");

// File được chọn
const selectedFile = ref(null);
// Tham chiếu đến input file ẩn
const avatarInputRef = ref(null);

// computed avatarUrl
const avatarUrl = computed(() => {
  return selectedFile.value ? previewAvatar.value : authStore.avatar;
});

const onChangeAvatar = () => {
  avatarInputRef.value.click();
};

const onFileSelected = (event) => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewAvatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const onSaveAvatar = async () => {
  try {
    await postAvatar(null, selectedFile.value);
    message.success("Avatar cập nhật thành công!");
    authStore.setAvatar(previewAvatar.value);
    selectedFile.value = null;
    previewAvatar.value = "";
  } catch (error) {
    console.error("Error uploading avatar:", error);
    message.error("Cập nhật avatar thất bại!");
  }
};
</script>

<style scoped>
/* Tuỳ chỉnh CSS nếu cần */
</style>
