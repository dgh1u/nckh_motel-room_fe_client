<template>
  <ProfileLayout>
    <div>
      <!-- Bộ lọc: Trạng thái + Hình thức + Hiển thị -->
      <div class="mb-4 flex items-center space-x-8">
        <!-- Bộ lọc trạng thái -->
        <div class="flex items-center space-x-2">
          <label class="font-bold">Trạng thái:</label>
          <div
            class="inline-flex items-center space-x-2 rounded-md border border-gray-200 bg-gray-100 p-1"
          >
            <!-- Tab "Đã duyệt" -->
            <button
              @click="(selectedStatus = 'APPROVED'), resetPage(), fetchPosts()"
              :class="
                selectedStatus === 'APPROVED'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Đã duyệt
            </button>
            <!-- Tab "Đã khoá" -->
            <button
              @click="(selectedStatus = 'BLOCKED'), resetPage(), fetchPosts()"
              :class="
                selectedStatus === 'BLOCKED'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Đã khoá
            </button>
            <!-- Tab "Chờ duyệt" -->
            <button
              @click="(selectedStatus = 'PENDING'), resetPage(), fetchPosts()"
              :class="
                selectedStatus === 'PENDING'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Chờ duyệt
            </button>
          </div>
        </div>

        <!-- Bộ lọc hình thức -->
        <div class="flex items-center space-x-2">
          <label class="font-bold">Hình thức:</label>
          <div
            class="inline-flex items-center space-x-2 rounded-md border border-gray-200 bg-gray-100 p-1"
          >
            <!-- Tab "Phòng trọ" -->
            <button
              @click="
                (selectedMotelType = 'PHONG_TRO'), resetPage(), fetchPosts()
              "
              :class="
                selectedMotelType === 'PHONG_TRO'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Phòng trọ
            </button>
            <!-- Tab "Ở ghép" -->
            <button
              @click="(selectedMotelType = 'O_GHEP'), resetPage(), fetchPosts()"
              :class="
                selectedMotelType === 'O_GHEP'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Ở ghép
            </button>
            <!-- Tab "Quán ăn" -->
            <button
              @click="
                (selectedMotelType = 'QUAN_AN'), resetPage(), fetchPosts()
              "
              :class="
                selectedMotelType === 'QUAN_AN'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Quán ăn
            </button>
            <!-- Tab "Quán nước" -->
            <button
              @click="
                (selectedMotelType = 'QUAN_NUOC'), resetPage(), fetchPosts()
              "
              :class="
                selectedMotelType === 'QUAN_NUOC'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Quán nước
            </button>
            <!-- Tab "Cửa hàng" -->
            <button
              @click="
                (selectedMotelType = 'CUA_HANG'), resetPage(), fetchPosts()
              "
              :class="
                selectedMotelType === 'CUA_HANG'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Cửa hàng
            </button>
            <!-- Tab "Tiện ích" -->
            <button
              @click="
                (selectedMotelType = 'TIEN_ICH'), resetPage(), fetchPosts()
              "
              :class="
                selectedMotelType === 'TIEN_ICH'
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Tiện ích
            </button>
          </div>
        </div>

        <!-- Bộ lọc Hiển thị -->
        <div class="flex items-center space-x-2">
          <label class="font-bold">Hiển thị:</label>
          <div
            class="inline-flex items-center space-x-2 rounded-md border border-gray-200 bg-gray-100 p-1"
          >
            <!-- Tab "Hiển thị" (del=false) -->
            <button
              @click="(selectedDel = false), resetPage(), fetchPosts()"
              :class="
                selectedDel === false
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Hiển thị
            </button>
            <!-- Tab "Bị ẩn" (del=true) -->
            <button
              @click="(selectedDel = true), resetPage(), fetchPosts()"
              :class="
                selectedDel === true
                  ? 'px-4 py-2 rounded-md bg-white text-gray-900 font-semibold text-sm'
                  : 'px-4 py-2 rounded-md text-gray-400 font-medium text-sm hover:text-gray-600'
              "
            >
              Bị ẩn
            </button>
          </div>
        </div>
      </div>

      <!-- Danh sách bài đăng -->
      <div v-if="posts.length">
        <router-link
          v-for="post in posts"
          :key="post.id"
          :to="{
            name:
              selectedMotelType === 'O_GHEP'
                ? 'RoommateFindDetail'
                : selectedMotelType === 'QUAN_AN'
                ? 'RestaurantDetail'
                : selectedMotelType === 'QUAN_NUOC'
                ? 'BeverageDetail'
                : selectedMotelType === 'CUA_HANG'
                ? 'StoreDetail'
                : selectedMotelType === 'TIEN_ICH'
                ? 'UtilityDetail'
                : 'MotelDetail',
            params: { id: post.id },
          }"
          class="block"
        >
          <div class="py-2">
            <!-- Sử dụng RestaurantCard cho các loại quán ăn, nước, cửa hàng và tiện ích -->
            <RestaurantCard
              v-if="
                ['QUAN_AN', 'QUAN_NUOC', 'CUA_HANG', 'TIEN_ICH'].includes(
                  selectedMotelType
                )
              "
              :post="post"
              data-aos="fade-left"
              data-aos-duration="800"
            />
            <!-- Sử dụng Card cho loại phòng trọ và ở ghép -->
            <Card
              v-else
              :post="post"
              data-aos="fade-left"
              data-aos-duration="800"
            />
          </div>
        </router-link>

        <!-- Phân trang -->
        <div class="pt-10 flex items-center justify-center">
          <a-pagination
            :current="pagination.current"
            :pageSize="pagination.pageSize"
            :total="pagination.total"
            show-quick-jumper
            @change="handlePageChange"
          />
        </div>
      </div>
      <div v-else class="text-center font-semibold my-30">
        <a-empty description="Không tìm thấy tin đăng nào" />
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProfileLayout from "../../../layouts/ProfileLayout.vue";
import Card from "@/components/card/Card.vue";
import RestaurantCard from "../../../components/card/RestaurantCard.vue";
import { getProfile } from "@/apis/authService";
import { getPostsByUserId } from "@/apis/postService";
import { Empty } from "ant-design-vue";

