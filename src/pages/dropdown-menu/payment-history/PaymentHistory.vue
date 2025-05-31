<template>
  <ProfileLayout>
    <div class="block items-center pb-8 justify-center flex">
      <span class="font-bold text-2xl md:text-3xl text-teal-500 text-center"
        >Lịch sử nạp tiền</span
      >
    </div>
    <div class="p-2 md:p-4">
      <!-- Filter section - responsive layout -->
      <div
        class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-2"
        >
          <span class="text-sm md:text-base whitespace-nowrap"
            >Lọc theo ngày:</span
          >
          <div class="flex items-center gap-2">
            <!-- Chọn ngày bắt đầu -->
            <a-date-picker
              v-model:value="startDate"
              placeholder="Từ ngày"
              @change="handleDateChange"
              :disabled-date="disabledStartDate"
              class="w-full sm:w-auto"
              size="small"
            />
            <MoveRightIcon class="h-4 w-4 flex-shrink-0" />
            <!-- Chọn ngày kết thúc -->
            <a-date-picker
              v-model:value="endDate"
              placeholder="Đến ngày"
              @change="handleDateChange"
              :disabled-date="disabledEndDate"
              class="w-full sm:w-auto"
              size="small"
            />
          </div>
        </div>
        <div class="text-center sm:text-right">
          <span class="text-gray-700 text-sm md:text-base font-medium">
            Tổng:
            <span class="text-teal-600 font-bold"
              >{{ formatCurrency(totalDeposited) }}₫</span
            >
          </span>
        </div>
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block">
        <a-table
          :columns="columns"
          :data-source="paymentItems"
          row-key="id"
          :pagination="pagination"
          bordered
          @change="handleTableChange"
          :scroll="{ x: 800 }"
        />
      </div>

      <!-- Mobile Cards -->
      <div class="block md:hidden">
        <div class="space-y-4">
          <div
            v-for="item in paymentItems"
            :key="item.id"
            class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-900 mb-1">
                  ID: #{{ item.id }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ item.transactionDateTime }}
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-teal-600">
                  {{ formatCurrency(item.amount) }}₫
                </div>
              </div>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Mã GD:</span>
                <span class="font-medium">{{ item.orderCode }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">STK:</span>
                <span class="font-medium">{{ item.counterAccountNumber }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Ngân hàng:</span>
                <div class="flex items-center space-x-2">
                  <img
                    v-if="getBankData(item.counterAccountBankId).logo"
                    :src="getBankData(item.counterAccountBankId).logo"
                    alt="Bank Logo"
                    class="w-6 h-6"
                  />
                  <span class="text-xs text-gray-600">
                    {{ getBankData(item.counterAccountBankId).name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Pagination -->
        <div class="mt-6 flex justify-center">
          <a-pagination
            v-model:current="pagination.current"
            :total="pagination.total"
            :pageSize="pagination.pageSize"
            :show-size-changer="false"
            :show-quick-jumper="false"
            size="small"
            @change="handlePaginationChange"
          />
        </div>
      </div>
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

// Cấu hình các cột hiển thị trong bảng (cho desktop)
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Mã giao dịch",
    dataIndex: "orderCode",
    key: "orderCode",
    width: 150,
  },
  {
    title: "Ngày nạp",
    dataIndex: "transactionDateTime",
    key: "transactionDateTime",
    width: 120,
  },
  {
    title: "Số tài khoản",
    dataIndex: "counterAccountNumber",
    key: "counterAccountNumber",
    width: 140,
  },
  {
    title: "Ngân hàng",
    dataIndex: "counterAccountBankId",
    key: "counterAccountBankId",
    width: 150,
    // Hiển thị logo và tên ngân hàng
    customRender: ({ text }) => {
      const bankData = getBankData(text);
      return h("div", { class: "flex items-center space-x-2" }, [
        bankData.logo
          ? h("img", { src: bankData.logo, alt: "Bank Logo", class: "w-8 h-8" })
          : null,
        h("span", { class: "text-gray-600 text-sm" }, bankData.name),
      ]);
    },
  },
  {
    title: "Số tiền nạp",
    dataIndex: "amount",
    key: "amount",
    width: 120,
    sorter: (a, b) => a.amount - b.amount,
    customRender: ({ text }) =>
      h(
        "span",
        { class: "font-semibold text-teal-600" },
        `${formatCurrency(text)}₫`
      ),
  },
];

// Cấu hình phân trang cho bảng
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
  showTotal: (total) => `Tổng cộng: ${total} bản ghi`,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ["6", "10", "20", "50"],
});

// Format currency function
function formatCurrency(amount) {
  if (!amount) return "0";
  return new Intl.NumberFormat("vi-VN").format(amount);
}

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

// Xử lý khi thay đổi phân trang (desktop table)
function handleTableChange(paginationObj) {
  pagination.value.current = Math.max(paginationObj.current, 1);
  pagination.value.pageSize = paginationObj.pageSize;
  fetchPayments();
}

// Xử lý khi thay đổi phân trang (mobile)
function handlePaginationChange(page) {
  pagination.value.current = page;
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
