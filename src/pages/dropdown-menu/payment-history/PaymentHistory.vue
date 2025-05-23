<template>
  <ProfileLayout>
    <div class="block items-center pb-8 justify-center flex">
      <span class="font-bold text-3xl text-teal-500">Lịch sử nạp tiền</span>
    </div>
    <div class="p-4">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span>Lọc theo ngày: </span>
          <!-- Chọn ngày bắt đầu -->
          <a-date-picker
            v-model:value="startDate"
            placeholder="Từ ngày"
            @change="handleDateChange"
            :disabled-date="disabledStartDate"
          />
          <MoveRightIcon class="ml-2 h-4 w-4" />
          <!-- Chọn ngày kết thúc -->
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
import { getBankData } from "../../../components/bank-name/bankName";

// Danh sách giao dịch thanh toán
const paymentItems = ref([]);

// Khởi tạo các giá trị date picker với dayjs
const startDate = ref(null);
const endDate = ref(null);

// Cấu hình các cột hiển thị trong bảng
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
    // Hiển thị logo và tên ngân hàng
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

// Cấu hình phân trang cho bảng
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
  showTotal: (total) => `Tổng cộng: ${total} bản ghi`,
});

// Lấy danh sách giao dịch thanh toán từ API
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

// Xử lý khi thay đổi phân trang
function handleTableChange(paginationObj) {
  pagination.value.current = Math.max(paginationObj.current, 1);
  pagination.value.pageSize = paginationObj.pageSize;
  fetchPayments();
}

// Xử lý khi thay đổi ngày lọc
function handleDateChange() {
  pagination.value.current = 1;
  fetchPayments();
}

// Vô hiệu hóa các ngày không hợp lệ cho ngày kết thúc
function disabledEndDate(current) {
  if (!startDate.value) return false;
  return current && !current.isAfter(startDate.value, "day");
}

// Vô hiệu hóa các ngày không hợp lệ cho ngày bắt đầu
function disabledStartDate(current) {
  if (!endDate.value) return false;
  return current && !current.isBefore(endDate.value, "day");
}

// Tính tổng số tiền đã nạp
const totalDeposited = computed(() =>
  paymentItems.value.reduce((sum, item) => sum + (item.amount || 0), 0)
);

// Khởi tạo dữ liệu khi component được mount
onMounted(() => {
  fetchPayments();
});
</script>
