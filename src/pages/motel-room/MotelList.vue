<template>
  <DefaultLayout>
    <div class="pt-6 px-6">
      <div
        class="text-3xl font-bold flex flex-col items-center justify-center flex-wrap space-y-2"
        data-aos="zoom-out"
        data-aos-duration="800"
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
        <div class="mb-1" data-aos="zoom-out" data-aos-duration="800">
          <input
            v-model="filters.keywords"
            type="text"
            placeholder="Tìm tin đăng..."
            class="w-full p-3 bg-green-100 rounded-xl shadow hover:shadow-2xl"
          />
        </div>
        <!-- Hiển thị thông báo lỗi nếu có -->
        <div v-if="errorMsg" class="p-4 text-red-600">
          {{ errorMsg }}
        </div>
        <!-- Danh sách tin đăng -->
        <div class="p-4 pb-20 flex-1 overflow-y-auto">
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
// Nếu dùng Ant Design Vue, import Pagination component
import { Pagination, Empty } from "ant-design-vue";

const aEmpty = Empty;

// State bộ lọc
const filters = ref({
  keywords: "",
  priceRange: [0, 30],
  acreageRange: [5, 95],
  districtsSelected: [],
  featuresSelected: [],
});

// Danh sách bài đăng
const posts = ref([]);

// Thông báo lỗi
const errorMsg = ref("");

// Biến pagination (giống logic user)
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
});

// Hàm xử lý sự kiện nhận bộ lọc từ MotelFilter
function handleFilterUpdate(newFilters) {
  filters.value = { ...filters.value, ...newFilters };
  // Reset về trang 1 mỗi khi filter thay đổi
  pagination.value.current = 1;
  fetchPosts();
}

// Hàm chuyển đổi bộ lọc FE sang query params cho backend
function buildQueryParams() {
  const params = {};
  // Luôn gán motel là "PHONG_TRO"
  params.motel = "PHONG_TRO";

  // Thêm start, limit cho phân trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  if (filters.value.keywords && filters.value.keywords.trim() !== "") {
    params.keywords = filters.value.keywords.trim();
  }
  if (filters.value.priceRange && filters.value.priceRange.length === 2) {
    params.minPrice = filters.value.priceRange[0] * 1000000;
    params.maxPrice = filters.value.priceRange[1] * 1000000;
  }
  if (filters.value.acreageRange && filters.value.acreageRange.length === 2) {
    params.minAcreage = filters.value.acreageRange[0];
    params.maxAcreage = filters.value.acreageRange[1];
  }
  if (
    filters.value.districtsSelected &&
    filters.value.districtsSelected.length > 0
  ) {
    params.districtName = filters.value.districtsSelected[0];
  }
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
  filters.value.featuresSelected.forEach((feature) => {
    const mappedField = featureMapping[feature];
    if (mappedField) {
      params[mappedField] = true;
    }
  });
  return params;
}

// Hàm gọi API và cập nhật danh sách bài đăng
async function fetchPosts() {
  try {
    errorMsg.value = "";
    const queryParams = buildQueryParams();
    const response = await getListPost(queryParams);
    const data = response.data; // Giả sử API trả về {success, error, total, items}

    if (data && data.items) {
      posts.value = data.items;
      // Lấy tổng số items để cập nhật pagination
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

// Xử lý khi người dùng chuyển trang
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  // Cuộn lên đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth", // hoặc bỏ "smooth" nếu không muốn hiệu ứng
  });
}

onMounted(() => {
  fetchPosts();
});

// Nếu bạn muốn lắng nghe thay đổi filter để auto load
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
