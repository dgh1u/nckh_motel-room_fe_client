<template>
  <div class="upload-image">
    <label for="post-id">Nhập Post ID:</label>
    <input
      id="post-id"
      type="number"
      v-model.number="idPostInput"
      placeholder="VD: 1"
    />

    <label for="file-input">Chọn nhiều ảnh:</label>
    <input
      id="file-input"
      type="file"
      multiple
      @change="onFileChange"
      accept="image/*"
    />

    <button
      :disabled="!idPostInput || files?.length === 0 || uploading"
      @click="uploadImages"
    >
      {{ uploading ? "Đang tải lên..." : "Upload ảnh" }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="uploaded?.length > 0">
      <li v-for="img in uploaded" :key="img.id">
        {{ img.fileName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { uploadMultipleImages } from "@/apis/imageService";

export default {
  name: "UploadImages",
  data() {
    return {
      idPostInput: null,
      files: [],
      uploading: false,
      uploaded: [],
      error: null,
    };
  },
  methods: {
    onFileChange(e) {
      this.files = Array.from(e.target.files);
      console.log("Files selected:", this.files);
      this.uploaded = [];
      this.error = null;
    },
    async uploadImages() {
      console.log(
        "UploadImages triggered with idPost:",
        this.idPostInput,
        "and files:",
        this.files
      );
      if (!this.idPostInput || this.files.length === 0) {
        console.log("Missing idPost or files");
        return;
      }
      this.uploading = true;
      this.error = null;
      try {
        const { data } = await uploadMultipleImages(
          this.idPostInput,
          this.files
        );
        console.log("Upload successful, response data:", data);
        this.uploaded = data;
      } catch (err) {
        console.error("Error during upload:", err);
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.uploading = false;
        console.log("UploadImages completed, uploading:", this.uploading);
      }
    },
  },
};
</script>

<style scoped>
.upload-image {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.error {
  color: red;
}
</style>
