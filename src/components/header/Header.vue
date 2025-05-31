<template>
  <header
    :class="[
      'bg-white text-gray-700 font-semibold shadow-md font-bold transition-all duration-500 w-full',
      isSticky
        ? 'fixed top-0 left-0 right-0 z-50 animate-slideDown'
        : 'relative',
    ]"
  >
    <div class="mx-auto px-3 sm:px-4 md:px-6 lg:px-15">
      <!-- Grid layout cho Desktop -->
      <div class="hidden md:grid grid-cols-12 items-center">
        <!-- Logo ở cột 1-2 -->
        <div class="col-span-2 ml-10">
          <router-link
            to="/home"
            exact-active-class="text-blue-500"
            class="block"
          >
            <img
              :src="logo"
              alt="Logo"
              class="h-12"
              data-aos="zoom-out"
              data-aos-duration="800"
            />
          </router-link>
        </div>

        <!-- Navigation ở cột 3-8 -->
        <div class="col-span-6 flex items-center space-x-6 lg:space-x-12">
          <div
            class="relative"
            @mouseenter="showRoomMenu"
            @mouseleave="hideRoomMenu"
          >
            <span
              class="flex items-center text-gray-700 hover:text-teal-500 transition duration-150 cursor-pointer text-sm lg:text-base"
              data-aos="zoom-out"
              data-aos-duration="800"
            >
              Tìm trọ <ChevronDown size="18" class="ml-1" />
            </span>
            <div
              v-show="showRoomDropdown"
              class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-opacity duration-200"
              style="z-index: 9999"
            >
              <router-link
                to="/post/motel"
                class="block px-4 py-2 pt-4 font-medium text-gray-700 hover:text-teal-500 transition duration-150 text-sm lg:text-base"
              >
                Tìm phòng trọ
              </router-link>
              <router-link
                to="/post/roommate"
                class="block px-4 py-2 pb-4 text-gray-700 hover:text-teal-500 transition duration-150 text-sm lg:text-base"
              >
                Tìm người ở ghép
              </router-link>
            </div>
          </div>

          <div
            class="relative"
            @mouseenter="showServiceMenu"
            @mouseleave="hideServiceMenu"
          >
            <span
              class="flex items-center text-gray-700 hover:text-teal-500 transition duration-150 cursor-pointer text-sm lg:text-base"
              data-aos="zoom-out"
              data-aos-duration="800"
            >
              Ăn uống <ChevronDown size="18" class="ml-1" />
            </span>
            <div
              v-show="showServiceDropdown"
              class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-opacity duration-200"
              style="z-index: 9999"
            >
              <router-link
                to="/post/restaurant"
                class="block px-4 py-2 pt-4 font-medium text-gray-700 hover:text-teal-500 transition duration-150 text-sm lg:text-base"
              >
                Quán ăn
              </router-link>
              <router-link
                to="/post/beverage"
                class="block px-4 py-2 pb-4 text-gray-700 hover:text-teal-500 transition duration-150 text-sm lg:text-base"
              >
                Quán nước
              </router-link>
            </div>
          </div>

          <div
            class="relative"
            @mouseenter="showShopMenu"
            @mouseleave="hideShopMenu"
          >
            <span
              class="flex items-center text-gray-700 hover:text-teal-500 transition duration-150 cursor-pointer text-sm lg:text-base"
              data-aos="zoom-out"
              data-aos-duration="800"
            >
              <span class="hidden md:inline lg:hidden">Cửa hàng</span>
              <span class="hidden lg:inline">Cửa hàng & Tiện ích</span>
              <ChevronDown size="18" class="ml-1" />
            </span>
            <div
              v-show="showShopDropdown"
              class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-opacity duration-200"
              style="z-index: 9999"
            >
              <router-link
                to="/post/store"
                class="block px-4 py-2 pt-4 font-medium text-gray-700 hover:text-teal-500 transition duration-150 text-sm lg:text-base"
              >
                Cửa hàng
              </router-link>
              <router-link
                to="/post/utility"
                class="block px-4 py-2 pb-4 text-gray-700 hover:text-teal-500 transition duration-150 text-sm lg:text-base"
              >
                Tiện ích
              </router-link>
            </div>
          </div>

          <router-link
            data-aos="zoom-out"
            data-aos-duration="800"
            to="/contact"
            exact-active-class="text-blue-500"
            class="hover:text-teal-500 transition duration-150 text-sm lg:text-base"
          >
            Liên hệ
          </router-link>
        </div>

        <!-- Phần đăng nhập / dropdown user bên phải -->
        <div class="col-span-4 flex justify-end">
          <div v-if="authStore.isAuthenticated" class="flex items-center">
            <!-- Nút đăng tin -->
            <router-link
              to="/create-post"
              data-aos="zoom-out"
              data-aos-duration="800"
              exact-active-class="bg-red-600"
              class="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-xl transition duration-150 text-xs md:text-sm lg:text-base"
            >
              <Edit size="16" class="mr-1 md:mr-2" />
              <span class="hidden sm:inline">Đăng tin</span>
            </router-link>

            <!-- Component thông báo -->
            <div class="relative ml-2 md:ml-3 lg:ml-5">
              <ActionNotificationsDropdown />
            </div>

            <!-- Dropdown thông tin người dùng -->
            <DropdownMenu />
          </div>

          <!-- Hiển thị khi chưa đăng nhập -->
          <div v-else class="flex items-center">
            <router-link
              to="/create-post"
              data-aos="zoom-out"
              data-aos-duration="800"
              exact-active-class="bg-red-600"
              class="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-xl transition duration-150 text-xs md:text-sm lg:text-base"
            >
              <Edit size="14" class="mr-1 md:mr-2" />
              <span>Đăng tin</span>
            </router-link>
            <router-link
              to="/login"
              data-aos="zoom-out"
              data-aos-duration="800"
              exact-active-class="bg-blue-600"
              class="px-2 py-1 md:px-3 md:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ml-2 md:ml-3 lg:ml-5 text-xs md:text-sm lg:text-base"
            >
              Đăng nhập
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile layout -->
      <div class="flex justify-between items-center md:hidden py-3">
        <!-- Logo (always visible) -->
        <router-link
          to="/home"
          exact-active-class="text-blue-500"
          class="transition duration-150 z-20"
        >
          <img
            :src="logo"
            alt="Logo"
            class="h-8 sm:h-10"
            data-aos="zoom-out"
            data-aos-duration="800"
          />
        </router-link>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="z-20 text-gray-700 hover:text-teal-500 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <Menu v-if="!mobileMenuOpen" size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <div
      v-show="mobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile menu - làm cho nó chiếm toàn màn hình -->
    <div
      v-show="mobileMenuOpen"
      class="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto transition-transform duration-300"
      :class="mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Header của mobile menu với nút đóng -->
      <div
        class="flex justify-between items-center px-4 pt-4 pb-2 border-b sticky top-0 bg-white"
      >
        <h3 class="font-semibold text-lg">Menu</h3>
        <button
          @click="closeMobileMenu"
          class="text-gray-700 hover:text-red-500 focus:outline-none"
          aria-label="Close menu"
        >
          <X size="24" />
        </button>
      </div>

      <div class="p-4 space-y-5 flex-grow">
        <!-- Mobile menu items - Simplified accordions -->
        <div class="border-b pb-5">
          <!-- Tìm trọ section -->
          <div class="mb-4">
            <div
              class="flex justify-between items-center mb-3 cursor-pointer"
              @click="showRoomDropdown = !showRoomDropdown"
            >
              <span class="font-medium text-lg">Tìm trọ</span>
              <ChevronDown
                size="20"
                :class="
                  showRoomDropdown
                    ? 'transform rotate-180 transition-transform'
                    : 'transition-transform'
                "
              />
            </div>
            <div class="pl-4" v-show="showRoomDropdown">
              <router-link
                to="/post/motel"
                @click="closeMobileMenu"
                class="block py-2 text-gray-700 hover:text-teal-500 text-base"
              >
                Tìm phòng trọ
              </router-link>
              <router-link
                to="/post/roommate"
                @click="closeMobileMenu"
                class="block py-2 text-gray-700 hover:text-teal-500 text-base"
              >
                Tìm người ở ghép
              </router-link>
            </div>
          </div>

          <!-- Ăn uống section -->
          <div class="mb-4">
            <div
              class="flex justify-between items-center mb-3 cursor-pointer"
              @click="showServiceDropdown = !showServiceDropdown"
            >
              <span class="font-medium text-lg">Ăn uống</span>
              <ChevronDown
                size="20"
                :class="
                  showServiceDropdown
                    ? 'transform rotate-180 transition-transform'
                    : 'transition-transform'
                "
              />
            </div>
            <div class="pl-4" v-show="showServiceDropdown">
              <router-link
                to="/post/restaurant"
                @click="closeMobileMenu"
                class="block py-2 text-gray-700 hover:text-teal-500 text-base"
              >
                Quán ăn
              </router-link>
              <router-link
                to="/post/beverage"
                @click="closeMobileMenu"
                class="block py-2 text-gray-700 hover:text-teal-500 text-base"
              >
                Quán nước
              </router-link>
            </div>
          </div>

          <!-- Cửa hàng & Tiện ích section -->
          <div class="mb-4">
            <div
              class="flex justify-between items-center mb-3 cursor-pointer"
              @click="showShopDropdown = !showShopDropdown"
            >
              <span class="font-medium text-lg">Cửa hàng & Tiện ích</span>
              <ChevronDown
                size="20"
                :class="
                  showShopDropdown
                    ? 'transform rotate-180 transition-transform'
                    : 'transition-transform'
                "
              />
            </div>
            <div class="pl-4" v-show="showShopDropdown">
              <router-link
                to="/post/store"
                @click="closeMobileMenu"
                class="block py-2 text-gray-700 hover:text-teal-500 text-base"
              >
                Cửa hàng
              </router-link>
              <router-link
                to="/post/utility"
                @click="closeMobileMenu"
                class="block py-2 text-gray-700 hover:text-teal-500 text-base"
              >
                Tiện ích
              </router-link>
            </div>
          </div>

          <router-link
            to="/contact"
            @click="closeMobileMenu"
            class="block py-2 text-gray-700 hover:text-teal-500 font-medium text-lg"
          >
            Liên hệ
          </router-link>

          <!-- Thông báo section for mobile (only when authenticated) -->
          <div v-if="authStore.isAuthenticated" class="mt-4">
            <router-link
              to="/list-notifications"
              @click="closeMobileMenu"
              class="flex items-center text-gray-700 hover:text-teal-500 font-medium text-lg"
            >
              <span>Thông báo</span>
            </router-link>
          </div>
        </div>

        <!-- Mobile auth buttons -->
        <div class="pt-3 space-y-4">
          <div v-if="authStore.isAuthenticated">
            <router-link
              to="/create-post"
              @click="closeMobileMenu"
              class="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition duration-150 mb-4 text-base"
            >
              <Edit size="18" class="mr-2" />
              <span>Đăng tin</span>
            </router-link>

            <!-- Simplified User Profile Menu for Mobile -->
            <div class="border-t pt-4">
              <DropdownMenu
                :closeMobileMenuFn="closeMobileMenu"
                :isMobile="true"
              />
            </div>
          </div>
          <div v-else class="space-y-4 pb-8">
            <router-link
              to="/create-post"
              @click="closeMobileMenu"
              class="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition duration-150 text-base"
            >
              <Edit size="18" class="mr-2" />
              <span>Đăng tin</span>
            </router-link>
            <router-link
              to="/login"
              @click="closeMobileMenu"
              class="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition duration-150 text-base"
            >
              Đăng nhập
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useAuthStore } from "@/stores/store";
import logo from "@/assets/vnua-sv-logo.jpg";
import DropdownMenu from "@/components/header/DropdownMenu.vue";
import { Bell, Edit, ChevronDown, Menu, X } from "lucide-vue-next";
import ActionNotificationsDropdown from "@/components//notifications/Notification.vue";

