<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { PlusCircle, CheckCircle2, XCircle } from "lucide-vue-next";
import { getListAction, markActionAsRead } from "@/apis/actionService";
import { getPostsByUserId } from "@/apis/postService";
import DefaultLayout from "../../layouts/DefaultLayout.vue";

// Lấy userId từ localStorage (dựa vào key "auth")
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

const actions = ref([]);

// Tính số thông báo chưa đọc (nếu cần hiển thị)
const unreadCount = computed(
  () => actions.value.filter((action) => !action.isRead).length
);

const router = useRouter();

// Khai báo biến phân trang
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
});

function goToPost(action) {
  // Đánh dấu thông báo là đã đọc và điều hướng tới chi tiết bài đăng
  markActionAsRead(action.id)
    .then(() => {
      action.isRead = true;
      if (action.motel === "O_GHEP") {
        router.push(`/post/roommate/${action.postId}`);
      } else if (action.motel === "PHONG_TRO") {
        router.push(`/post/motel/${action.postId}`);
      } else {
        router.push(`/post/motel/${action.postId}`);
      }
    })
    .catch((error) => {
      console.error("Error marking notification as read:", error);
      if (action.motel === "O_GHEP") {
        router.push(`/post/roommate/${action.postId}`);
      } else if (action.motel === "PHONG_TRO") {
        router.push(`/post/motel/${action.postId}`);
      } else {
        router.push(`/post/motel/${action.postId}`);
      }
    });
}

function fetchActions() {
  if (!userId) {
    console.warn("Chưa có userId -> không thể tải thông báo.");
    return;
  }
  // Lấy danh sách bài đăng của người dùng với limit cao (ví dụ 50)
  getPostsByUserId(userId, { start: 0, limit: 50 })
    .then((postRes) => {
      const postData = postRes.data.data || postRes.data;
      const postItems = postData.items || [];
      const postIdsCsv = postItems.map((p) => p.id).join(",");
      if (!postIdsCsv) {
        console.info("User chưa có bài đăng -> không có action nào.");
        return;
      }
      // Lấy danh sách action theo các postId với phân trang
      getListAction({
        start: pagination.value.current - 1,
        limit: pagination.value.pageSize,
        postIds: postIdsCsv,
      })
        .then((actionRes) => {
          const actionResult = actionRes.data.data || actionRes.data;
          actions.value = actionResult.items || [];
          pagination.value.total = actionResult.total || 0;
        })
        .catch((error) => {
          console.error("Error fetching actions:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function handlePageChange(page) {
  pagination.value.current = page;
  fetchActions();
}

onMounted(() => {
  fetchActions();
});

/**
 * Hàm chuyển đổi thời gian từ mảng [YYYY,MM,DD,hh,mm,ss] sang định dạng "X phút/giờ/ngày trước"
 */
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

// Chọn icon và màu sắc theo kiểu thông báo
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
  <DefaultLayout>
    <div class="container mx-auto p-4">
      <div class="flex items-center justify-center">
        <span class="text-3xl font-bold mb-4">Danh sách thông báo</span>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-2">
        <ul>
          <li
            v-for="action in actions"
            :key="action.id"
            class="flex items-start p-4 mb-2 rounded-lg hover:bg-gray-100 mx-2 my-2 cursor-pointer"
            @click="goToPost(action)"
          >
            <component
              :is="actionIcon(action.action)"
              class="w-7 h-7 p-1 text-white rounded-full flex-shrink-0"
              :class="actionColor(action.action)"
            />
            <div
              :class="{ 'opacity-50': action.isRead }"
              class="ml-3 text-sm leading-5 text-gray-700"
            >
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
                  >).
                </template>
                <template v-else-if="action.action === 'BLOCK'">
                  <strong>ADMIN</strong> đã khóa bài đăng
                  <span class="text-teal-500">{{ action.postTitle }}</span>
                  (ID: <span class="text-amber-400">{{ action.postId }}</span
                  >).
                </template>
              </p>
              <div class="text-xs text-gray-400 font-medium">
                {{ formatTime(action.time) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- Phân trang -->
      <div class="mt-4 flex justify-center">
        <a-pagination
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          :total="pagination.total"
          @change="handlePageChange"
        />
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
/* Bạn có thể thêm style bổ sung nếu cần */
</style>
