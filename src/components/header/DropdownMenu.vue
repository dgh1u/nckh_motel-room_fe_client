<template>
  <div class="relative" @mouseenter="showMenu" @mouseleave="hideMenu">
    <div
      class="flex items-center px-5 py-2 rounded-lg cursor-pointer"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <div class="w-10 h-10 relative ml-4">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="User Avatar"
          class="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>

    <!-- Dropdown Menu -->
    <div
      v-show="showDropdown"
      class="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg transition-opacity duration-200"
      style="z-index: 9999"
      @mouseenter="showMenu"
      @mouseleave="hideMenu"
    >
      <!-- Khu vực thông tin người dùng + khối số dư -->
      <div class="p-4">
        <div class="flex items-center">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="User Avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div class="ml-3">
            <span class="font-semibold text-gray-800">{{
              profile.fullName
            }}</span>
            <span class="block text-sm text-gray-500">{{ profile.email }}</span>
          </div>
        </div>

        <div
          class="mt-4 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between whitespace-nowrap"
        >
          <div class="flex flex-col mr-2">
            <span class="text-sm text-gray-600">Số dư tài khoản</span>
            <span class="text-md font-bold">{{ formattedBalance }} ₫</span>
          </div>
          <button
            class="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1.5 rounded-xl transition duration-150"
            @click="handleDeposit"
          >
            <CreditCard size="16" />
            <span class="text-sm font-bold">Nạp tiền</span>
          </button>
        </div>
      </div>

      <!-- Các item dropdown bên dưới -->
      <a
        href="/profile"
        class="block px-4 pt-1 pb-1.5 ml-2 text-base hover:text-teal-500 transition duration-150 flex items-center space-x-2"
      >
        <User size="18" />
        <span>Thông tin</span>
      </a>
      <a
        href="/my-posts"
        class="block px-4 py-1.5 ml-2 text-base hover:text-teal-500 transition duration-150 flex items-center space-x-2"
      >
        <Folder size="18" />
        <span>Danh sách tin đăng</span>
      </a>
      <a
        href="/order-history"
        class="block px-4 py-1.5 ml-2 text-base hover:text-teal-500 transition duration-150 flex items-center space-x-2"
      >
        <Clock size="18" />
        <span>Lịch sử nạp tiền</span>
      </a>

      <!-- Thanh ngăn cách -->
      <div class="w-5/6 mx-auto border-t my-2"></div>

      <a
        href="#"
        @click.prevent="handleLogout"
        class="block px-4 pt-1.5 pb-3 ml-2 text-base hover:text-red-400 transition duration-150 flex items-center space-x-2"
      >
        <LogOut size="18" />
        <span>Đăng xuất</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/store";
import { useRouter } from "vue-router";
import { Clock, User, LogOut, CreditCard, Folder } from "lucide-vue-next";
import { getProfile } from "@/apis/authService";

const authStore = useAuthStore();
const router = useRouter();

const showDropdown = ref(false);
let hideTimeout = null;

const avatarUrl = computed(() => authStore.avatar);

const profile = ref({
  fullName: "",
  email: "",
});

const balance = ref(0);

// Lấy thông tin hồ sơ (bao gồm balance) khi component được mounted
onMounted(async () => {
  try {
    const response = await getProfile();
    profile.value = {
      fullName: response.data.fullName,
      email: response.data.email,
    };
    balance.value = response.data.balance;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin profile:", error);
  }
});

// Computed để định dạng số dư theo locale Việt Nam
const formattedBalance = computed(() => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(balance.value);
});

const showMenu = () => {
  clearTimeout(hideTimeout);
  showDropdown.value = true;
};

const hideMenu = () => {
  hideTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 100);
};

const handleDeposit = () => {
  // Chuyển hướng tới /payment thay vì /nap-tien
  router.push("/payment");
};

const handleLogout = () => {
  authStore.logout();
  showDropdown.value = false;
  router.push("/login");
};
</script>

<style scoped></style>