const authStore = useAuthStore();

// Biến kiểm tra header sticky khi cuộn trang
const isSticky = ref(false);

// Biến điều khiển hiển thị dropdown "Tìm trọ"
const showRoomDropdown = ref(false);
let hideRoomTimeout = null;

// Biến điều khiển hiển thị dropdown "Dịch vụ"
const showServiceDropdown = ref(false);
let hideServiceTimeout = null;

// Biến điều khiển hiển thị dropdown "Cửa hàng"
const showShopDropdown = ref(false);
let hideShopTimeout = null;

// Biến điều khiển mobile menu
const mobileMenuOpen = ref(false);

// Biến theo dõi kích thước màn hình
const windowWidth = ref(window.innerWidth);

// Xử lý sự kiện cuộn trang để làm header cố định
const handleScroll = () => {
  isSticky.value = window.scrollY > window.innerHeight;
};

// Xử lý khi thay đổi kích thước màn hình
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  // Đóng mobile menu khi chuyển sang desktop
  if (windowWidth.value >= 768 && mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
    document.body.classList.remove("menu-open");
  }
};

// Gắn và hủy bỏ sự kiện
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  handleResize(); // Khởi tạo kích thước ban đầu
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});

// Watch để thêm/xóa class 'menu-open' vào body khi mobile menu thay đổi
watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
  }
});

