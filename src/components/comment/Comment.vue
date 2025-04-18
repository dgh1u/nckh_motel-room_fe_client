<template>
  <div class="bg-white rounded-lg p-6 shadow mt-4">
    <div class="pb-6">
      <span class="text-xl font-bold">Bình luận</span>
    </div>
    <!-- New comment -->
    <div class="flex items-start space-x-4 mb-6">
      <img
        v-if="currentUser?.avatar || currentUser?.b64"
        :src="currentUser.avatar || `data:image/png;base64,${currentUser.b64}`"
        class="w-10 h-10 rounded-full object-cover bg-gray-200"
      />
      <div class="relative flex-1">
        <textarea
          v-model="newComment"
          rows="2"
          class="w-full bg-gray-100 rounded-3xl px-6 py-4 pr-12 focus:ring-2 focus:ring-teal-300 resize-none"
          placeholder="Viết bình luận..."
        />

        <button
          @click="handleAddComment"
          class="absolute right-4 bottom-4 focus:outline-none"
        >
          <SendHorizontal class="w-5 h-5 text-blue-500 hover:text-blue-600" />
        </button>
      </div>
    </div>

    <!-- Comments list -->
    <div v-if="comments.length">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="flex space-x-4 py-3"
      >
        <img
          v-if="comment.userDTO?.avatar || comment.userDTO?.b64"
          :src="
            comment.userDTO.avatar ||
            `data:image/png;base64,${comment.userDTO.b64}`
          "
          class="w-10 h-10 rounded-full object-cover bg-gray-200"
        />
        <div class="flex-1">
          <div class="flex justify-between items-start">
            <div class="flex flex-col items-start space-y-2">
              <div class="] bg-blue-50 rounded-2xl px-3 py-2">
                <span class="font-semibold text-gray-800">
                  {{ comment.userDTO.fullName }}
                </span>
                <span class="block text-gray-700">{{ comment.content }}</span>
              </div>

              <div
                class="flex items-center pl-2 space-x-4 text-xs text-gray-500"
              >
                <span>{{ formatDate(comment.lastUpdate) }}</span>
                <button
                  @click="handleLike(comment)"
                  class="flex items-center space-x-1 hover:text-blue-600"
                >
                  <ThumbsUpIcon
                    :class="[comment.liked ? 'text-blue-600' : 'text-gray-500']"
                    class="w-4 h-4"
                  />
                  <span>{{ comment.rate }}</span>
                </button>
              </div>
            </div>

            <!-- Dropdown menu chỉ hiển thị khi comment thuộc về currentUser -->
            <a-dropdown
              v-if="
                currentUser &&
                comment.userDTO &&
                currentUser.id === comment.userDTO.id
              "
              trigger="click"
            >
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="startEditing(comment)">
                    Chỉnh sửa
                  </a-menu-item>
                  <a-menu-item @click="confirmDelete(comment.id)">
                    Xóa
                  </a-menu-item>
                </a-menu>
              </template>
              <MoreHorizontalIcon
                class="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
              />
            </a-dropdown>
          </div>

          <div
            v-if="editingComment && editingComment.id === comment.id"
            class="mt-3 relative"
          >
            <textarea
              v-model="editingComment.content"
              rows="2"
              class="w-full bg-gray-100 rounded-3xl px-6 py-4 pr-12 focus:ring-2 focus:ring-teal-300 resize-none"
            />
            <!-- nút Hủy -->
            <button
              @click="cancelEditing"
              class="absolute right-10 bottom-4 focus:outline-none"
            >
              <CircleX class="w-5 h-5 text-red-500 hover:text-red-600" />
            </button>

            <!-- nút Lưu -->
            <button
              @click="submitEditing(comment.id)"
              class="absolute right-4 bottom-4 focus:outline-none"
            >
              <SendHorizontal
                class="w-5 h-5 text-blue-500 hover:text-blue-600"
              />
            </button>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="pt-5 items-center justify-center flex">
        <a-pagination
          size="small"
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          :total="pagination.total"
          @change="handlePageChange"
        />
      </div>
    </div>

    <div v-else class="text-center py-6 text-gray-400">
      Chưa có bình luận nào.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { message, Modal, Pagination } from "ant-design-vue";
import viVN from "ant-design-vue/es/locale/vi_VN";
import {
  ThumbsUpIcon,
  MoreHorizontalIcon,
  SendHorizontal,
  CircleX,
} from "lucide-vue-next";
import {
  getListComment,
  createComment,
  updateComment,
  deleteComment,
} from "@/apis/commentService.js";
import { getProfile } from "@/apis/authService.js";
import { useAuthStore } from "@/stores/store";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

