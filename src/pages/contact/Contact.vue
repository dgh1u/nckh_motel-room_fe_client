<template>
  <div
    class="min-h-screen w-full bg-gradient-to-l from-blue-100 to-gray-200 flex flex-col"
  >
    <Header class="bg-gray-300 p-2" />
    <!-- Nội dung chính -->
    <main class="flex-grow" data-aos="zoom-out" data-aos-duration="800">
      <div
        class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-20"
      >
        <!-- Cột trái: Thông tin liên hệ -->
        <div class="flex flex-col mt-8">
          <span class="text-2xl md:text-3xl font-extrabold mb-3 text-left">
            Làm việc với chúng tôi?
          </span>
          <span
            class="text-6xl md:text-7xl text-left font-extrabold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent py-2 mb-8"
          >
            Liên Hệ!
          </span>
          <a
            href="mailto:hieutkhd03@gmail.com"
            class="underline hover:text-blue-400 mt-10 mb-4 text-left text-2xl"
          >
            hieutkhd03@gmail.com
          </a>
          <div class="text-gray-800 text-left text-2xl">+84 981 266 403</div>
        </div>

        <!-- Cột phải: Form liên hệ -->
        <div class="flex">
          <form
            @submit.prevent="handleSubmit"
            class="w-full bg-transparent rounded-xl p-6 space-y-6"
          >
            <div>
              <label
                for="name"
                class="block text-lg font-medium text-gray-700 mb-2 text-left"
              >
                Họ tên
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Họ tên"
                required
                class="w-full border border-gray-300 rounded-md bg-white h-15 px-4 py-3 focus:outline-none focus:border-purple-500 text-base"
              />
            </div>

            <div
              class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0"
            >
              <div class="flex-1">
                <label
                  for="email"
                  class="block text-lg font-medium text-gray-700 mb-2 text-left"
                >
                  Email
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  class="w-full border border-gray-300 rounded-md bg-white h-15 px-4 py-3 focus:outline-none focus:border-purple-500 text-base"
                />
              </div>
              <div class="flex-1">
                <label
                  for="phone"
                  class="block text-lg font-medium text-gray-700 mb-2 text-left"
                >
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="Số điện thoại"
                  required
                  class="w-full border border-gray-300 rounded-md bg-white h-15 px-4 py-3 focus:outline-none focus:border-purple-500 text-base"
                />
              </div>
            </div>

            <div>
              <label
                for="message"
                class="block text-lg font-medium text-gray-700 mb-2 text-left"
              >
                Nội dung
              </label>
              <textarea
                id="message"
                v-model="form.text"
                rows="5"
                placeholder="Nội dung tin nhắn..."
                required
                class="w-full border border-gray-300 rounded-md bg-white px-4 py-3 focus:outline-none focus:border-purple-500 text-base"
              ></textarea>
            </div>

            <div class="text-left text-white">
              <button
                type="submit"
                class="w-full md:w-auto bg-purple-600 px-8 py-3 rounded-md hover:bg-purple-700 focus:outline-none text-lg font-semibold"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Nút Zalo cố định -->
    <a
      href="https://zalo.me/0979788685"
      target="_blank"
      class="fixed bottom-6 right-6"
    >
      <img
        src="https://vinhweb.com/assets/frontend/img/zalo.svg"
        alt="Zalo"
        class="w-14 h-14"
      />
    </a>
    <Footer class="bg-gray-300 p-4" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import emailjs from "emailjs-com";
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
// Import thông báo từ Ant Design Vue
import { message } from "ant-design-vue";

// Khởi tạo form dữ liệu liên hệ
const form = reactive({
  name: "",
  email: "",
  phone: "",
  text: "",
});

// Xử lý gửi form liên hệ qua EmailJS
const handleSubmit = async () => {
  const templateParams = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: form.text,
  };

  try {
    await emailjs.send(
      "service_hq8gusf",
      "template_nrdfm9n",
      templateParams,
      "-dwlFHLIdUwP6a7_x"
    );

    // Hiển thị thông báo thành công
    message.success("Email đã được gửi thành công!");

    // Xóa dữ liệu form sau khi gửi
    form.name = "";
    form.email = "";
    form.phone = "";
    form.text = "";
  } catch (error) {
    // Ghi log lỗi và hiển thị thông báo lỗi
    console.error("Gửi email thất bại:", error);
    message.error("Gửi email thất bại, vui lòng thử lại!");
  }
};
</script>

<style scoped>
/* CSS tùy chỉnh nếu cần */
</style>
