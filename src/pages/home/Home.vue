<template>
  <Layout>
    <!-- Room Search and Roommate Finding Section -->
    <div class="pb-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10" data-aos="zoom-out">
          <div class="pb-3">
            <span class="text-center text-3xl font-bold">
              Tìm nhà trọ hoặc tìm người ở ghép
            </span>
          </div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Hỗ trợ tìm kiếm phòng trọ phù hợp hoặc kết nối với người ở ghép khu
            vực Học viện Nông nghiệp Việt Nam
          </p>
        </div>

        <!-- Split layout - Image on left, Content on right -->
        <div class="flex flex-col md:flex-row gap-8 mt-6">
          <!-- Left side - Image -->
          <div class="w-full md:w-3/5" data-aos="fade-right">
            <div class="h-full overflow-hidden">
              <img
                src="@/assets/motel.png"
                alt="Phòng trọ sinh viên"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Right side - Content -->
          <div class="w-full md:w-2/5" data-aos="fade-left">
            <div class="bg-white pt-4 h-full">
              <span class="text-2xl font-bold mb-8 text-gray-800 block">
                Tìm nhà trọ hoặc tìm người ở ghép khu vực Học viện Nông nghiệp
                Việt Nam
              </span>
              <div class="text-base">
                <span class="block text-gray-600 mb-4 text-left">
                  Chúng tôi hiểu rằng việc tìm kiếm một nơi ở phù hợp là một
                  trong những thách thức lớn nhất đối với sinh viên. Với đa dạng
                  các lựa chọn từ ký túc xá đến căn hộ dịch vụ, chúng tôi cung
                  cấp giải pháp phù hợp với mọi ngân sách.
                </span>

                <span class="block text-gray-600 mb-4 text-left">
                  Tất cả các phòng trọ trên nền tảng của chúng tôi đều được kiểm
                  duyệt kỹ lưỡng để đảm bảo độ tin cậy và an toàn cho sinh viên.
                </span>

                <span class="block text-gray-600 mb-4 text-left">
                  Dịch vụ tìm kiếm phòng trọ nhanh chóng và hiệu quả dành riêng
                  cho sinh viên Học viện Nông nghiệp Việt Nam.
                </span>

                <span class="block text-gray-600 mb-4 text-left">
                  Kết nối những người có nhu cầu ở ghép, giúp giảm chi phí và
                  tạo môi trường sống thân thiện. Tìm được 1 bạn cùng phòng chất
                  lượng phù hợp với nhu cầu bản thân.
                </span>
              </div>

              <div class="flex flex-col sm:flex-row gap-4 mt-6 text-white">
                <router-link
                  to="/post/motel"
                  class="hover:scale-103 flex-1 bg-teal-500 hover:bg-teal-600 font-medium py-2.5 px-4 rounded-xl transition duration-300"
                >
                  Tìm phòng trọ
                </router-link>
                <router-link
                  to="/post/roommate"
                  class="hover:scale-103 flex-1 bg-blue-500 hover:bg-blue-600 font-medium py-2.5 px-4 rounded-xl transition duration-300"
                >
                  Tìm người ở ghép
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Local Shops Information Section -->
    <div class="py-24">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10" data-aos="zoom-out">
          <div class="pb-3">
            <span class="text-center text-3xl font-bold">
              Các dịch vụ tiện ích khu vực Học viện Nông nghiệp Việt Nam
            </span>
          </div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Khám phá các cửa hàng và dịch vụ thiết yếu gần khu vực trường học
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Food Card -->
          <router-link
            to="/post/restaurant"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105"
            data-aos="zoom-in"
          >
            <div class="h-40 overflow-hidden" data-aos="zoom-in">
              <img
                src="@/assets/home-page/nem-nuong.jpg"
                alt="Nhà hàng & Quán ăn"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <div class="flex items-center mb-2">
                <Utensils class="w-5 h-5 text-orange-500 mr-2 mb-2" />
                <h3 class="font-semibold text-lg">Nhà hàng & Quán ăn</h3>
              </div>
              <p class="text-gray-600 text-sm mb-3">
                Các lựa chọn ẩm thực phong phú từ đồ ăn nhanh đến quán ăn bình
                dân.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <MapPin class="w-4 h-4 mr-1" />
                <span>15+ địa điểm</span>
              </div>
            </div>
          </router-link>

          <!-- Convenience Store Card -->
          <router-link
            to="/post/store"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105"
            data-aos="zoom-in"
          >
            <div class="h-40 overflow-hidden">
              <img
                src="@/assets/home-page/circlek.jpg"
                alt="Cửa hàng"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <div class="flex items-center mb-2">
                <ShoppingBag class="w-5 h-5 text-blue-500 mr-2 mb-2" />
                <h3 class="font-semibold text-lg">Cửa hàng</h3>
              </div>
              <p class="text-gray-600 text-sm mb-3">
                Các cửa hàng tiện lợi 24/7 cung cấp đầy đủ nhu yếu phẩm cho sinh
                viên.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <MapPin class="w-4 h-4 mr-1" />
                <span>8+ địa điểm</span>
              </div>
            </div>
          </router-link>

          <!-- Cafe Card -->
          <router-link
            to="/post/beverage"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105"
            data-aos="zoom-in"
          >
            <div class="h-40 overflow-hidden">
              <img
                src="@/assets/home-page/starbucks.jpg"
                alt="Quán cà phê"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <div class="flex items-center mb-2">
                <Coffee class="w-5 h-5 text-amber-700 mr-2 mb-2" />
                <h3 class="font-semibold text-lg">Quán cà phê</h3>
              </div>
              <p class="text-gray-600 text-sm mb-3">
                Không gian học tập và thư giãn lý tưởng cho sinh viên với wifi
                miễn phí.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <MapPin class="w-4 h-4 mr-1" />
                <span>12+ địa điểm</span>
              </div>
            </div>
          </router-link>

          <!-- Services Card -->
          <router-link
            to="/post/utility"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105"
            data-aos="zoom-in"
          >
            <div class="h-40 overflow-hidden">
              <img
                src="@/assets/home-page/photocopy.jpg"
                alt="Tiện ích"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <div class="flex items-center mb-2">
                <BookOpen class="w-5 h-5 text-emerald-600 mr-2 mb-1.5" />
                <h3 class="font-semibold text-lg">Tiện ích</h3>
              </div>
              <p class="text-gray-600 text-sm mb-3">
                Photocopy, in ấn, giặt là và các tiện ích khác phục vụ sinh
                viên.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <MapPin class="w-4 h-4 mr-1" />
                <span>10+ địa điểm</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="text-center mt-8">
          <router-link
            to="/post/restaurant"
            class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg inline-flex items-center transition-all"
            data-aos="fade-right"
          >
            Xem tất cả dịch vụ
            <ArrowRight class="w-4 h-4 ml-2" />
          </router-link>
        </div>
      </div>
    </div>

    <!-- Logo Marquee Section (Preserved) -->
    <div class="pb-16" data-aos="zoom-out">
      <div class="container mx-auto px-4">
        <div class="pb-10">
          <span class="text-center text-3xl font-bold">
            Đối tác của chúng tôi
          </span>
        </div>
        <Vue3Marquee :clone="true" :duration="10" :direction="'reverse'">
          <img
            v-for="img in imgArray"
            :key="img"
            :src="img"
            class="mx-8 w-full h-12"
          />
        </Vue3Marquee>
      </div>
    </div>

    <!-- Testimonials Slider Section -->
    <div class="py-16">
      <div class="py-8 bg-teal-500 rounded-2xl text-white">
        <div class="container mx-auto px-4">
          <div class="pb-3" data-aos="zoom-out">
            <span class="text-3xl font-bold text-center mb-4">
              Phản hồi từ mọi người
            </span>
          </div>
          <div class="pb-10 mx-auto" data-aos="zoom-out">
            <span class="text-center text-base mx-auto mb-12">
              Nhiều người thường chia sẻ về trải nghiệm sử dụng tại VNUA
              Services - một kênh thông tin Dịch vụ đầy hữu ích khu vực Học viện
              Nông Nghiệp Việt Nam.
            </span>
          </div>
          <!-- Testimonial Slider -->
          <div class="relative px-10">
            <!-- Prev Button -->
            <button
              @click="prevTestimonial"
              class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft class="w-6 h-6 text-white" />
            </button>

            <!-- Testimonial Carousel -->
            <div class="overflow-hidden">
              <div
                class="flex transition-transform duration-300 ease-in-out"
                :style="{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }"
              >
                <!-- Testimonial Card 1 (Đã được viết lại) -->
                <div class="w-full md:w-1/2 lg:w-1/2 flex-shrink-0 px-4">
                  <div
                    class="bg-mint-50 rounded-3xl overflow-hidden text-gray-800 h-full max-w-xl mx-auto"
                    data-aos="zoom-in"
                  >
                    <div class="p-6">
                      <div class="p-2 mb-3 inline-block rounded text-sm">
                        "Trang web thực sự hữu ích cho sinh viên chúng tôi!"
                      </div>

                      <p class="text-gray-600 mb-4 text-sm">
                        Tôi đã tìm được phòng trọ gần trường chỉ sau 2 ngày sử
                        dụng trang web này. Giá cả hợp lý và đúng như mô tả. Cảm
                        ơn đội ngũ phát triển đã tạo ra website kênh thông tin
                        dịch vụ tuyệt vời này. Mong trong tương lai được sử dụng
                        nhiều sản phẩm của bạn hơn.
                      </p>

                      <div class="flex items-center mb-3">
                        <div class="flex">
                          <Star
                            class="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            v-for="i in 5"
                            :key="i"
                          />
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 mr-3 rounded-full overflow-hidden bg-blue-500"
                        >
                          <img
                            src="@/assets/home-page/nu1.jpg"
                            alt="User Avatar"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <span
                            class="font-medium text-sm leading-tight text-left"
                          >
                            Nguyễn Thị Minh Tâm
                          </span>
                          <span class="text-xs text-gray-600 leading-tight">
                            Sinh viên năm 2 - khoa Kinh tế
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="h-48 overflow-hidden">
                      <img
                        src="@/assets/home-page/testimonial-1.jpg"
                        alt="Không gian phòng trọ"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <!-- Testimonial Card 2 (Đã được viết lại) -->
                <div class="w-full md:w-1/2 lg:w-1/2 flex-shrink-0 px-4">
                  <div
                    class="bg-mint-50 rounded-3xl overflow-hidden text-gray-800 h-full max-w-xl mx-auto"
                    data-aos="zoom-in"
                  >
                    <div class="p-6">
                      <div class="p-2 mb-3 inline-block rounded text-sm">
                        "Tìm được bạn ở ghép ưng ý một cách nhanh chóng"
                      </div>

                      <p class="text-gray-600 mb-4 text-sm">
                        Sau khi đăng thông tin tìm người ở ghép lên trang web,
                        chỉ sau vài giờ tôi đã có nhiều lựa chọn bạn cùng phòng
                        của mình. Giao diện dễ sử dụng và thông tin chi tiết
                        giúp tôi tìm được người hợp với thói quen sinh hoạt.Cảm
                        ơn đội ngũ phát triển đã tạo ra website kênh thông tin
                        dịch vụ tuyệt vời này.
                      </p>

                      <div class="flex items-center mb-3">
                        <div class="flex">
                          <Star
                            class="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            v-for="i in 5"
                            :key="i"
                          />
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 mr-3 rounded-full overflow-hidden bg-blue-500"
                        >
                          <img
                            src="@/assets/home-page/thay hieu.png"
                            alt="User Avatar"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <span
                            class="font-medium text-sm leading-tight text-left"
                          >
                            Ths. Trần Trung Hiếu
                          </span>
                          <span class="text-xs text-gray-600 leading-tight">
                            Giảng viên - khoa Công nghệ thông tin
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="h-48 overflow-hidden">
                      <img
                        src="@/assets/home-page/testimonial-2.jpg"
                        alt="Không gian chung cư"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <!-- Testimonial Card 3 (Đã được viết lại) -->
                <div class="w-full md:w-1/2 lg:w-1/2 flex-shrink-0 px-4">
                  <div
                    class="bg-mint-50 rounded-3xl overflow-hidden text-gray-800 h-full max-w-xl mx-auto"
                  >
                    <div class="p-6">
                      <div class="p-2 mb-3 inline-block rounded text-sm">
                        "Thông tin cửa hàng chi tiết và chính xác"
                      </div>

                      <p class="text-gray-600 mb-4 text-sm">
                        Trang web cung cấp thông tin rất đầy đủ về các cửa hàng
                        quanh khu vực Học viện Nông nghiệp Việt Nam. Tôi đã tiết
                        kiệm được nhiều thời gian tìm kiếm và khám phá được
                        nhiều quán ăn ngon với giá sinh viên. Cảm ơn đội ngũ các
                        bạn đã tạo ra website này.
                      </p>

                      <div class="flex items-center mb-3">
                        <div class="flex">
                          <Star
                            class="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            v-for="i in 5"
                            :key="i"
                          />
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 mr-3 rounded-full overflow-hidden bg-blue-500"
                        >
                          <img
                            src="@/assets/home-page/nu2.jpg"
                            alt="User Avatar"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <span
                            class="font-medium text-sm leading-tight text-left"
                          >
                            Lê Thị Hồng Nhung
                          </span>
                          <span class="text-xs text-gray-600 leading-tight">
                            Sinh viên năm 1 - khoa Kế toán & QTKD
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="h-48 overflow-hidden">
                      <img
                        src="@/assets/home-page/testimonial-3.jpg"
                        alt="Không gian hiện đại"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <!-- Testimonial Card 4 (Mới) -->
                <div class="w-full md:w-1/2 lg:w-1/2 flex-shrink-0 px-4">
                  <div
                    class="bg-mint-50 rounded-3xl overflow-hidden text-gray-800 h-full max-w-xl mx-auto"
                  >
                    <div class="p-6">
                      <div class="p-2 mb-3 inline-block rounded text-sm">
                        "Tính năng lọc thông tin phòng trọ quá tiện lợi"
                      </div>

                      <p class="text-gray-600 mb-4 text-sm">
                        Tôi rất thích tính năng lọc theo khoảng giá, diện tích
                        và các tiêu chí phụ cần thiết cho 1 phòng trọ của sinh
                        viên. Chỉ cần vài thao tác đã tìm được phòng phù hợp với
                        ngân sách sinh viên. Đánh giá và bình luận từ người dùng
                        khác cũng rất hữu ích.
                      </p>

                      <div class="flex items-center mb-3">
                        <div class="flex">
                          <Star
                            class="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            v-for="i in 5"
                            :key="i"
                          />
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 mr-3 rounded-full overflow-hidden bg-blue-500"
                        >
                          <img
                            src="@/assets/home-page/nam1.jpg"
                            alt="User Avatar"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <span
                            class="font-medium text-sm leading-tight text-left"
                          >
                            Phạm Minh Đức
                          </span>
                          <span class="text-xs text-gray-600 leading-tight">
                            Sinh viên năm 4 - khoa Công nghệ thực phẩm
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="h-48 overflow-hidden">
                      <img
                        src="@/assets/home-page/testimonial-1.jpg"
                        alt="Phòng học sinh viên"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <!-- Testimonial Card 5 (Mới) -->
                <div class="w-full md:w-1/2 lg:w-1/2 flex-shrink-0 px-4">
                  <div
                    class="bg-mint-50 rounded-3xl overflow-hidden text-gray-800 h-full max-w-xl mx-auto"
                  >
                    <div class="p-6">
                      <div class="p-2 mb-3 inline-block rounded text-sm">
                        "Bản đồ tương tác giúp định vị chính xác"
                      </div>

                      <p class="text-gray-600 mb-4 text-sm">
                        Hình ảnh bản đồ tương tác giúp tôi hình dung rõ vị trí
                        phòng trọ so với trường học và các tiện ích xung quanh.
                        Tiết kiệm thời gian di chuyển và khám phá được nhiều khu
                        vực mới mẻ quanh trường. Từ đó dễ dàng hình dung để di
                        chuyển đến địa điểm thuê trọ.
                      </p>

                      <div class="flex items-center mb-3">
                        <div class="flex">
                          <Star
                            class="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            v-for="i in 5"
                            :key="i"
                          />
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 mr-3 rounded-full overflow-hidden bg-blue-500"
                        >
                          <img
                            src="@/assets/home-page/nu3.jpg"
                            alt="User Avatar"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <span
                            class="font-medium text-sm leading-tight text-left"
                          >
                            Vũ Thị Mai Anh
                          </span>
                          <span class="text-xs text-gray-600 leading-tight">
                            Sinh viên năm 2 - khoa Nông học
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="h-48 overflow-hidden">
                      <img
                        src="@/assets/home-page/testimonial-2.jpg"
                        alt="Khu vực học tập"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <!-- Testimonial Card 6 (Mới) -->
                <div class="w-full md:w-1/2 lg:w-1/2 flex-shrink-0 px-4">
                  <div
                    class="bg-mint-50 rounded-3xl overflow-hidden text-gray-800 h-full max-w-xl mx-auto"
                  >
                    <div class="p-6">
                      <div class="p-2 mb-3 inline-block rounded text-sm">
                        "Cập nhật thông tin khuyến mãi từ các cửa hàng rất hữu
                        ích"
                      </div>

                      <p class="text-gray-600 mb-4 text-sm">
                        Tính năng thông báo ưu đãi từ các cửa hàng xung quanh
                        khu vực trường giúp tôi tiết kiệm được kha khá chi phí
                        sinh hoạt. Đặc biệt là chương trình giảm giá cho sinh
                        viên và combo ăn uống được cập nhật thường xuyên.Cảm ơn
                        đội ngũ phát triển đã tạo ra website kênh thông tin dịch
                        vụ tuyệt vời này.
                      </p>

                      <div class="flex items-center mb-3">
                        <div class="flex">
                          <Star
                            class="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            v-for="i in 5"
                            :key="i"
                          />
                        </div>
                      </div>

                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 mr-3 rounded-full overflow-hidden bg-blue-500"
                        >
                          <img
                            src="@/assets/home-page/nam1.jpg"
                            alt="User Avatar"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <span
                            class="font-medium text-sm leading-tight text-left"
                          >
                            Hoàng Quốc Tuấn
                          </span>
                          <span class="text-xs text-gray-600 leading-tight">
                            Sinh viên năm 1 - khoa Công nghệ thông tin
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="h-48 overflow-hidden">
                      <img
                        src="@/assets/home-page/testimonial-3.jpg"
                        alt="Không gian cửa hàng"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next Button -->
            <button
              @click="nextTestimonial"
              class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight class="w-6 h-6 text-white" />
            </button>

            <!-- Pagination Dots -->
            <div class="flex justify-center gap-2 mt-8">
              <button
                v-for="(_, index) in testimonials"
                :key="index"
                @click="currentTestimonial = index"
                class="w-3 h-3 mx-1 rounded-full"
                :class="
                  currentTestimonial === index ? 'bg-white' : 'bg-white/30'
                "
                :aria-label="`Go to testimonial ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "../../layouts/HomeLayout.vue";