// State cho bài đăng và bộ lọc
const posts = ref([]);
const userId = ref(null);
const selectedStatus = ref("APPROVED");
const selectedMotelType = ref("PHONG_TRO");
const selectedDel = ref(false);

// State phân trang
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
});

// Hàm reset lại trang hiện tại về 1 khi thay đổi bộ lọc
function resetPage() {
  pagination.value.current = 1;
}

/**
 * Lấy danh sách bài đăng theo userId và các bộ lọc đã chọn
 */
async function fetchPosts() {
  if (!userId.value) return;

  // Tạo params dựa vào bộ lọc trạng thái
  let params = {};
  switch (selectedStatus.value) {
    case "APPROVED":
      params.approved = true;
      params.notApproved = false;
      break;
    case "BLOCKED":
      params.approved = false;
      break;
    case "PENDING":
      params.approved = true;
      params.notApproved = true;
      break;
  }
  // Thêm param cho hình thức
  params.motel = selectedMotelType.value;
  // Thêm param cho trạng thái hiển thị
  params.del = selectedDel.value;

  // Thêm tham số phân trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  try {
    const postResponse = await getPostsByUserId(userId.value, params);
    const responseData =
      postResponse && postResponse.data ? postResponse.data : {};

    // Xử lý dữ liệu trả về
    if (typeof responseData.success !== "undefined") {
      if (responseData.success) {
        if (responseData.data && responseData.data.items) {
          posts.value = responseData.data.items;
          pagination.value.total = responseData.data.total || 0;
        } else if (responseData.items) {
          posts.value = responseData.items;
          pagination.value.total =
            responseData.total || responseData.items.length;
        } else {
          posts.value = [];
          pagination.value.total = 0;
        }
      } else {
        posts.value = [];
        pagination.value.total = 0;
      }
    } else {
      if (responseData.items) {
        posts.value = responseData.items;
        pagination.value.total =
          responseData.total || responseData.items.length;
      } else {
        posts.value = [];
        pagination.value.total = 0;
      }
    }
  } catch (error) {
    posts.value = [];
    pagination.value.total = 0;
  }
}

/**
 * Xử lý sự kiện chuyển trang và cuộn lên đầu trang
 */
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Khởi tạo component: lấy thông tin người dùng và danh sách bài đăng
 */
onMounted(async () => {
  try {
    const profileResponse = await getProfile();
    const profileData = profileResponse.data;
    userId.value = profileData.data ? profileData.data.id : profileData.id;
    await fetchPosts();
  } catch (error) {
    // Xử lý lỗi khi không lấy được thông tin người dùng
  }
});
</script>
