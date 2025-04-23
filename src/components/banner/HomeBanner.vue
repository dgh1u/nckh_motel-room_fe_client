<template>
  <section
    class="relative flex items-start pt-20 min-h-screen bg-white overflow-hidden"
  >
    <div
      class="container mx-auto relative mb-12 pb-3"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <div class="grid grid-cols-1 gap-y-10 lg:grid-cols-2">
        <!-- Cột trái: Nội dung chính -->
        <div>
          <div class="relative z-20 text-center lg:text-left">
            <span class="text-7xl mb-4 lg:pb-3 font-extrabold">
              Kênh thông tin
              <span class="text-blue-500 font-extrabold">Dịch vụ</span> khu vực
              <span class="text-green-400 font-extrabold">
                Học viện Nông nghiệp Việt Nam
              </span>
            </span>

            <p class="mb-4 lg:pb-3 md:pb-2 pt-10">
              <span class="mr-2 text-gray-600 text-base">
                Bạn là tân sinh viên đang tìm nhà trọ? Hay bạn đang muốn tìm một
                cửa hàng?
                <br />Kênh thông tin sẽ cung cấp cho bạn thông tin dịch vụ tại
                khu vực Học viện Nông nghiệp Việt Nam.
              </span>
            </p>
            <a
              href="/home"
              data-scroll
              data-scroll-offset="250"
              class="inline-block px-6 py-3 bg-teal-500 text-white font-bold rounded hover:bg-green-600 transition"
            >
              Tìm phòng trọ
            </a>
            <a
              href="/home"
              data-scroll
              data-scroll-offset="250"
              class="inline-block ml-2 px-6 py-3 bg-teal-500 text-white font-bold rounded hover:bg-green-600 transition"
            >
              Tìm người ở ghép
            </a>
            <a
              href="/home"
              data-scroll
              data-scroll-offset="250"
              class="inline-block ml-2 px-6 py-3 bg-teal-500 text-white font-bold rounded hover:bg-green-600 transition"
            >
              Tìm cửa hàng
            </a>
          </div>
        </div>
        <!-- Cột phải: Hình ảnh & các box -->
        <div class="lg:ml-8">
          <div class="relative lg:ml-4">
            <!-- Hình ảnh nền với hiệu ứng xoay -->
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[125%] max-w-[49.75rem]"
            >
              <div class="p-5 md:p-0">
                <img
                  src="@/assets/banner-bg.png"
                  alt="Shape"
                  class="hero-animation-spin p-5 md:p-0"
                />
              </div>
            </div>
            <!-- Các box thông điệp -->
            <div class="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div
                  class="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-4"
                >
                  <div
                    class="flex items-center justify-center bg-gray-100 rounded-lg min-h-[176px]"
                    style="backdrop-filter: blur(6px)"
                  >
                    <div
                      class="p-2 sm:p-3 xl:p-4 text-center text-xl font-bold"
                    >
                      <span class="hero-animation-fade text-gray-500">
                        Tôi cần tìm phòng trọ
                      </span>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-center bg-gray-100 rounded-lg min-h-[176px]"
                    style="backdrop-filter: blur(6px)"
                  >
                    <div
                      class="p-2 sm:p-3 xl:p-4 text-center text-xl font-bold"
                    >
                      <span
                        class="hero-animation-fade hero-animation-delay-2 text-gray-500"
                      >
                        Khu vực Học viện Nông Nghiệp Việt Nam
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-2 sm:mt-5 pt-5">
                <div
                  class="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-4"
                >
                  <div
                    class="flex items-center justify-center bg-gray-100 rounded-lg min-h-[176px]"
                    style="backdrop-filter: blur(6px)"
                  >
                    <div
                      class="p-2 sm:p-3 xl:p-4 text-center text-xl font-semibold"
                    >
                      <span
                        class="hero-animation-fade hero-animation-delay-1 text-gray-500"
                      >
                        Tôi cần tìm người ở ghép
                      </span>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-center bg-gray-100 rounded-lg min-h-[176px]"
                    style="backdrop-filter: blur(6px)"
                  >
                    <div
                      class="p-2 sm:p-3 xl:p-4 text-center text-xl font-semibold"
                    >
                      <span
                        class="hero-animation-fade hero-animation-delay-3 text-gray-500"
                      >
                        Tôi cần tìm cửa hàng
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
/* Hiệu ứng xoay cho hình ảnh nền */
.hero-animation-spin {
  animation: spin 45s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero-animation-fade {
  animation: fadeInOut 6s ease-in-out infinite;
}

.hero-animation-delay-1 {
  animation-delay: 1s;
}

.hero-animation-delay-2 {
  animation-delay: 2s;
}

.hero-animation-delay-3 {
  animation-delay: 3s;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