// Props
const props = defineProps({
  idPost: { type: Number, required: true },
});

// Reactive state
const comments = ref([]);
const newComment = ref("");
const editingComment = ref(null);
const currentUser = ref(null);
const likedComments = ref([]);

// Pagination state
const pagination = ref({ current: 1, pageSize: 5, total: 0 });

dayjs.extend(relativeTime);
dayjs.locale("vi");

// Fetch current user
async function fetchProfile() {
  try {
    currentUser.value = (await getProfile()).data;
  } catch (error) {
    console.error("Lỗi khi tải profile:", error);
  }
}

// Fetch comments with pagination
async function fetchComments() {
  try {
    const params = {
      idPost: props.idPost,
      start: pagination.value.current - 1,
      limit: pagination.value.pageSize,
    };
    const { data } = await getListComment(params);

    // Lọc chỉ những comment thuộc về idPost hiện tại
    const filtered = (data.items || []).filter(
      (c) => c.idPost === props.idPost
    );

    comments.value = filtered.map((c) => ({
      ...c,
      liked: likedComments.value.includes(c.id),
    }));

    // Tổng số phải tính trên dữ liệu đã lọc
    pagination.value.total = data.total ?? filtered.length;
    console.log("TOTAL COMMENTS:", pagination.value.total);
  } catch (error) {
    message.error("Lỗi tải bình luận");
    console.error(error);
  }
}

// Handle page change
function handlePageChange(page) {
  pagination.value.current = page;
  fetchComments();
}

// Create comment
async function handleAddComment() {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated || !authStore.token?.trim()) {
    return message.warning("Bạn cần đăng nhập để bình luận.");
  }

  if (!newComment.value.trim()) {
    return message.warning("Vui lòng nhập nội dung bình luận.");
  }

  try {
    await createComment(
      { content: newComment.value, idPost: props.idPost, rate: 0 },
      authStore.token
    );
    message.success("Bình luận đã được đăng");
    newComment.value = "";
    fetchComments();
  } catch {
    message.error("Lỗi khi đăng bình luận");
  }
}

// Edit comment
function startEditing(comment) {
  editingComment.value = { ...comment };
}
function cancelEditing() {
  editingComment.value = null;
}
async function submitEditing(id) {
  if (!editingComment.value.content.trim()) {
    return message.warning("Nội dung bình luận không được để trống");
  }
  try {
    await updateComment(
      {
        id,
        content: editingComment.value.content,
        rate: editingComment.value.rate ?? 0,
      },
      localStorage.getItem("token")
    );
    message.success("Cập nhật bình luận thành công");
    editingComment.value = null;
    fetchComments();
  } catch {
    message.error("Lỗi khi cập nhật bình luận");
  }
}

// Delete comment
async function handleDeleteComment(id) {
  try {
    await deleteComment(id);
    message.success("Xóa bình luận thành công");
    likedComments.value = likedComments.value.filter((cid) => cid !== id);
    fetchComments();
  } catch {
    message.error("Lỗi khi xóa bình luận");
  }
}
function confirmDelete(id) {
  Modal.confirm({
    title: "Xác nhận xóa bình luận?",
    content: "Bạn có chắc muốn xóa bình luận này không?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk: () => handleDeleteComment(id),
  });
}

// Like/unlike
async function handleLike(comment) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated || !authStore.token?.trim()) {
    return message.warning("Bạn cần đăng nhập để thích bình luận.");
    return;
  }

  try {
    const newRate = comment.liked ? comment.rate - 1 : comment.rate + 1;
    comment.liked
      ? (likedComments.value = likedComments.value.filter(
          (id) => id !== comment.id
        ))
      : likedComments.value.push(comment.id);
    comment.liked = !comment.liked;

    await updateComment(
      { id: comment.id, content: comment.content, rate: newRate },
      authStore.token
    );

    message.success(comment.liked ? "Đã like bình luận" : "Bỏ like bình luận");
    comment.rate = newRate;
  } catch {
    message.error("Lỗi khi xử lý like bình luận");
  }
}

// Date formatting
function formatDate(dateStr) {
  return dateStr ? dayjs(dateStr).fromNow() : "";
}

// Lifecycle
onMounted(async () => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated && authStore.token?.trim() !== "") {
    console.log("Đã đăng nhập, gọi fetchProfile()");
    await fetchProfile();
  } else {
    console.log("Chưa đăng nhập, không gọi fetchProfile()");
  }

  fetchComments();
});
watch(
  () => props.idPost,
  () => {
    pagination.value.current = 1;
    fetchComments();
  }
);
</script>
