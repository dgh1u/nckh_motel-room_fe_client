<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header class="bg-gray-300 p-2" />
    <HomeBanner />

    <!-- Main Content Area -->
    <div class="flex-1 grid grid-cols-10 gap-4 bg-white">
      <!-- Sidebar Left -->
      <div class="col-span-1 bg-white text-center">Content</div>

      <!-- Main Content -->
      <main class="col-span-8 bg-white p-4 text-center">
        <slot />
        <!-- Khu vực hiển thị nội dung trang -->
      </main>

      <!-- Sidebar Right -->
      <div class="col-span-1 bg-white p-1 text-center">Content</div>
    </div>

    <!-- Footer -->
    <Footer class="bg-gray-300 p-4" />
  </div>
</template>

<script setup>
import Header from "../components/header/Header.vue";
import Footer from "../components/footer/Footer.vue";
import HomeBanner from "../components/banner/HomeBanner.vue";
</script>
