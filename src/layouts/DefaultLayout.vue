<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header class="bg-gray-300 p-2" />

    <main class="text-center px-40">
      <slot />
      <!-- Khu vực hiển thị nội dung trang -->
    </main>

    <!-- Footer -->
    <Footer class="bg-gray-300 p-4" />
  </div>
</template>

<script setup>
import Header from "../components/header/Header.vue";
import Footer from "../components/footer/Footer.vue";
</script>