// Hàm hiển thị dropdown Tìm trọ
const showRoomMenu = () => {
  clearTimeout(hideRoomTimeout);
  showRoomDropdown.value = true;
};

// Hàm ẩn dropdown Tìm trọ với độ trễ
const hideRoomMenu = () => {
  hideRoomTimeout = setTimeout(() => {
    showRoomDropdown.value = false;
  }, 150);
};

// Hàm hiển thị dropdown Dịch vụ
const showServiceMenu = () => {
  clearTimeout(hideServiceTimeout);
  showServiceDropdown.value = true;
};

// Hàm ẩn dropdown Dịch vụ với độ trễ
const hideServiceMenu = () => {
  hideServiceTimeout = setTimeout(() => {
    showServiceDropdown.value = false;
  }, 150);
};

// Hàm hiển thị dropdown Cửa hàng
const showShopMenu = () => {
  clearTimeout(hideShopTimeout);
  showShopDropdown.value = true;
};

// Hàm ẩn dropdown Cửa hàng với độ trễ
const hideShopMenu = () => {
  hideShopTimeout = setTimeout(() => {
    showShopDropdown.value = false;
  }, 150);
};

// Biến và hàm điều khiển hiển thị dropdown thông báo
const showNotifications = ref(false);
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

// Hàm đóng mở mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Đóng mobile menu khi click vào một liên kết
const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

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

/* Ngăn cuộn trang khi mobile menu đang mở */
body.menu-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}

/* Mobile first custom breakpoint for extremely small screens */
@media (max-width: 360px) {
  .menu-open {
    position: fixed;
    width: 100%;
  }
}

/* Custom transition for dropdown icons */
.transform {
  transition: transform 0.2s ease-in-out;
}
.rotate-180 {
  transform: rotate(180deg);
}

/* Thêm media queries cho responsive */
@media (max-width: 639px) {
  /* Styles cho màn hình cực nhỏ */
  .text-base {
    font-size: 0.95rem;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  /* Styles cho màn hình nhỏ */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles cho tablet */
  .space-x-6 {
    column-gap: 1rem;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  /* Styles cho desktop nhỏ */
  .lg\:space-x-12 {
    column-gap: 2.5rem;
  }
}

@media (min-width: 1280px) {
  /* Styles cho desktop lớn */
  .lg\:px-15 {
    padding-left: 3.75rem;
    padding-right: 3.75rem;
  }
}
</style>
