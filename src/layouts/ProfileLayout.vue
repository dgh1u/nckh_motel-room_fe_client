<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header class="bg-gray-300 p-2" />

    <!-- Main Content Area with Responsive Grid -->
    <div class="flex flex-col md:grid md:grid-cols-12 min-h-screen">
      <!-- Sidebar - Ẩn trên mobile, hiển thị trên md trở lên -->
      <div class="hidden md:block md:col-span-4 lg:col-span-3">
        <ProfileSidebar />
      </div>

      <!-- Mobile Sidebar Toggle Button - Chỉ hiển thị trên mobile -->
      <div class="md:hidden sticky top-0 z-10 bg-white p-2 shadow-md">
        <button
          @click="toggleMobileSidebar"
          class="flex items-center justify-between w-full bg-gray-100 p-3 rounded-lg"
        >
          <span class="font-medium">Menu trang tài khoản</span>
          <ChevronDown
            :class="[
              showMobileSidebar ? 'transform rotate-180' : '',
              'transition-transform duration-300',
            ]"
            size="20"
          />
        </button>

        <!-- Mobile Sidebar - Collapsible -->
        <div
          v-show="showMobileSidebar"
          class="mt-2 transition-all duration-300 ease-in-out"
        >
          <ProfileSidebar />
        </div>
      </div>

      <!-- Main content -->
      <main class="w-full md:col-span-8 lg:col-span-9 p-4 md:p-6 lg:p-10">
        <slot />
      </main>
    </div>

    <Chatbot />

    <!-- Footer -->
    <Footer class="bg-gray-300 p-4" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "../components/header/Header.vue";
import Footer from "../components/footer/Footer.vue";
import ProfileSidebar from "../components/sidebar-profile/ProfileSidebar.vue";
import Chatbot from "../pages/chatbot/Chatbot.vue";
import { ChevronDown } from "lucide-vue-next";

// Trạng thái hiển thị sidebar trên mobile
const showMobileSidebar = ref(false);

// Hàm toggle sidebar trên mobile
const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value;
};
</script>
