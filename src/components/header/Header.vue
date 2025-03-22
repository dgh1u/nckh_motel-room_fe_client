<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/store";
import logo from "@/assets/vnua-sv-logo.jpg";
import DropdownMenu from "@/components/header/DropdownMenu.vue";
import { Bell, Edit, ChevronDown } from "lucide-vue-next";

const authStore = useAuthStore();

// Biến kiểm tra header sticky khi cuộn trang
const isSticky = ref(false);

// Biến điều khiển hiển thị dropdown "Tìm trọ"
const showDropdown = ref(false);
let hideTimeout = null;

const handleScroll = () => {
  isSticky.value = window.scrollY > window.innerHeight;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Hàm hiển thị dropdown
const showMenu = () => {
  clearTimeout(hideTimeout);
  showDropdown.value = true;
};

// Hàm ẩn dropdown
const hideMenu = () => {
  hideTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 150);
};
</script>

<template>
  <header
    :class="[
      'bg-white text-gray-700 font-semibold shadow-md font-bold transition-all duration-500',
      isSticky
        ? 'fixed top-0 left-0 right-0 z-50 animate-slideDown'
        : 'relative',
    ]"
  >
    <nav class="mx-15 flex justify-between items-center">
      <!-- Nhóm logo và các liên kết điều hướng bên trái -->
      <div class="flex items-center space-x-6 justify-center">
        <router-link
          to="/home"
          exact-active-class="text-blue-500"
          class="transition duration-150"
        >
          <img
            :src="logo"
            alt="Logo"
            class="h-12"
            data-aos="zoom-out"
            data-aos-duration="800"
          />
        </router-link>

        <div
          class="relative ml-5"
          @mouseenter="showMenu"
          @mouseleave="hideMenu"
        >
          <span
            class="flex items-center text-gray-700 hover:text-teal-500 transition duration-150"
            data-aos="zoom-out"
            data-aos-duration="800"
          >
            Tìm trọ <ChevronDown size="18" class="ml-1" />
          </span>
          <div
            v-show="showDropdown"
            class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-opacity duration-200"
            style="z-index: 9999"
          >
            <router-link
              to="/post/motel"
              class="block px-4 py-2 pt-4 font-medium text-gray-700 hover:text-teal-500 transition duration-150"
            >
              Tìm phòng trọ
            </router-link>
            <router-link
              to="/post/roommate"
              class="block px-4 py-2 pb-4 text-gray-700 hover:text-teal-500 transition duration-150"
            >
              Tìm người ở ghép
            </router-link>
          </div>
        </div>

        <router-link
          data-aos="zoom-out"
          data-aos-duration="800"
          to="/cua-hang"
          exact-active-class="text-blue-500"
          class="hover:text-teal-500 transition duration-150"
        >
          Cửa hàng
        </router-link>

        <router-link
          data-aos="zoom-out"
          data-aos-duration="800"
          to="/giao-hang"
          exact-active-class="text-blue-500"
          class="hover:text-teal-500 transition duration-150"
        >
          Giao hàng
        </router-link>

        <router-link
          data-aos="zoom-out"
          data-aos-duration="800"
          to="/contact"
          exact-active-class="text-blue-500"
          class="hover:text-teal-500 transition duration-150"
        >
          Liên hệ
        </router-link>
      </div>

      <!-- Phần đăng nhập / dropdown user bên phải -->
      <div class="flex items-center">
        <div v-if="authStore.isAuthenticated" class="flex items-center">
          <!-- Đăng tin -->
          <router-link
            to="/create-post"
            data-aos="zoom-out"
            data-aos-duration="800"
            exact-active-class="bg-red-600"
            class="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl transition duration-150"
          >
            <Edit size="20" class="mr-2" />
            <span>Đăng tin</span>
          </router-link>

          <!-- Thông báo -->
          <router-link
            to="/saved"
            data-aos="zoom-out"
            data-aos-duration="800"
            exact-active-class="text-blue-500"
            class="flex items-center ml-5 hover:text-teal-500 transition duration-150"
          >
            <Bell size="20" class="mr-1" />
            <span>Thông báo</span>
          </router-link>

          <!-- Dropdown user -->
          <DropdownMenu />
        </div>

        <!-- Nếu chưa đăng nhập -->
        <div v-else>
          <router-link
            to="/login"
            exact-active-class="bg-blue-600"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Đăng nhập
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slideDown {
  animation: slideDown 0.5s ease-in-out;
}
</style>
