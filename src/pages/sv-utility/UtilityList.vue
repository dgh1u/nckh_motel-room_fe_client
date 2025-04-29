<template>
  <DefaultWhiteLayout>
    <div class="pt-6 px-6 bg-white">
      <div
        class="text-3xl font-bold flex flex-col items-center justify-center flex-wrap space-y-2"
      >
        <span class="text-teal-500"> TIỆN ÍCH </span>
        <span class="text-lg font-normal">
          Kênh thông tin Dịch vụ khu vực Học viện Nông nghiệp Việt Nam
        </span>
      </div>
    </div>
    <!-- Wrapper toàn trang: hướng cột trên mobile, hướng hàng ngang từ md trở lên -->
    <div class="flex flex-col md:flex-row min-h-screen py-6 bg-white">
      <!-- Bộ lọc: chiếm toàn bộ chiều rộng trên mobile, tự động shrink trên desktop -->
      <div class="w-full md:w-auto md:mr-4 mb-4 md:mb-0">
        <UtilityFilter @update:filters="handleFilterUpdate" />
      </div>
      <!-- Nội dung chính: chiếm phần còn lại -->
      <div class="flex-1 flex flex-col bg-white">
        <!-- Thanh tìm kiếm từ khóa -->
        <div class="mb-1 relative">
          <input
            v-model="filters.keywords"
            type="text"
            placeholder="Nhập tên tiện ích muốn tìm..."
            class="w-full p-3 pl-10 bg-green-50 rounded-xl shadow hover:shadow-2xl"
          />
          <Search
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <!-- Hiển thị thông báo lỗi nếu có -->
        <div v-if="errorMsg" class="p-4 text-red-600">
          {{ errorMsg }}
        </div>
        <!-- Danh sách tin đăng -->
        <div class="p-2 pb-20 flex-1 overflow-y-auto">
          <template v-if="posts.length">
            <!-- Sử dụng grid 1 cột trên mobile, 2 cột từ md trở lên -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <router-link
                v-for="post in posts"
                :key="post.id"
                :to="{ name: 'UtilityDetail', params: { id: post.id } }"
                class="block"
              >
                <RestaurantCard
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
  </DefaultWhiteLayout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import DefaultWhiteLayout from "../../layouts/DefaultWhiteLayout.vue";
import { getListPost } from "@/apis/postService.js";
import { Empty } from "ant-design-vue";
import RestaurantCard from "../../components/card/RestaurantCard.vue";
import { Search } from "lucide-vue-next";
import UtilityFilter from "../../components/filter/UtilityFilter.vue";

// Khởi tạo trạng thái bộ lọc
const filters = ref({
  keywords: "",
  districtSelected: null,
  secondMotelSelected: null,
  featuresSelected: [],
});

// Khởi tạo danh sách bài đăng
const posts = ref([]);

// Biến lưu thông báo lỗi
const errorMsg = ref("");

// Cấu hình phân trang
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
});

// Xử lý sự kiện khi nhận bộ lọc mới từ component UtilityFilter
function handleFilterUpdate(newFilters) {
  filters.value = {
    ...filters.value,
    ...newFilters,
    keywords: filters.value.keywords,
  };
  // Reset về trang 1 khi filter thay đổi
  pagination.value.current = 1;
  fetchPosts();
}

// Xây dựng query params từ bộ lọc cho API
function buildQueryParams() {
  const params = {};
  // Cấu hình loại tin đăng là TIEN_ICH
  params.motel = "TIEN_ICH";

  // Chỉ lấy tin đã duyệt và đang hiển thị
  params.approved = true;
  params.notApproved = false;
  params.del = false;

  // Thông số phân trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  // Thêm từ khóa tìm kiếm nếu có
  if (filters.value.keywords && filters.value.keywords.trim() !== "") {
    params.keywords = filters.value.keywords.trim();
  }

  // Thêm bộ lọc khu vực
  if (filters.value.districtSelected) {
    params.districtName = filters.value.districtSelected;
  }

  // Thêm bộ lọc loại tiện ích
  if (filters.value.secondMotelSelected) {
    params.secondMotel = filters.value.secondMotelSelected;
  }

  // Ánh xạ tính năng từ frontend sang tham số API
  const featureMapping = {
    has_aircon: "airConditioner",
    has_internet: "internet",
    has_parking: "parking",
    has_delivery: "delivery",
    has_dineIn: "dineIn",
    has_takeAway: "takeAway",
    has_bigSpace: "bigSpace",
  };

  // Thêm các tính năng được chọn vào params
  filters.value.featuresSelected.forEach((feature) => {
    const mappedField = featureMapping[feature];
    if (mappedField) {
      params[mappedField] = true;
    }
  });

  return params;
}

// Lấy danh sách bài đăng từ API
async function fetchPosts() {
  try {
    errorMsg.value = "";
    const queryParams = buildQueryParams();
    const response = await getListPost(queryParams);
    const data = response.data;

    if (data && data.items) {
      posts.value = data.items;
      pagination.value.total = data.total || 0;
    } else {
      posts.value = [];
      pagination.value.total = 0;
    }
  } catch (error) {
    // Giữ lại log lỗi quan trọng
    console.error("Error fetching posts:", error);
    errorMsg.value =
      "Có lỗi xảy ra khi lấy danh sách bài đăng. Vui lòng kiểm tra lại log!";
  }
}

// Xử lý khi người dùng chuyển trang
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  // Cuộn lên đầu trang với hiệu ứng mượt
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Khởi tạo dữ liệu khi component được mount
onMounted(() => {
  fetchPosts();
});

// Tự động cập nhật dữ liệu khi bộ lọc thay đổi
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