import { ref } from "vue";
import {
  Home,
  Users,
  MapPin,
  Wallet,
  CalendarClock,
  Utensils,
  ShoppingBag,
  Coffee,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-vue-next";

const imgArray = [
  "src/assets/marquee-items/logo1.svg",
  "src/assets/marquee-items/logo2.svg",
  "src/assets/marquee-items/logo3.svg",
  "src/assets/marquee-items/logo4.svg",

  "src/assets/marquee-items/payos.svg",
  "src/assets/marquee-items/vnua-logo.png",
  "src/assets/marquee-items/fita-vnua.png",
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "유승엄",
    location: "Weave Suites – Sunyu Parkside",
    quote:
      "선유도 위브스위트 선유 파크사이트에서의 경험은 정말 만족스러웠습니다",
    content:
      "선유도 위브스위트 선유 파크사이트에서의 경험은 정말 만족스러웠습니다. 시설은 매우 고급스럽고 서정적인 분위기였어요. 깨끗하고 넓은 객실에서 편안하게 지낼 수 있었습니다.",
    rating: 5,
    image: "@/assets/home-page/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Margaux Duvauchelle",
    location: "Weave Place – Hoegi",
    quote: "The staff is very nice and always available",
    content:
      "Really nice place to live in. The staff is very nice and always available if needed. I love my stay here, would definitely recommend!",
    rating: 5,
    image: "@/assets/home-page/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Nguyễn Văn Minh",
    location: "Weave Living – Hanoi",
    quote: "Tuyệt vời về mọi mặt, dịch vụ cực kỳ chuyên nghiệp",
    content:
      "Tôi đã ở đây trong vòng 3 tháng và cảm thấy rất thoải mái. Phòng ốc sạch sẽ, tiện nghi đầy đủ và đặc biệt là nhân viên rất thân thiện và hỗ trợ nhiệt tình.",
    rating: 5,
    image: "@/assets/home-page/testimonial-3.jpg",
  },
];

// Slider state
const currentTestimonial = ref(0);

// Slider navigation methods
const nextTestimonial = () => {
  currentTestimonial.value =
    (currentTestimonial.value + 1) % testimonials.length;
};

const prevTestimonial = () => {
  currentTestimonial.value =
    (currentTestimonial.value - 1 + testimonials.length) % testimonials.length;
};
</script>

<style scoped>
.bg-mint-50 {
  background-color: #f0faf9;
}
</style>
