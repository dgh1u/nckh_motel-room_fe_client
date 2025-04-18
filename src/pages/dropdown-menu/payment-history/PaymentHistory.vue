<template>
  <ProfileLayout>
    <div class="block items-center pb-8 justify-center flex">
      <span class="font-bold text-3xl text-teal-500">Lịch sử nạp tiền</span>
    </div>
    <div class="p-4">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span>Lọc theo ngày: </span>
          <!-- DatePicker "Từ ngày" -->
          <a-date-picker
            v-model:value="startDate"
            placeholder="Từ ngày"
            @change="handleDateChange"
            :disabled-date="disabledStartDate"
          />
          <MoveRightIcon class="ml-2 h-4 w-4" />
          <!-- DatePicker "Đến ngày" -->
          <a-date-picker
            v-model:value="endDate"
            placeholder="Đến ngày"
            @change="handleDateChange"
            :disabled-date="disabledEndDate"
          />
        </div>
        <span class="text-gray-700">
          Tổng số tiền đã nạp: {{ totalDeposited }}₫
        </span>
      </div>
      <a-table
        :columns="columns"
        :data-source="paymentItems"
        row-key="id"
        :pagination="pagination"
        bordered
        @change="handleTableChange"
      />
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted, computed, h } from "vue";
import { getListPayment } from "@/apis/paymentService.js";
import { getProfile } from "@/apis/authService.js";
import { message } from "ant-design-vue";
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import dayjs from "dayjs";
import { MoveRightIcon } from "lucide-vue-next";
// Import hàm getBankData từ bankMapping.js
import { getBankData } from "../../../components/bank-name/bankName";

// Danh sách giao dịch thanh toán
const paymentItems = ref([]);

// Date picker: sử dụng đối tượng dayjs
const startDate = ref(null);
const endDate = ref(null);

// Cấu hình các cột của bảng
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 10,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Mã giao dịch",
    dataIndex: "orderCode",
    key: "orderCode",
  },
  {
    title: "Ngày nạp",
    dataIndex: "transactionDateTime",
    key: "transactionDateTime",
  },
  {
    title: "Số tài khoản",
    dataIndex: "counterAccountNumber",
    key: "counterAccountNumber",
  },
  {
    title: "Ngân hàng",
    dataIndex: "counterAccountBankId",
    key: "counterAccountBankId",
    // Sử dụng customRender để hiển thị logo và tên
    customRender: ({ text }) => {
      const bankData = getBankData(text);
      return h("div", { class: "flex items-center space-x-2" }, [
        bankData.logo
          ? h("img", { src: bankData.logo, alt: "Bank Logo", class: "w-8" })
          : null,
        h("span", { class: "text-gray-600" }, bankData.name),
      ]);
    },
  },
  {
    title: "Số tiền nạp",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
    render: (text) => `${text} VND`,
  },
];

// Cấu hình phân trang
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
  showTotal: (total) => `Tổng cộng: ${total} bản ghi`,
});

// Hàm lấy danh sách giao dịch thanh toán từ API
async function fetchPayments() {
  try {
    const profileResponse = await getProfile();
    const userId = profileResponse.data.id;
    const params = {
      userId,
      start: Math.max(pagination.value.current - 1, 0),
      limit: pagination.value.pageSize,
      startDate: startDate.value ? startDate.value.format("YYYY-MM-DD") : null,
      endDate: endDate.value ? endDate.value.format("YYYY-MM-DD") : null,
    };
    const res = await getListPayment(params);
    if (res.data && res.data.items) {
      paymentItems.value = res.data.items;
      pagination.value.total = res.data.total || 0;
    } else {
      throw new Error("Dữ liệu API không hợp lệ");
    }
  } catch (error) {
    message.error(`Lỗi tải dữ liệu: ${error.message}`);
  }
}

// Xử lý thay đổi phân trang bảng
function handleTableChange(paginationObj) {
  pagination.value.current = Math.max(paginationObj.current, 1);
  pagination.value.pageSize = paginationObj.pageSize;
  fetchPayments();
}

// Khi thay đổi bộ lọc ngày, reset trang về 1 và gọi lại API
function handleDateChange() {
  pagination.value.current = 1;
  fetchPayments();
}

// Disable các ngày trong DatePicker "Đến ngày"
function disabledEndDate(current) {
  if (!startDate.value) return false;
  return current && !current.isAfter(startDate.value, "day");
}

// Disable các ngày trong DatePicker "Từ ngày"
function disabledStartDate(current) {
  if (!endDate.value) return false;
  return current && !current.isBefore(endDate.value, "day");
}

// Tính tổng số tiền đã nạp từ danh sách giao dịch
const totalDeposited = computed(() =>
  paymentItems.value.reduce((sum, item) => sum + (item.amount || 0), 0)
);

onMounted(() => {
  fetchPayments();
});
</script>
