<template>
  <DefaultLayout>
    <div class="pt-6 px-6">
      <div
        class="text-3xl font-bold flex flex-col items-center justify-center flex-wrap space-y-2"
      >
        <span class="text-teal-500"> CHO THUÊ PHÒNG TRỌ </span>
        <span class="text-lg font-normal">
          Kênh thông tin phòng trọ Giá Rẻ, Chính Chủ, Mới Nhất khu vực Học viện
          Nông nghiệp Việt Nam
        </span>
      </div>
    </div>
    <!-- Wrapper toàn trang: hướng cột trên mobile, hướng hàng ngang từ md trở lên -->
    <div class="flex flex-col md:flex-row min-h-screen py-6">
      <!-- Bộ lọc: chiếm toàn bộ chiều rộng trên mobile, tự động shrink trên desktop -->
      <div class="w-full md:w-auto md:mr-4 mb-4 md:mb-0">
        <MotelFilter @update:filters="handleFilterUpdate" />
      </div>
      <!-- Nội dung chính: chiếm phần còn lại -->
      <div class="flex-1 flex flex-col bg-gray-100">
        <!-- Thanh tìm kiếm từ khóa -->
        <div class="mb-1 relative">
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
                :to="{ name: 'MotelDetail', params: { id: post.id } }"
                class="block"
              >
                <Card
                  :post="post"
                  data-aos="fade-left"
                  data-aos-duration="800"
                />
              </router-link>
            </div>
            <!-- Phân trang (Ant Design Vue) -->
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
import MotelFilter from "@/components/filter/MotelFilter.vue";
import Card from "@/components/card/Card.vue";
import { getListPost } from "@/apis/postService.js";
import { Empty } from "ant-design-vue";
import { Search } from "lucide-vue-next";

// Khởi tạo state cho bộ lọc tìm kiếm
const filters = ref({
  keywords: "",
  priceRange: [0, 30],
  acreageRange: [5, 95],
  districtSelected: null,
  featuresSelected: [],
});

// Danh sách bài đăng
const posts = ref([]);

// Thông báo lỗi
const errorMsg = ref("");

// Cấu hình phân trang
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
});

// Xử lý cập nhật bộ lọc từ component MotelFilter
function handleFilterUpdate(newFilters) {
  filters.value = {
    ...filters.value,
    ...newFilters,
    // Giữ lại keywords vì nó không được truyền từ MotelFilter
    keywords: filters.value.keywords,
  };
  // Reset về trang 1 mỗi khi filter thay đổi
  pagination.value.current = 1;
  fetchPosts();
}

// Chuyển đổi bộ lọc từ frontend sang query params cho backend
function buildQueryParams() {
  const params = {};
  // Loại phòng trọ mặc định
  params.motel = "PHONG_TRO";

  // Trạng thái lấy List: Đã duyệt và hiển thị
  params.approved = true;
  params.notApproved = false;
  params.del = false;

  // Tham số phân trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  // Xử lý từ khóa tìm kiếm
  if (filters.value.keywords && filters.value.keywords.trim() !== "") {
    params.keywords = filters.value.keywords.trim();
  }

  // Xử lý khoảng giá (đơn vị triệu đồng -> đồng)
  if (filters.value.priceRange && filters.value.priceRange.length === 2) {
    params.minPrice = filters.value.priceRange[0] * 1000000;
    params.maxPrice = filters.value.priceRange[1] * 1000000;
  }

  // Xử lý khoảng diện tích
  if (filters.value.acreageRange && filters.value.acreageRange.length === 2) {
    params.minAcreage = filters.value.acreageRange[0];
    params.maxAcreage = filters.value.acreageRange[1];
  }

  // Xử lý khu vực
  if (filters.value.districtSelected) {
    params.districtName = filters.value.districtSelected;
  }

  // Ánh xạ tính năng từ frontend sang backend
  const featureMapping = {
    full_furniture: "interior",
    has_kitchen: "kitchen",
    has_aircon: "airConditioner",
    has_washer: "heater",
    has_internet: "internet",
    has_toilet: "toilet",
    no_owner: "owner",
    free_time: "time",
    security_24_7: "security",
    has_parking: "parking",
  };

  // Xử lý các tính năng đã chọn
  filters.value.featuresSelected.forEach((feature) => {
    const mappedField = featureMapping[feature];
    if (mappedField) {
      params[mappedField] = true;
    }
  });

  return params;
}

// Gọi API lấy danh sách phòng trọ
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
    console.error("Error fetching posts:", error);
    errorMsg.value =
      "Có lỗi xảy ra khi lấy danh sách bài đăng. Vui lòng kiểm tra lại log!";
  }
}

// Xử lý chuyển trang
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  // Cuộn lên đầu trang khi chuyển trang
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Gọi API lấy dữ liệu khi component được mount
onMounted(() => {
  fetchPosts();
});

// Theo dõi thay đổi của bộ lọc để tự động tải lại dữ liệu
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
