<template>
  <ProfileLayout>
    <div>
      <!-- (A) Bộ lọc: Trạng thái + Hình thức + Hiển thị -->
      <div class="mb-4 flex items-center space-x-8">
        <!-- (A1) Bộ lọc trạng thái -->
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

        <!-- (A2) Bộ lọc hình thức -->
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
          </div>
        </div>

        <!-- (A3) Bộ lọc Hiển thị -->
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

      <!-- (B) Danh sách bài đăng -->
      <div v-if="posts.length">
        <router-link
          v-for="post in posts"
          :key="post.id"
          :to="{
            name:
              selectedMotelType === 'O_GHEP'
                ? 'RoommateFindDetail'
                : 'MotelDetail',
            params: { id: post.id },
          }"
          class="block"
        >
          <div class="py-2">
            <Card :post="post" data-aos="fade-left" data-aos-duration="800" />
          </div>
        </router-link>

        <!-- Component phân trang (Ant Design Vue) -->
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
import { getProfile } from "@/apis/authService";
import { getPostsByUserId } from "@/apis/postService";
import { Empty, Pagination } from "ant-design-vue";

const aEmpty = Empty;

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
 * Hàm fetchPosts() gọi API getPostsByUser với params dựa vào các bộ lọc đã chọn.
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
  // Thêm param cho hình thức (motel)
  params.motel = selectedMotelType.value;
  // Thêm param cho bộ lọc Hiển thị: del=false (Hiển thị) hay del=true (Bị ẩn)
  params.del = selectedDel.value;

  // Thêm tham số phân trang: API dùng start là số thứ tự trang (0-based) và limit là số item trên 1 trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  try {
    const postResponse = await getPostsByUserId(userId.value, params);
    const responseData =
      postResponse && postResponse.data ? postResponse.data : {};
    console.log("Posts API full data:", responseData);

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
        console.error("Server error:", responseData.error);
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
    console.error("Error fetching posts:", error);
  }
}

/**
 * Xử lý khi người dùng chuyển trang
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
 * Khi component mount:
 * - Gọi getProfile để lấy userId.
 * - Sau đó gọi fetchPosts() với các bộ lọc mặc định.
 */
onMounted(async () => {
  try {
    const profileResponse = await getProfile();
    console.log("User Profile:", profileResponse);
    const profileData = profileResponse.data;
    userId.value = profileData.data ? profileData.data.id : profileData.id;
    console.log("User ID:", userId.value);
    await fetchPosts();
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
});
</script>
