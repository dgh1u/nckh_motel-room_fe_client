<template>
  <div
    class="relative inline-block"
    @mouseenter="showMenu"
    @mouseleave="hideMenu"
  >
    <!-- Nút bấm mở dropdown -->
    <button
      class="flex items-center px-2 py-2 space-x-2 text-sm font-medium"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <Bell size="20" class="mr-1" />
      <span>Thông báo</span>
    </button>

    <transition name="fade">
      <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg"
        style="z-index: 9999"
      >
        <!-- Header dropdown -->
        <div class="px-4 py-3">
          <span class="font-bold text-lg">Thông báo</span>
        </div>

        <!-- Danh sách thông báo -->
        <div class="max-h-96 overflow-y-auto">
          <ul>
            <li
              v-for="action in actions"
              :key="action.id"
              class="flex items-start px-2 py-3 mx-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              @click="goToPost(action)"
            >
              <!-- Icon hành động -->
              <component
                :is="actionIcon(action.action)"
                class="w-7 h-7 p-1 text-white rounded-full flex-shrink-0"
                :class="actionColor(action.action)"
              />
              <!-- Nội dung -->
              <div class="ml-3 text-sm leading-5 text-gray-700">
                <p>
                  <template v-if="action.action === 'CREATE'">
                    <strong>Bạn</strong> đã tạo bài đăng
                    <span class="text-teal-500">{{ action.postTitle }}</span>
                    (ID: <span class="text-amber-400">{{ action.postId }}</span
                    >) đang chờ kiểm duyệt.
                  </template>
                  <template v-else-if="action.action === 'APPROVE'">
                    <strong>ADMIN</strong> đã duyệt bài đăng
                    <span class="text-teal-500">{{ action.postTitle }}</span>

                    (ID: <span class="text-amber-400">{{ action.postId }}</span
                    >) .
                  </template>
                  <template v-else-if="action.action === 'BLOCK'">
                    <strong>ADMIN</strong> đã khóa bài đăng
                    <span class="text-teal-500">{{ action.postTitle }}</span>
                    (ID: <span class="text-amber-400">{{ action.postId }}</span
                    >) .
                  </template>
                </p>
                <!-- Thời gian -->
                <div class="text-xs text-gray-400 font-medium">
                  {{ formatTime(action.time) }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Phân trang nhỏ -->
        <div class="border-t border-gray-100 px-2 py-2 flex justify-center">
          <a-pagination
            size="small"
            :current="pagination.current"
            :pageSize="pagination.pageSize"
            :total="pagination.total"
            :showTotal="pagination.showTotal"
            @change="handlePageChange"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { PlusCircle, CheckCircle2, XCircle, Bell } from "lucide-vue-next";
import { getListAction } from "@/apis/actionService";
import { getPostsByUserId } from "@/apis/postService";

// Dropdown mở/đóng bằng hover
const showDropdown = ref(false);
let hideTimeout = null;

function showMenu() {
  clearTimeout(hideTimeout);
  showDropdown.value = true;
}
function hideMenu() {
  hideTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 150);
}

// Lấy userId từ localStorage => parse key 'auth'
let userId = null;
try {
  const authStr = localStorage.getItem("auth");
  if (authStr) {
    const authObj = JSON.parse(authStr);
    userId = authObj?.user?.id;
  }
} catch (err) {
  console.error("Lỗi parse JSON auth:", err);
}

// Mảng actions + phân trang
const actions = ref([]);
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
  showTotal: (total) => `Tổng: ${total} thông báo`,
});

onMounted(() => {
  fetchActions();
});

// Router để điều hướng
const router = useRouter();
function goToPost(action) {
  // Kiểm tra action.motel
  if (action.motel === "O_GHEP") {
    router.push(`/post/roommate/${action.postId}`);
  } else if (action.motel === "PHONG_TRO") {
    router.push(`/post/motel/${action.postId}`);
  } else {
    // Nếu không khớp, cho mặc định link motel
    router.push(`/post/motel/${action.postId}`);
  }
}

// API lấy các action
async function fetchActions() {
  try {
    if (!userId) {
      console.warn("Chưa có userId -> không thể tải thông báo.");
      return;
    }
    // Lấy danh sách post
    const postRes = await getPostsByUserId(userId, {
      start: pagination.value.current - 1,
      limit: 50,
    });
    const postData = postRes.data.data || postRes.data;
    const postItems = postData.items || [];
    const postIdsCsv = postItems.map((p) => p.id).join(",");

    if (!postIdsCsv) {
      console.info("User chưa có bài đăng -> không có action nào.");
      return;
    }

    // Lấy action theo postIds
    const actionRes = await getListAction({
      start: pagination.value.current - 1,
      limit: pagination.value.pageSize,
      postIds: postIdsCsv,
    });
    const actionResult = actionRes.data.data || actionRes.data;

    actions.value = actionResult.items || [];
    pagination.value.total = actionResult.total || 0;
  } catch (error) {
    console.error("fetchActions error:", error);
  }
}

function handlePageChange(page) {
  pagination.value.current = page;
  fetchActions();
}

/**
 * Thay vì YYYY-MM-DD hh:mm:ss,
 * hiển thị "X phút trước", "X giờ trước", "X ngày trước"...
 */
function formatTime(arr) {
  if (!Array.isArray(arr) || arr.length !== 6) return "";

  const [year, month, day, hour, minute, second] = arr;
  // Tạo Date
  const date = new Date(year, month - 1, day, hour, minute, second);

  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return "Vừa xong";
  } else if (diffMin < 60) {
    return `${diffMin} phút trước`;
  } else if (diffHour < 24) {
    return `${diffHour} giờ trước`;
  } else if (diffDay < 30) {
    return `${diffDay} ngày trước`;
  } else {
    // Nếu quá 30 ngày -> hiển thị yyyy-mm-dd
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }
}

// Icon & màu theo action
function actionIcon(type) {
  return (
    {
      CREATE: PlusCircle,
      APPROVE: CheckCircle2,
      BLOCK: XCircle,
    }[type] || PlusCircle
  );
}
function actionColor(type) {
  return (
    {
      CREATE: "bg-blue-500",
      APPROVE: "bg-green-500",
      BLOCK: "bg-red-500",
    }[type] || "bg-gray-500"
  );
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
