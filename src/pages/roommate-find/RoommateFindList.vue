<template>
  <DefaultLayout>
    <div class="pt-6 px-6">
      <div
        class="text-3xl font-bold flex flex-col items-center justify-center flex-wrap space-y-2"
      >
        <span class="text-teal-500"> TÌM NGƯỜI Ở GHÉP </span>

        <span class="text-lg font-normal"
          >Kênh thông tin phòng trọ Giá Rẻ, Chính Chủ, Mới Nhất khu vực Học viện
          Nông nghiệp Việt Nam</span
        >
      </div>
    </div>
    <!-- Wrapper toàn trang: hướng cột trên mobile, hướng hàng ngang từ md trở lên -->
    <div class="flex flex-col md:flex-row min-h-screen py-6">
      <!-- Bộ lọc: chiếm toàn bộ chiều rộng trên mobile, tự động shrink trên desktop -->
      <div class="w-full md:w-auto mr-8 mb-4 md:mb-0">
        <RoommateFilter @update:filters="handleFilterUpdate" />
      </div>

      <!-- Nội dung chính: chiếm phần còn lại -->
      <div class="flex-1 flex flex-col bg-gray-100">
        <!-- Thanh tìm kiếm và sắp xếp -->
        <div class="flex items-center gap-4">
          <!-- Thanh tìm kiếm từ khóa - bên trái -->
          <div class="flex-1 relative">
            <input
              v-model="filters.keywords"
              type="text"
              placeholder="Nhập tên tin đăng muốn tìm..."
              class="w-full p-3 pl-10 bg-green-50 rounded-xl shadow hover:shadow-2xl"
            />
            <Search
              class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>

          <!-- Nút sắp xếp - bên phải -->
          <div class="flex-shrink-0 relative">
            <!-- Dropdown Button -->
            <button
              @click="showSortDropdown = !showSortDropdown"
              class="flex items-center space-x-2 px-4 py-3 bg-teal-100 border border-teal-300 rounded-xl text-teal-700 hover:bg-teal-200 focus:outline-none min-w-[140px]"
            >
              <span class="text-sm font-medium">{{ getSortLabel() }}</span>
              <svg
                class="w-4 h-4 ml-auto transition-transform duration-200"
                :class="{ 'rotate-180': showSortDropdown }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showSortDropdown"
              class="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
            >
              <div class="py-2">
                <div
                  class="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100"
                >
                  Sắp xếp theo
                </div>

                <!-- Sort Options -->
                <div class="py-1">
                  <label
                    v-for="option in sortOptions"
                    :key="option.value"
                    class="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer hover:text-teal-500"
                    :class="{
                      'text-teal-500': sortOption === option.value,
                    }"
                  >
                    <div class="relative">
                      <input
                        type="radio"
                        :value="option.value"
                        v-model="sortOption"
                        @change="handleSortChange"
                        class="hidden"
                      />
                      <div
                        class="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center"
                        :class="{
                          'bg-teal-500 border-teal-500':
                            sortOption === option.value,
                        }"
                      >
                        <div
                          v-if="sortOption === option.value"
                          class="w-3 h-3 rounded-full bg-white"
                        ></div>
                      </div>
                    </div>
                    <span class="ml-3 text-sm text-gray-700">{{
                      option.label
                    }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Overlay để đóng dropdown khi click bên ngoài -->
        <div
          v-if="showSortDropdown"
          @click="showSortDropdown = false"
          class="fixed inset-0 z-40"
        ></div>

        <!-- Hiển thị thông báo lỗi nếu có -->
        <div v-if="errorMsg" class="p-4 text-red-600">
          {{ errorMsg }}
        </div>

        <!-- Danh sách tin đăng -->
        <div class="p-6 pb-20 flex-1 overflow-y-auto">
          <template v-if="posts.length">
            <!-- Sử dụng grid 1 cột để mỗi dòng chỉ có 1 card -->
            <div class="grid grid-cols-1 gap-4">
              <router-link
                v-for="post in posts"
                :key="post.id"
                :to="{ name: 'RoommateFindDetail', params: { id: post.id } }"
                class="block"
              >
                <Card
                  :post="post"
                  data-aos="fade-left"
                  data-aos-duration="800"
                />
              </router-link>
            </div>

            <!-- Phân trang -->
            <div class="pt-10">
              <a-pagination
                :current="pagination.current"
                :pageSize="pagination.pageSize"
                :total="pagination.total"
                show-quick-jumper
                :locale="paginationLocale"
                :itemRender="itemRender"
                @change="handlePageChange"
              />
            </div>
          </template>
          <template v-else>
            <div class="flex items-center font-semibold justify-center py-10">
              <a-empty description="Không tìm thấy tin đăng nào!" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Card from "@/components/card/Card.vue";
import { getListPost } from "@/apis/postService.js";
import RoommateFilter from "../../components/filter/RoommateFilter.vue";
import { Empty } from "ant-design-vue";
import { Search } from "lucide-vue-next";

// Khởi tạo bộ lọc mặc định
const filters = ref({
  keywords: "",
  priceRange: [0, 30],
  acreageRange: [5, 95],
  districtSelected: null,
  featuresSelected: [],
  gender: null,
});

// Khởi tạo danh sách bài đăng
const posts = ref([]);

// Biến lưu thông báo lỗi
const errorMsg = ref("");

// Cấu hình phân trang
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
});

