<template>
  <footer class="bg-gray-900 text-gray-300 py-10">
    <div
      class="container mx-auto px-6"
      data-aos="zoom-out-up"
      data-aos-duration="800"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-6">
        <!-- Cột 1: Giới thiệu -->
        <div>
          <img
            src="@/assets/vnua-logo.png"
            width="50"
            alt="Logo"
            class="mb-4"
          />
          <h5 class="text-lg font-semibold mb-3">CÔNG TY TNHH VNUA SERVICES</h5>
          <p class="text-sm leading-relaxed">
            Nừn ná na na là đơn vị hàng đầu trong lĩnh vực nịnh hót và nâng tầm
            các bố lên một đẳng cấp mới. Với đội ngũ chuyên gia bợ đít chuyên
            nghiệp, công ty cam kết cung cấp những lời khen có cánh, tạo môi
            trường làm việc "tốt đẹp" nhất cho các bố.
          </p>
        </div>

        <!-- Cột 2: Quy định & Link nhanh -->
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h6 class="text-lg font-semibold mb-3">Quy Định</h6>
            <ul class="space-y-2 text-sm">
              <li>
                <span class="cursor-default hover:text-blue-400"
                  >Chính sách & quy định chung</span
                >
              </li>
              <li>
                <span class="cursor-default hover:text-blue-400"
                  >Chính sách bảo mật</span
                >
              </li>
              <li>
                <span class="cursor-default hover:text-blue-400"
                  >Chính sách bảo hành</span
                >
              </li>
              <li>
                <span class="cursor-default hover:text-blue-400"
                  >Hình thức thanh toán</span
                >
              </li>

              <li>
                <span class="cursor-default hover:text-blue-400"
                  >Quy trình làm việc</span
                >
              </li>
            </ul>
          </div>
          <div>
            <h6 class="text-lg font-semibold mb-3">Link nhanh</h6>
            <ul class="space-y-2 text-sm">
              <li>
                <span class="cursor-default hover:text-blue-400"
                  >Tìm nhà trọ</span
                >
              </li>
              <li>
                <span class="cursor-default hover:text-blue-400"
                  >Tìm người ở ghép</span
                >
              </li>
              <li>
                <span class="cursor-default hover:text-blue-400">Đăng tin</span>
              </li>
              <li>
                <span class="cursor-default hover:text-blue-400">Blog</span>
              </li>
              <li>
                <span class="cursor-default hover:text-blue-400">Liên hệ</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Cột 3: Liên hệ -->
        <div>
          <h6 class="text-lg font-semibold mb-4">Liên Hệ</h6>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center">
              <i class="bx bx-phone-call mr-2"></i> 0981 266 403
            </li>
            <li class="flex items-center">
              <i class="bx bx-envelope mr-2"></i> hieutkhd03@gmail.com
            </li>
            <li class="flex items-center">
              <i class="bx bx-map mr-2"></i> 36 Trâu Quỳ, Tp Hà Nội
            </li>
          </ul>
          <div class="flex space-x-3 mt-4">
            <!-- Link Facebook -->
            <a href="https://www.facebook.com/ngao.hieu.16100?locale=vi_VN">
              <span
                class="w-8 h-8 bg-blue-700 flex items-center justify-center rounded-full hover:bg-blue-800 transition"
              >
                <Facebook class="w-4 h-4 text-white" />
              </span>
            </a>

            <!-- Link Zalo -->
            <a href="" target="">
              <span
                class="w-8 h-8 bg-green-500 flex items-center justify-center rounded-full hover:bg-green-600 transition"
              >
                <Phone class="w-4 h-4 text-white" />
              </span>
            </a>

            <!-- Link Mail -->
            <a href="" target="">
              <span
                class="w-8 h-8 bg-red-500 flex items-center justify-center rounded-full hover:bg-red-600 transition"
              >
                <Mail class="w-4 h-4 text-white" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bản quyền -->
      <div class="text-center text-xs text-gray-400 pt-4">
        Copyright © 2025. Toàn bộ bản quyền thuộc Hiếu + Hiệp + Lâm
      </div>
    </div>
  </footer>
</template>
<script setup>
import { Facebook, MessageSquare, Mail, Phone } from "lucide-vue-next";
</script>
