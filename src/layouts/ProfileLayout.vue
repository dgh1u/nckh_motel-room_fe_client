<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header class="bg-gray-300 p-2" />

    <!-- Main Content Area -->
    <div class="grid grid-cols-12 min-h-screen">
      <!-- Sidebar -->
      <div class="col-span-3">
        <ProfileSidebar />
      </div>

      <!-- Main content -->
      <main class="col-span-9 p-10">
        <slot />
      </main>
    </div>
    <Chatbot />
    <!-- Footer -->
    <Footer class="bg-gray-300 p-4" />
  </div>
</template>

<script setup>
import Header from "../components/header/Header.vue";
import Footer from "../components/footer/Footer.vue";
import ProfileSidebar from "../components/sidebar-profile/ProfileSidebar.vue";
import Chatbot from "../pages/chatbot/Chatbot.vue";
</script>
