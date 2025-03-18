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
              @click="(selectedStatus = 'APPROVED'), fetchPosts()"
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
              @click="(selectedStatus = 'BLOCKED'), fetchPosts()"
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
              @click="(selectedStatus = 'PENDING'), fetchPosts()"
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
              @click="(selectedMotelType = 'PHONG_TRO'), fetchPosts()"
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
              @click="(selectedMotelType = 'O_GHEP'), fetchPosts()"
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
              @click="(selectedDel = false), fetchPosts()"
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
              @click="(selectedDel = true), fetchPosts()"
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
          <Card :post="post" data-aos="fade-left" data-aos-duration="800" />
        </router-link>
      </div>
      <div v-else>
        <p>No posts available</p>
      </div>
    </div>
  </ProfileLayout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import ProfileLayout from "../../../layouts/ProfileLayout.vue";
import Card from "@/components/card/Card.vue";
import { getProfile } from "@/apis/authService";
import { getPostsByUser } from "@/apis/postService";

// Lưu danh sách bài đăng
const posts = ref([]);

// Lưu userId
const userId = ref(null);

// Lưu trạng thái đang chọn (mặc định là "APPROVED")
const selectedStatus = ref("APPROVED");

// Lưu hình thức đang chọn (mặc định là "PHONG_TRO")
const selectedMotelType = ref("PHONG_TRO");

// Lưu bộ lọc Hiển thị (mặc định là "Hiển thị" -> del=false)
const selectedDel = ref(false);

/**
 * Hàm fetchPosts() gọi API getPostsByUser với params dựa vào các bộ lọc đã chọn.
 */
async function fetchPosts() {
  if (!userId.value) return;

  // Tạo params cho API dựa vào trạng thái
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

  try {
    const postResponse = await getPostsByUser(userId.value, params);
    const responseData =
      postResponse && postResponse.data ? postResponse.data : {};
    console.log("Posts API full data:", responseData);

    if (typeof responseData.success !== "undefined") {
      if (responseData.success) {
        if (responseData.data && responseData.data.items) {
          posts.value = responseData.data.items;
        } else if (responseData.items) {
          posts.value = responseData.items;
        } else {
          posts.value = [];
        }
      } else {
        console.error("Server error:", responseData.error);
        posts.value = [];
      }
    } else {
      if (responseData.items) {
        posts.value = responseData.items;
      } else {
        posts.value = [];
      }
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
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
