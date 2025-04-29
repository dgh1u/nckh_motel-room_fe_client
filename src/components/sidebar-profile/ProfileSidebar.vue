<template>
  <aside class="h-full bg-white p-4 md:p-6 lg:p-10 shadow-md">
    <!-- Thông tin người dùng -->
    <div
      class="flex flex-col items-center mb-4 md:mb-5"
      data-aos="zoom-out-right"
      data-aos-duration="800"
    >
      <!-- Khối bọc avatar và các nút thao tác -->
      <div class="relative">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="User Avatar"
          class="w-20 h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 rounded-full object-cover"
        />
        <button
          type="button"
          class="absolute bottom-0 right-0 bg-white rounded-full p-1 md:p-2 shadow"
          @click="onChangeAvatar"
          title="Chọn ảnh mới"
        >
          <RefreshCw class="w-3 h-3 md:w-4 md:h-4" />
        </button>
        <!-- Input file ẩn để chọn ảnh -->
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
          class="absolute bottom-0 right-8 md:right-10 bg-white rounded-full p-1 md:p-2 shadow"
          @click="onSaveAvatar"
          title="Lưu avatar"
        >
          <Save class="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
    <div
      class="flex flex-col items-center mt-1 font-semibold mb-4 md:mb-5 text-sm md:text-base"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      {{ userEmail }}
    </div>

    <div
      class="mb-4 md:mb-6 px-2 md:px-3 py-2 md:py-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between whitespace-nowrap"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <!-- Hiển thị số dư tài khoản -->
      <div class="flex flex-col mr-2">
        <span class="text-xs md:text-sm text-gray-600">Số dư tài khoản</span>
        <span class="text-sm md:text-md font-bold"
          >{{ formattedBalance }} ₫</span
        >
      </div>

      <!-- Nút nạp tiền -->
      <router-link
        to="/payment"
        class="flex items-center space-x-1 md:space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-2 md:px-3 py-1 md:py-1.5 rounded-xl transition duration-150"
      >
        <CreditCard class="w-4 h-4" />
        <span class="text-xs md:text-sm font-bold">Nạp tiền</span>
      </router-link>
    </div>
    <!-- Menu điều hướng sidebar -->
    <nav
      class="space-y-2 md:space-y-3"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <router-link
        to="/profile"
        class="flex items-center block py-1.5 md:py-2 px-4 md:px-10 rounded hover:text-teal-500 font-medium text-gray-700 text-xs md:text-sm lg:text-base"
        active-class="bg-teal-400 text-white"
        exact
      >
        <User class="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
        Thông tin tài khoản
      </router-link>
      <router-link
        to="/create-post"
        class="flex items-center block py-1.5 md:py-2 px-4 md:px-10 rounded hover:text-teal-500 font-medium text-gray-700 text-xs md:text-sm lg:text-base"
        active-class="bg-teal-400 text-white"
      >
        <FolderPen class="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
        Đăng tin
      </router-link>
      <router-link
        to="/my-posts"
        class="flex items-center block py-1.5 md:py-2 px-4 md:px-10 rounded hover:text-teal-500 font-medium text-gray-700 text-xs md:text-sm lg:text-base"
        active-class="bg-teal-400 text-white"
      >
        <Folder class="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
        Danh sách tin đăng
      </router-link>
      <router-link
        to="/payment"
        class="flex items-center block py-1.5 md:py-2 px-4 md:px-10 rounded hover:text-teal-500 font-medium text-gray-700 text-xs md:text-sm lg:text-base"
        active-class="bg-teal-400 text-white"
      >
        <CreditCard class="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
        Nạp tiền
      </router-link>
      <router-link
        to="/payment-history"
        class="flex items-center block py-1.5 md:py-2 px-4 md:px-10 rounded hover:text-teal-500 font-medium text-gray-700 text-xs md:text-sm lg:text-base"
        active-class="bg-teal-400 text-white"
      >
        <Clock class="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
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
  Clock,
  CreditCard,
  Folder,
  FolderPen,
} from "lucide-vue-next";
import { message } from "ant-design-vue";
import { postAvatar, getProfile } from "@/apis/authService";

// Khởi tạo store để quản lý trạng thái xác thực
const authStore = useAuthStore();

// Biến lưu thông tin người dùng
const userEmail = ref("");
const balance = ref(0);

// Lấy thông tin người dùng khi component được tạo
onMounted(async () => {
  try {
    const profileRes = await getProfile();
    userEmail.value = profileRes.data.email;
    balance.value = profileRes.data.balance;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
});

// Định dạng số dư theo tiền tệ Việt Nam
const formattedBalance = computed(() => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(balance.value);
});

// Quản lý avatar
const previewAvatar = ref("");
const selectedFile = ref(null);
const avatarInputRef = ref(null);

// Lấy URL avatar để hiển thị
const avatarUrl = computed(() => {
  return selectedFile.value ? previewAvatar.value : authStore.avatar;
});

// Mở hộp thoại chọn file avatar
const onChangeAvatar = () => {
  avatarInputRef.value.click();
};

// Xử lý khi người dùng chọn file ảnh
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

// Lưu avatar mới lên server
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
