<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { PlusCircle, CheckCircle2, XCircle, Bell } from "lucide-vue-next";
import { getListAction, markActionAsRead } from "@/apis/actionService";
import { getPostsByUserId } from "@/apis/postService";

// Xử lý dropdown thông báo (mở/đóng bằng hover)
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

// Lấy userId từ localStorage
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

// Quản lý danh sách thông báo và phân trang
const actions = ref([]);
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
  showTotal: (total) => `Tổng: ${total} thông báo`,
});

// Tính số lượng thông báo chưa đọc
const unreadCount = computed(() => {
  return actions.value.filter((action) => !action.isRead).length;
});

onMounted(() => {
  fetchActions();
});

// Xử lý điều hướng khi click vào thông báo
const router = useRouter();
function goToPost(action) {
  // Đánh dấu thông báo đã đọc và chuyển hướng
  markActionAsRead(action.id)
    .then(() => {
      action.isRead = true;
      // Điều hướng theo loại nhà trọ
      if (action.motel === "O_GHEP") {
        router.push(`/post/roommate/${action.postId}`);
      } else {
        router.push(`/post/motel/${action.postId}`);
      }
    })
    .catch((error) => {
      console.error("Error marking notification as read:", error);
      // Vẫn chuyển hướng ngay cả khi gặp lỗi
      if (action.motel === "O_GHEP") {
        router.push(`/post/roommate/${action.postId}`);
      } else {
        router.push(`/post/motel/${action.postId}`);
      }
    });
}

// Lấy danh sách thông báo từ API
async function fetchActions() {
  try {
    if (!userId) {
      console.warn("Chưa có userId -> không thể tải thông báo.");
      return;
    }
    // Lấy danh sách bài đăng của người dùng
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

    // Lấy các thông báo liên quan đến bài đăng
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

// Định dạng thời gian hiển thị dạng "X phút trước", "X giờ trước"...
function formatTime(arr) {
  if (!Array.isArray(arr) || arr.length !== 6) return "";

  const [year, month, day, hour, minute, second] = arr;
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
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }
}

// Trả về icon và màu sắc tương ứng cho từng loại thông báo
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

<template>
  <div
    class="relative inline-block"
    @mouseenter="showMenu"
    @mouseleave="hideMenu"
  >
    <!-- Nút hiển thị dropdown thông báo -->
    <button
      class="relative flex items-center py-2 space-x-2 text-sm font-medium"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <!-- Icon chuông thông báo và badge số lượng -->
      <div class="relative">
        <Bell size="22" class="mr-1" />
        <!-- Badge hiển thị số thông báo chưa đọc -->
        <span
          v-if="unreadCount > 0"
          class="absolute -top-1.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
        >
          {{ unreadCount }}
        </span>
      </div>
    </button>

    <transition name="fade">
      <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg"
        style="z-index: 9999"
      >
        <!-- Tiêu đề dropdown -->
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
              <!-- Icon loại thông báo -->
              <component
                :is="actionIcon(action.action)"
                class="w-7 h-7 p-1 text-white rounded-full flex-shrink-0"
                :class="actionColor(action.action)"
              />
              <!-- Nội dung thông báo -->
              <div
                :style="{ opacity: action.isRead ? 0.5 : 1 }"
                class="ml-3 text-sm leading-5 text-gray-700"
              >
                <p>
                  <template v-if="action.action === 'CREATE'">
                    <strong>Bạn</strong> đã tạo bài đăng
                    <span class="text-teal-500">{{ action.postTitle }}</span>
                    (ID: <span class="text-amber-400">{{ action.postId }}</span>
                    ) đang chờ kiểm duyệt.
                  </template>
                  <template v-else-if="action.action === 'APPROVE'">
                    <strong>ADMIN</strong> đã duyệt bài đăng
                    <span class="text-teal-500">{{ action.postTitle }}</span>
                    (ID: <span class="text-amber-400">{{ action.postId }}</span>
                    ).
                  </template>
                  <template v-else-if="action.action === 'BLOCK'">
                    <strong>ADMIN</strong> đã khóa bài đăng
                    <span class="text-teal-500">{{ action.postTitle }}</span>
                    (ID: <span class="text-amber-400">{{ action.postId }}</span>
                    ).
                  </template>
                </p>
                <!-- Thời gian thông báo -->
                <div class="text-xs text-gray-400 font-medium">
                  {{ formatTime(action.time) }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Footer hiển thị liên kết đến trang xem tất cả thông báo -->
        <div class="border-t border-gray-100 px-2 py-2 flex justify-center">
          <span
            class="text-blue-500 cursor-pointer"
            @click="router.push('/list-notifications')"
          >
            Xem tất cả thông báo
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

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
