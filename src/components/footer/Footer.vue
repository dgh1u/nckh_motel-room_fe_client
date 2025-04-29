<template>
  <footer class="bg-white text-white pt-8 pb-4">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-14 gap-4">
        <!-- Thông tin công ty (chiếm 5 cột) -->
        <div class="md:col-span-5 pl-4">
          <div class="flex flex-col mb-4">
            <img
              src="@/assets/vnua-sv-logo.jpg"
              width="100"
              alt="Logo"
              class="mb-3"
            />
            <span class="flex text-lg text-black font-semibold">
              Kênh thông tin Dịch vụ VNUA SERVICES
            </span>
          </div>
          <p class="text-black text-base leading-relaxed mb-4">
            VNUA Services là Website kênh thông tin cung cấp tất cả các thông
            tin về Dịch vụ xung quanh khu vực Học viện Nông Nghiệp Việt Nam
            (VNUA).
          </p>
        </div>

        <!-- Chính sách bảo mật -->
        <div class="md:col-span-2">
          <h6 class="text-lg text-black font-semibold mb-4">
            Chính sách bảo mật
          </h6>
          <ul class="space-y-2 text-base text-black">
            <li>
              <a
                href="/privacy-policy#intro"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Chính sách
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy#data-collection"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Thu thập dữ liệu
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy#data-usage"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Tiếp thị trực tiếp
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy#direct-marketing"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Truyền và chia sẻ dữ liệu
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy#data-transfer"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Bảo mật dữ liệu
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy#data-security"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Lưu giữ dữ liệu cá nhân
              </a>
            </li>
          </ul>
        </div>

        <!-- Các tính năng của website -->
        <div class="md:col-span-2">
          <h6 class="text-lg text-black font-semibold mb-4">Tính năng</h6>
          <ul class="space-y-2 text-base text-black">
            <li>
              <a
                href="/profile"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Thông tin tài khoản
              </a>
            </li>
            <li>
              <a
                href="/create-post"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Đăng tin
              </a>
            </li>
            <li>
              <a
                href="/payment"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Nạp tiền
              </a>
            </li>
            <li>
              <a
                href="/list-notifications"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Thông báo
              </a>
            </li>
          </ul>
        </div>

        <!-- Các đường dẫn nhanh -->
        <div class="md:col-span-2">
          <h6 class="text-lg text-black font-semibold mb-4">Link nhanh</h6>
          <ul class="space-y-2 text-base text-black">
            <li>
              <a
                href="/post/motel"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Tìm nhà trọ
              </a>
            </li>
            <li>
              <a
                href="/post/roommate"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Tìm người ở ghép
              </a>
            </li>
            <li>
              <a
                href="/create-post"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Cửa hàng
              </a>
            </li>
            <li>
              <a
                href="/payment"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Giao hàng
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        <!-- Thông tin liên hệ -->
        <div class="md:col-span-3">
          <h6 class="text-lg text-black font-semibold mb-4">Liên Hệ</h6>
          <ul class="space-y-3 text-base text-black">
            <li class="flex items-center">
              <Phone class="w-5 h-5 mr-3 text-blue-400" />
              <a
                href="tel:0981266403"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                +849 8126 6403
              </a>
            </li>
            <li class="flex items-center">
              <Mail class="w-5 h-5 mr-3 text-blue-400" />
              <a
                href="mailto:hieutkhd03@gmail.com"
                class="hover:text-blue-400 transition-colors duration-200"
              >
                hieutkhd03@gmail.com
              </a>
            </li>
            <li class="flex items-center">
              <MapPin class="w-5 h-5 mr-3 text-blue-400" />
              <span>36 Trâu Quỳ, Tp Hà Nội</span>
            </li>
          </ul>

          <!-- Liên kết mạng xã hội -->
          <div class="flex space-x-4 mt-6">
            <a
              href="https://www.facebook.com/ngao.hieu.16100?locale=vi_VN"
              class="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              <Facebook class="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-green-500 flex items-center justify-center rounded-full hover:bg-green-600 transition-colors duration-200"
            >
              <MessageSquare class="w-5 h-5 text-white" />
            </a>
            <a
              href="mailto:hieutkhd03@gmail.com"
              class="w-10 h-10 bg-red-500 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <Mail class="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      <!-- Thông tin bản quyền -->
      <div class="border-gray-700 mt-8 text-center text-base text-gray-400">
        Copyright © 2025. Toàn bộ bản quyền thuộc UCK Team.
      </div>
    </div>
  </footer>
</template>

<script setup>
// Import các biểu tượng từ thư viện lucide-vue-next
import { Facebook, MessageSquare, Mail, Phone, MapPin } from "lucide-vue-next";
</script>