//State cho dropdown sort
const showSortDropdown = ref(false);
const sortOption = ref("newest_first");

// Danh sách options
const sortOptions = [
  { value: "newest_first", label: "Tin mới nhất" },
  { value: "price_asc", label: "Giá thấp trước" },
  { value: "price_desc", label: "Giá cao trước" },
];

// Function lấy label hiện tại
function getSortLabel() {
  const option = sortOptions.find((opt) => opt.value === sortOption.value);
  return option ? option.label : "Tin mới nhất";
}

// Thêm function xử lý thay đổi sắp xếp
function handleSortChange() {
  showSortDropdown.value = false;
  pagination.value.current = 1;
  fetchPosts();
}

// Hàm xử lý cập nhật bộ lọc từ component con
function handleFilterUpdate(newFilters) {
  filters.value = {
    ...filters.value,
    ...newFilters,
    // Giữ lại từ khóa tìm kiếm vì không được truyền từ RoommateFilter
    keywords: filters.value.keywords,
  };
  // Reset về trang 1 khi thay đổi bộ lọc
  pagination.value.current = 1;
  fetchPosts();
}

// Xây dựng tham số truy vấn từ bộ lọc
function buildQueryParams() {
  const params = {};
  // Cố định loại phòng là "Ở GHÉP"
  params.motel = "O_GHEP";

  // Chỉ lấy tin đã được duyệt
  params.approved = true;
  params.notApproved = false;

  // Chỉ lấy tin đang hiển thị (không bị xóa)
  params.del = false;

  // Thiết lập tham số phân trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  // Thêm từ khóa tìm kiếm nếu có
  if (filters.value.keywords && filters.value.keywords.trim() !== "") {
    params.keywords = filters.value.keywords.trim();
  }

  // Thêm tham số khoảng giá
  if (filters.value.priceRange && filters.value.priceRange.length === 2) {
    params.minPrice = filters.value.priceRange[0] * 1000000;
    params.maxPrice = filters.value.priceRange[1] * 1000000;
  }

  // Thêm tham số khoảng diện tích
  if (filters.value.acreageRange && filters.value.acreageRange.length === 2) {
    params.minAcreage = filters.value.acreageRange[0];
    params.maxAcreage = filters.value.acreageRange[1];
  }

  // Thêm tham số khu vực
  if (filters.value.districtSelected) {
    params.districtName = filters.value.districtSelected;
  }

  // Ánh xạ tính năng từ frontend sang tham số API
  const featureMapping = {
    full_furniture: "interior",
    has_kitchen: "kitchen",
    has_aircon: "airConditioner",
    has_washer: "heater",
    has_internet: "internet",
    no_toilet: "toilet",
    no_owner: "owner",
    free_time: "time",
    security_24_7: "security",
    has_parking: "parking",
  };

  // Thêm các tham số tính năng đã chọn
  filters.value.featuresSelected.forEach((feature) => {
    const mappedField = featureMapping[feature];
    if (mappedField) {
      params[mappedField] = true;
    }
  });

  // Thêm tham số giới tính nếu đã chọn
  if (filters.value.gender !== null) {
    params.gender = filters.value.gender;
  }

  // Xử lý sắp xếp
  switch (sortOption.value) {
    case "newest_first":
      params.sortField = "id";
      params.sortType = "DESC";
      break;
    case "price_asc":
      params.sortField = "price";
      params.sortType = "ASC";
      break;
    case "price_desc":
      params.sortField = "price";
      params.sortType = "DESC";
      break;
    default:
      params.sortField = "id";
      params.sortType = "DESC";
  }

  return params;
}

// Gọi API lấy danh sách bài đăng
async function fetchPosts() {
  try {
    errorMsg.value = "";
    const queryParams = buildQueryParams();
    const response = await getListPost(queryParams);
    const data = response.data;

    if (data && data.items) {
      posts.value = data.items;
      // Cập nhật tổng số bài đăng cho phân trang
      pagination.value.total = data.total || 0;
    } else {
      posts.value = [];
      pagination.value.total = 0;
    }
  } catch (error) {
    // Giữ lại log lỗi này vì quan trọng cho việc debug
    console.error("Error fetching posts:", error);
    errorMsg.value =
      "Có lỗi xảy ra khi lấy danh sách bài đăng. Vui lòng kiểm tra lại log!";
  }
}

// Xử lý khi người dùng chuyển trang
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  // Cuộn lên đầu trang khi chuyển trang
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Khởi tạo dữ liệu khi component được mount
onMounted(() => {
  fetchPosts();
});

// Theo dõi sự thay đổi của bộ lọc để tự động tải lại dữ liệu
watch(
  filters,
  () => {
    fetchPosts();
  },
  { deep: true }
);
</script>

<style scoped>
/* Tuỳ chỉnh style nếu cần */
</style>
