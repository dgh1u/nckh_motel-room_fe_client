<template>
  <ProfileLayout>
    <div class="create-post max-w-3xl mx-auto space-y-4">
      <div class="block items-center pb-4 justify-center flex">
        <span class="font-bold text-3xl text-teal-500">Đăng tin</span>
      </div>
      <div class="block bg-white p-4 pb-6 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Hình thức</span>
        </div>

        <label>Loại hình <span class="text-red-500">*</span> </label>
        <div class="flex rounded-lg mt-1">
          <a-select
            v-model:value="formData.accomodation.motel"
            placeholder="Chọn hình thức"
            class="w-full"
          >
            <a-select-option value="PHONG_TRO"
              >Cho thuê phòng trọ</a-select-option
            >
            <a-select-option value="O_GHEP">Tìm người ở ghép</a-select-option>
            <a-select-option value="QUAN_AN">Quán ăn</a-select-option>
            <a-select-option value="QUAN_NUOC">Quán nước</a-select-option>
            <a-select-option value="CUA_HANG">Cửa hàng</a-select-option>
            <a-select-option value="TIEN_ICH">Tiện ích</a-select-option>
          </a-select>
        </div>

        <!-- Selection phụ cho QUAN_AN -->
        <div v-if="formData.accomodation.motel === 'QUAN_AN'" class="mt-3">
          <label>Loại quán ăn <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại quán ăn"
              class="w-full"
            >
              <a-select-option value="Cơm">Cơm</a-select-option>
              <a-select-option value="Món nước">Món nước</a-select-option>
              <a-select-option value="Xôi và Bánh mì"
                >Xôi và Bánh mì</a-select-option
              >
              <a-select-option value="Cháo">Cháo</a-select-option>
              <a-select-option value="Ăn vặt">Ăn vặt</a-select-option>
              <a-select-option value="Đồ ăn nhanh">Đồ ăn nhanh</a-select-option>
              <a-select-option value="Quán nhậu">Quán nhậu</a-select-option>
            </a-select>
          </div>
        </div>

        <!-- Selection phụ cho QUán nước -->
        <div v-if="formData.accomodation.motel === 'QUAN_NUOC'" class="mt-3">
          <label>Loại quán nước <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại quán nước"
              class="w-full"
            >
              <a-select-option value="Quán Cà phê">Quán Cà phê</a-select-option>
              <a-select-option value="Quán Trà chanh"
                >Quán Trà chanh</a-select-option
              >
              <a-select-option value="Trà đá vỉa hè"
                >Trà đá vỉa hè</a-select-option
              >
              <a-select-option value="Quán Trà sữa"
                >Quán Trà sữa</a-select-option
              >
            </a-select>
          </div>
        </div>

        <!-- Selection phụ cho CUA_HANG -->
        <div v-if="formData.accomodation.motel === 'CUA_HANG'" class="mt-3">
          <label>Loại cửa hàng <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại cửa hàng"
              class="w-full"
            >
              <a-select-option value="Tạp hóa">Tạp hóa</a-select-option>
              <a-select-option value="Cửa hàng tiện lợi"
                >Cửa hàng tiện lợi</a-select-option
              >
              <a-select-option value="Văn phòng phẩm"
                >Văn phòng phẩm</a-select-option
              >
              <a-select-option value="Điện lạnh">Điện lạnh</a-select-option>
              <a-select-option value="Gia dụng">Gia dụng</a-select-option>
              <a-select-option value="Hiệu thuốc">Hiệu thuốc</a-select-option>
              <a-select-option value="Quần áo">Quần áo</a-select-option>
              <a-select-option value="Hiệu sách">Hiệu sách</a-select-option>
              <a-select-option value="Điện thoại">Điện thoại</a-select-option>
              <a-select-option value="Máy tính">Máy tính</a-select-option>
              <a-select-option value="Đồng hồ">Đồng hồ</a-select-option>
              <a-select-option value="Kính mắt">Kính mắt</a-select-option>
            </a-select>
          </div>
        </div>

        <!-- Selection phụ cho Tiện ích -->
        <div v-if="formData.accomodation.motel === 'TIEN_ICH'" class="mt-3">
          <label>Loại Tiện ích <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.secondMotel"
              placeholder="Chọn loại Tiện ích"
              class="w-full"
            >
              <a-select-option value="Photocopy">Photocopy</a-select-option>
              <a-select-option value="Giặt là">Giặt là</a-select-option>
              <a-select-option value="Học ngoại ngữ"
                >Học ngoại ngữ</a-select-option
              >
              <a-select-option value="Chụp ảnh">Chụp ảnh</a-select-option>
            </a-select>
          </div>
        </div>
      </div>

      <div
        v-if="formData.accomodation.motel === 'O_GHEP'"
        class="block bg-white p-4 rounded-xl"
      >
        <div class="py-2">
          <span class="font-bold text-base">Giới tính</span>
        </div>
        <label>Giới tính yêu cầu</label>
        <div class="flex rounded-lg mt-1">
          <a-select
            v-model:value="formData.accomodation.gender"
            placeholder="Chọn giới tính"
            class="w-full"
          >
            <a-select-option :value="true">Nam</a-select-option>
            <a-select-option :value="false">Nữ</a-select-option>
            <a-select-option :value="null">Không yêu cầu</a-select-option>
          </a-select>
        </div>
      </div>

      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Thông tin mô tả</span>
        </div>
        <div class="py-2">
          <label>Tiêu đề <span class="text-red-500">*</span></label>
          <div class="flex border border-gray-300 rounded-lg mt-1">
            <input
              v-model="formData.title"
              type="text"
              placeholder="Nhập tiêu đề"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
          </div>
        </div>

        <div class="py-2">
          <span class="block"
            >Nội dung mô tả <span class="text-red-500">*</span></span
          >
          <div class="flex border border-gray-300 rounded-lg mt-1">
            <textarea
              v-model="formData.content"
              placeholder="Nhập nội dung mô tả"
              rows="4"
              class="w-full p-2 mt-1 border-none outline-none rounded-lg"
            />
          </div>
        </div>

        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label>Giá cho thuê <span class="text-red-500">*</span></label>
          <div class="flex border border-gray-300 rounded-lg mt-1 w-120">
            <input
              v-model.number="formData.accomodation.price"
              type="number"
              placeholder="VD: 1000000 (cho 1 triệu)"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">đồng/tháng</span>
          </div>
          <small class="text-gray-500"
            >Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000</small
          >
        </div>

        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label class="block text-gray-700"
            >Diện tích <span class="text-red-500">*</span></label
          >
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
          >
            <input
              v-model.number="formData.accomodation.acreage"
              type="number"
              placeholder="Nhập diện tích"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">m²</span>
          </div>
        </div>

        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label class="block text-gray-700"
            >Giá điện <span class="text-red-500">*</span></label
          >
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
          >
            <input
              v-model.number="formData.accomodation.electricPrice"
              type="number"
              placeholder="VD: 3500"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">đồng/kWh</span>
          </div>
        </div>

        <div
          v-if="
            formData.accomodation.motel === 'PHONG_TRO' ||
            formData.accomodation.motel === 'O_GHEP'
          "
          class="py-2"
        >
          <label class="block text-gray-700"
            >Giá nước <span class="text-red-500">*</span></label
          >
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-120"
          >
            <input
              v-model.number="formData.accomodation.waterPrice"
              type="number"
              placeholder="VD: 30000"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
            <span class="p-2 border-l border-gray-300">đồng/m³</span>
          </div>
        </div>

        <div
          v-if="
            formData.accomodation.motel === 'QUAN_AN' ||
            formData.accomodation.motel === 'QUAN_NUOC' ||
            formData.accomodation.motel === 'CUA_HANG' ||
            formData.accomodation.motel === 'TIEN_ICH'
          "
          class="py-2"
        >
          <label class="block text-gray-700"
            >Giờ mở cửa <span class="text-red-500">*</span></label
          >
          <div
            class="flex items-center border border-gray-300 rounded-lg mt-1 w-36"
          >
            <a-time-range-picker
              v-model.number="formData.accomodation.openHours"
              type="number"
              format="HH:mm"
              placeholder="Nhập giờ mở cửa"
              class="w-full border-none outline-none rounded-lg"
              @change="handleTimeChange"
            />
          </div>
        </div>

        <div
          v-if="
            formData.accomodation.motel === 'QUAN_AN' ||
            formData.accomodation.motel === 'QUAN_NUOC'
          "
          class="py-2"
        >
          <label class="block text-gray-700"
            >Link ShopeeFood <span class="text-red-500">*</span></label
          >
          <div class="flex items-center border border-gray-300 rounded-lg mt-1">
            <input
              v-model.number="formData.accomodation.linkShopeeFood"
              type="text"
              placeholder="Nhập link ShopeeFood (nếu có)"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
          </div>
        </div>
      </div>

      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Khu vực</span>
        </div>
        <div class="py-2">
          <label>Khu vực <span class="text-red-500">*</span></label>

          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.accomodation.idDistrict"
              placeholder="Chọn khu vực"
              class="w-full"
            >
              <a-select-option
                v-for="district in districtList"
                :key="district.id"
                :value="district.id"
              >
                {{ district.name }}
              </a-select-option>
            </a-select>
          </div>
        </div>

        <div class="py-2">
          <label class="block text-gray-700"
            >Địa chỉ <span class="text-red-500">*</span></label
          >
          <div class="flex items-center rounded-lg mt-1 w-120">
            <input
              v-model="formData.accomodation.address"
              type="text"
              placeholder="VD: Số 12, Ngõ 34..."
              class="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div class="map-wrapper py-2">
          <label class="block text-gray-700">Bản đồ</label>
          <div class="flex items-center border border-gray-300 rounded-lg mt-1">
            <iframe
              width="100%"
              height="300"
              class="border-0"
              :src="`https://www.google.com/maps?q=${encodeURIComponent(
                displayMapAddress
              )}&output=embed`"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div
        v-if="
          formData.accomodation.motel === 'PHONG_TRO' ||
          formData.accomodation.motel === 'O_GHEP'
        "
        class="block bg-white p-4 rounded-xl"
      >
        <div class="py-2">
          <span class="font-bold text-base">Đặc điểm nổi bật</span>
        </div>
        <div class="grid grid-cols-2 gap-y-3">
          <div
            v-for="(feature, idx) in featureOptionsMotel"
            :key="idx"
            class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
            :class="{ 'text-teal-500': formData.accomodation[feature.value] }"
            @click="toggleFeature(feature.value)"
          >
            <div class="relative">
              <input
                type="checkbox"
                class="hidden"
                :checked="formData.accomodation[feature.value]"
                readonly
              />
              <div
                class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
                :class="{
                  'bg-teal-500 border-teal-500':
                    formData.accomodation[feature.value],
                }"
              >
                <CheckIcon
                  v-if="formData.accomodation[feature.value]"
                  class="w-3 h-3 text-white"
                />
              </div>
            </div>
            <span class="ml-2 text-sm">{{ feature.label }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="
          formData.accomodation.motel === 'QUAN_AN' ||
          formData.accomodation.motel === 'QUAN_NUOC'
        "
        class="block bg-white p-4 rounded-xl"
      >
        <div class="py-2">
          <span class="font-bold text-base">Đặc điểm nổi bật</span>
        </div>
        <div class="grid grid-cols-2 gap-y-3">
          <div
            v-for="(feature, idx) in featureOptionsStore"
            :key="idx"
            class="flex items-center p-2 rounded-lg cursor-pointer hover:text-teal-500"
            :class="{ 'text-teal-500': formData.accomodation[feature.value] }"
            @click="toggleFeature(feature.value)"
          >
            <div class="relative">
              <input
                type="checkbox"
                class="hidden"
                :checked="formData.accomodation[feature.value]"
                readonly
              />
              <div
                class="w-5 h-5 border border-gray-300 rounded flex items-center justify-center"
                :class="{
                  'bg-teal-500 border-teal-500':
                    formData.accomodation[feature.value],
                }"
              >
                <CheckIcon
                  v-if="formData.accomodation[feature.value]"
                  class="w-3 h-3 text-white"
                />
              </div>
            </div>
            <span class="ml-2 text-sm">{{ feature.label }}</span>
          </div>
        </div>
      </div>

      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2 pb-6">
          <span class="font-bold text-base">Hình ảnh</span>
        </div>

        <!-- Image upload boxes - 2 rows of 2 boxes with specific labels based on property type -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <!-- Upload Box 1 -->
          <div
            v-if="!files[0]"
            class="relative border-2 border-dashed border-teal-500 rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer hover:bg-teal-50 transition"
          >
            <FolderUp class="w-10 h-10 text-teal-500" />
            <span class="mt-2 text-gray-500 text-sm text-center">
              <span
                v-if="
                  formData.accomodation.motel === 'PHONG_TRO' ||
                  formData.accomodation.motel === 'O_GHEP'
                "
              >
                Tải ảnh Phòng chính
              </span>
              <span
                v-else-if="
                  formData.accomodation.motel === 'QUAN_AN' ||
                  formData.accomodation.motel === 'QUAN_NUOC' ||
                  formData.accomodation.motel === 'CUA_HANG' ||
                  formData.accomodation.motel === 'TIEN_ICH'
                "
              >
                Tải ảnh Không gian 1
              </span>
              <span v-else> Tải ảnh từ thiết bị </span>
            </span>
            <input
              type="file"
              accept="image/*"
              @change="(e) => handleFileChange(e, 0)"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div v-else class="relative h-40 rounded-lg overflow-hidden">
            <img
              :src="files[0].preview"
              alt="preview"
              class="w-full h-full object-cover"
            />
            <button
              @click="removeImage(0)"
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 px-2 py-1 bg-white bg-opacity-70 rounded-md text-red-500 hover:text-red-600"
            >
              <Trash2 class="w-4 h-4" />
              <span class="text-xs">Xóa</span>
            </button>
          </div>

          <!-- Upload Box 2 -->
          <div
            v-if="!files[1]"
            class="relative border-2 border-dashed border-teal-500 rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer hover:bg-teal-50 transition"
          >
            <FolderUp class="w-10 h-10 text-teal-500" />
            <span class="mt-2 text-gray-500 text-sm text-center">
              <span
                v-if="
                  formData.accomodation.motel === 'PHONG_TRO' ||
                  formData.accomodation.motel === 'O_GHEP'
                "
              >
                Tải ảnh Nhà bếp
              </span>
              <span
                v-else-if="
                  formData.accomodation.motel === 'QUAN_AN' ||
                  formData.accomodation.motel === 'QUAN_NUOC' ||
                  formData.accomodation.motel === 'CUA_HANG' ||
                  formData.accomodation.motel === 'TIEN_ICH'
                "
              >
                Tải ảnh Không gian 2
              </span>
              <span v-else> Tải ảnh từ thiết bị </span>
            </span>
            <input
              type="file"
              accept="image/*"
              @change="(e) => handleFileChange(e, 1)"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div v-else class="relative h-40 rounded-lg overflow-hidden">
            <img
              :src="files[1].preview"
              alt="preview"
              class="w-full h-full object-cover"
            />
            <button
              @click="removeImage(1)"
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 px-2 py-1 bg-white bg-opacity-70 rounded-md text-red-500 hover:text-red-600"
            >
              <Trash2 class="w-4 h-4" />
              <span class="text-xs">Xóa</span>
            </button>
          </div>

          <!-- Upload Box 3 -->
          <div
            v-if="!files[2]"
            class="relative border-2 border-dashed border-teal-500 rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer hover:bg-teal-50 transition"
          >
            <FolderUp class="w-10 h-10 text-teal-500" />
            <span class="mt-2 text-gray-500 text-sm text-center">
              <span
                v-if="
                  formData.accomodation.motel === 'PHONG_TRO' ||
                  formData.accomodation.motel === 'O_GHEP'
                "
              >
                Tải ảnh Nhà vệ sinh
              </span>
              <span
                v-else-if="
                  formData.accomodation.motel === 'QUAN_AN' ||
                  formData.accomodation.motel === 'QUAN_NUOC' ||
                  formData.accomodation.motel === 'CUA_HANG' ||
                  formData.accomodation.motel === 'TIEN_ICH'
                "
              >
                Tải ảnh Menu
              </span>
              <span v-else> Tải ảnh từ thiết bị </span>
            </span>
            <input
              type="file"
              accept="image/*"
              @change="(e) => handleFileChange(e, 2)"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div v-else class="relative h-40 rounded-lg overflow-hidden">
            <img
              :src="files[2].preview"
              alt="preview"
              class="w-full h-full object-cover"
            />
            <button
              @click="removeImage(2)"
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 px-2 py-1 bg-white bg-opacity-70 rounded-md text-red-500 hover:text-red-600"
            >
              <Trash2 class="w-4 h-4" />
              <span class="text-xs">Xóa</span>
            </button>
          </div>

          <!-- Upload Box 4 -->
          <div
            v-if="!files[3]"
            class="relative border-2 border-dashed border-teal-500 rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer hover:bg-teal-50 transition"
          >
            <FolderUp class="w-10 h-10 text-teal-500" />
            <span class="mt-2 text-gray-500 text-sm text-center">
              <span
                v-if="
                  formData.accomodation.motel === 'PHONG_TRO' ||
                  formData.accomodation.motel === 'O_GHEP'
                "
              >
                Tải ảnh Mặt tiền
              </span>
              <span
                v-else-if="
                  formData.accomodation.motel === 'QUAN_AN' ||
                  formData.accomodation.motel === 'QUAN_NUOC' ||
                  formData.accomodation.motel === 'CUA_HANG' ||
                  formData.accomodation.motel === 'TIEN_ICH'
                "
              >
                Tải ảnh Mặt tiền
              </span>
              <span v-else> Tải ảnh từ thiết bị </span>
            </span>
            <input
              type="file"
              accept="image/*"
              @change="(e) => handleFileChange(e, 3)"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div v-else class="relative h-40 rounded-lg overflow-hidden">
            <img
              :src="files[3].preview"
              alt="preview"
              class="w-full h-full object-cover"
            />
            <button
              @click="removeImage(3)"
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 px-2 py-1 bg-white bg-opacity-70 rounded-md text-red-500 hover:text-red-600"
            >
              <Trash2 class="w-4 h-4" />
              <span class="text-xs">Xóa</span>
            </button>
          </div>
        </div>

        <small
          v-if="
            isImagesRequired &&
            (!files[0] || !files[1] || !files[2] || !files[3])
          "
          class="text-red-500 block mt-2"
        >
          Vui lòng tải đủ 4 ảnh theo yêu cầu
        </small>

        <ul class="mt-4 text-gray-500 text-xs list-disc list-inside space-y-1">
          <li
            v-if="
              formData.accomodation.motel === 'PHONG_TRO' ||
              formData.accomodation.motel === 'O_GHEP'
            "
          >
            Cần 4 ảnh gồm các khu vực: Phòng chính, Nhà bếp, Nhà vệ sinh, Mặt
            tiền
          </li>
          <li
            v-else-if="
              formData.accomodation.motel === 'QUAN_AN' ||
              formData.accomodation.motel === 'QUAN_NUOC' ||
              formData.accomodation.motel === 'CUA_HANG' ||
              formData.accomodation.motel === 'TIEN_ICH'
            "
          >
            Cần 4 ảnh gồm các khu vực: Không gian 1, Không gian 2, Menu, Mặt
            tiền
          </li>
          <li>Dung lượng mỗi ảnh tối đa 10MB</li>
          <li
            v-if="
              formData.accomodation.motel === 'PHONG_TRO' ||
              formData.accomodation.motel === 'O_GHEP'
            "
          >
            Ảnh phải liên quan đến phòng trọ, nhà cho thuê
          </li>
          <li>Không chèn văn bản hoặc số điện thoại lên ảnh</li>
        </ul>
      </div>

      <div class="text-white font-semibold mt-4">
        <button
          class="submit-btn bg-teal-500 px-4 py-2 rounded hover:bg-teal-600 w-full flex items-center justify-center"
          :disabled="loading"
          @click="handleCreatePost"
        >
          <div
            v-if="loading"
            class="loader mr-2 animate-spin rounded-full h-5 w-5 border-b-2 border-white"
          ></div>
          <span>
            <span v-if="!loading">Tạo bài viết</span>
            <span v-if="loading">Đang tạo...</span>
          </span>
        </button>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { createPost } from "@/apis/postService.js";
import { uploadMultipleImages } from "@/apis/imageService.js";

// Import các component của Ant Design Vue
import { Select, message, Spin, Modal } from "ant-design-vue";

const { confirm } = Modal;

const { Option: ASelectOption } = Select;
import { Check as CheckIcon, FolderUp, Trash2 } from "lucide-vue-next";
import ProfileLayout from "@/layouts/ProfileLayout.vue";

// Import các component của Ant Design Vue trực tiếp trong setup
const ASelect = Select;
const ASelectOptionComponent = ASelectOption;
const ASpin = Spin;

const files = ref([null, null, null, null]);

// Khai báo các biến reactive
const formData = reactive({
  title: "",
  content: "",
  accomodation: {
    motel: "",
    price: "",
    acreage: "",
    electricPrice: "",
    waterPrice: "",
    gender: "",
    address: "",
    idDistrict: "",
    interior: "",
    airConditioner: "",
    heater: "",
    internet: "",
    toilet: "",
    time: "",
    parking: "",
    security: "",
    owner: "",
    kitchen: "",
    secondMotel: "",
    openHours: "",
    delivery: "",
    dineIn: "",
    takeAway: "",
    bigSpace: "",
    linkShopeeFood: "",
  },
});

const districtList = ref([
  { id: 1, name: "An Đào" },
  { id: 4, name: "Đào Nguyên" },
  { id: 5, name: "Cửu Việt" },
  { id: 6, name: "Thành Chung" },
  { id: 7, name: "Ngô Xuân Quảng" },
  { id: 8, name: "Vinhomes Ocean Park" },
  { id: 9, name: "Khác" },
]);

const featureOptionsMotel = ref([
  { label: "Đầy đủ nội thất", value: "interior" },
  { label: "Có điều hòa", value: "airConditioner" },
  { label: "Có nóng lạnh", value: "heater" },
  { label: "Có internet", value: "internet" },
  { label: "Vệ sinh khép kín", value: "toilet" },
  { label: "Giờ giấc tự do", value: "time" },
  { label: "Có chỗ để xe", value: "parking" },
  { label: "An ninh tốt", value: "security" },
  { label: "Không chung chủ", value: "owner" },
  { label: "Kệ bếp", value: "kitchen" },
]);

const featureOptionsStore = ref([
  { label: "Có giao hàng", value: "delivery" },
  { label: "Phục vụ tại chỗ", value: "dineIn" },
  { label: "Mua mang đi", value: "takeAway" },
  { label: "Không gian rộng", value: "bigSpace" },
  { label: "Có chỗ để xe", value: "parking" },
  { label: "Có điều hòa", value: "airConditioner" },
  { label: "Wifi miễn phí", value: "internet" },
]);

const mapAddress = ref("");
const addressTimer = ref(null);
const loading = ref(false);

// Computed properties
const displayMapAddress = computed(() => {
  return mapAddress.value.trim() || "VNUA";
});

// Watchers
watch(
  () => formData.accomodation.address,
  (newAddress) => {
    if (addressTimer.value) clearTimeout(addressTimer.value);
    addressTimer.value = setTimeout(() => {
      mapAddress.value = newAddress;
    }, 1000);
  }
);

// Computed property to check if all 4 images are required based on property type
const isImagesRequired = computed(() => {
  return (
    formData.accomodation.motel === "PHONG_TRO" ||
    formData.accomodation.motel === "O_GHEP" ||
    formData.accomodation.motel === "QUAN_AN" ||
    formData.accomodation.motel === "QUAN_NUOC" ||
    formData.accomodation.motel === "CUA_HANG" ||
    formData.accomodation.motel === "TIEN_ICH"
  );
});

const handleFileChange = (e, index) => {
  // Get the selected file
  const file = e.target.files[0];

  if (file) {
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      message.error("Dung lượng ảnh không được vượt quá 10MB");
      e.target.value = null;
      return;
    }

    // Create a preview URL for the file
    const preview = URL.createObjectURL(file);

    // Update the file at the specific index
    files.value[index] = { file, preview };
  }

  // Reset file input
  e.target.value = null;
};

const removeImage = (index) => {
  // Make sure there's a file at this index
  if (files.value[index]) {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(files.value[index].preview);

    // Set the slot back to null (doesn't shift other images)
    files.value[index] = null;
  }
};

const handleTimeChange = (time) => {
  if (time && Array.isArray(time) && time.length === 2) {
    const formatTime = (timeValue) => {
      if (!timeValue) return "";
      const date = new Date(timeValue);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const startTime = formatTime(time[0]);
    const endTime = formatTime(time[1]);

    // Lưu trực tiếp dưới dạng chuỗi
    formData.accomodation.openHours = `${startTime} - ${endTime}`;
  }
};

const handleCreatePost = () => {
  // Validate tiêu đề chỉ khi là PHONG_TRO hoặc O_GHEP
  if (
    formData.accomodation.motel === "PHONG_TRO" ||
    formData.accomodation.motel === "O_GHEP"
  ) {
    // Validate tiêu đề:
    if (!formData.title.trim()) {
      message.error("Tiêu đề không được để trống");
      return;
    }
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 100
    ) {
      message.error("Tiêu đề phải từ 10 đến 100 ký tự");
      return;
    }

    // Validate nội dung mô tả:
    if (!formData.content.trim()) {
      message.error("Nội dung mô tả không được để trống");
      return;
    }
    if (
      formData.content.trim().length < 50 ||
      formData.content.trim().length > 500
    ) {
      message.error("Nội dung mô tả phải từ 50 đến 500 ký tự");
      return;
    }
    if (!formData.accomodation.price) {
      message.error("Giá cho thuê không được để trống");
      return;
    }
    if (!formData.accomodation.acreage) {
      message.error("Diện tích không được để trống");
      return;
    }
    if (!formData.accomodation.electricPrice) {
      message.error("Giá điện không được để trống");
      return;
    }
    if (!formData.accomodation.waterPrice) {
      message.error("Giá nước không được để trống");
      return;
    }
    if (!formData.accomodation.idDistrict) {
      message.error("Khu vực không được để trống");
      return;
    }
    if (!formData.accomodation.address.trim()) {
      message.error("Địa chỉ không được để trống");
      return;
    }
    if (isImagesRequired.value) {
      if (
        !files.value[0] ||
        !files.value[1] ||
        !files.value[2] ||
        !files.value[3]
      ) {
        message.error("Bạn phải tải lên đủ 4 ảnh theo yêu cầu");
        return;
      }
    }
  }

  if (
    formData.accomodation.motel === "QUAN_AN" ||
    formData.accomodation.motel === "QUAN_NUOC" ||
    formData.accomodation.motel === "CUA_HANG" ||
    formData.accomodation.motel === "TIEN_ICH"
  ) {
    // Validate tiêu đề:
    if (!formData.title.trim()) {
      message.error("Tiêu đề không được để trống");
      return;
    }
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 100
    ) {
      message.error("Tiêu đề phải từ 10 đến 100 ký tự");
      return;
    }

    // Validate nội dung mô tả:
    if (!formData.content.trim()) {
      message.error("Nội dung mô tả không được để trống");
      return;
    }
    if (
      formData.content.trim().length < 50 ||
      formData.content.trim().length > 500
    ) {
      message.error("Nội dung mô tả phải từ 50 đến 500 ký tự");
      return;
    }
    if (!formData.accomodation.openHours) {
      message.error("Giờ mở cửa không được để trống");
      return;
    }

    if (!formData.accomodation.idDistrict) {
      message.error("Khu vực không được để trống");
      return;
    }
    if (!formData.accomodation.address.trim()) {
      message.error("Địa chỉ không được để trống");
      return;
    }
    if (isImagesRequired.value) {
      if (
        !files.value[0] ||
        !files.value[1] ||
        !files.value[2] ||
        !files.value[3]
      ) {
        message.error("Bạn phải tải lên đủ 4 ảnh theo yêu cầu");
        return;
      }
    }
  }

  // Hiển thị confirm trước khi trừ 2000 số dư
  confirm({
    title: "Xác nhận đăng bài",
    content: "Bạn có chắc chắn muốn đăng bài viết này không? (Phí: 2000₫/lần)",
    async onOk() {
      loading.value = true;
      try {
        // Tạo bài viết
        const { data: post } = await createPost(formData);
        const postId = post.id;

        // Filter out null values and prepare files for upload
        const filesToUpload = files.value
          .filter((f) => f !== null)
          .map((f) => f.file);

        // Upload ảnh
        await uploadMultipleImages(postId, filesToUpload);
        message.success("Đăng tin thành công!");
        resetForm();
        files.value = [null, null, null, null]; // Reset to 4 empty slots
      } catch (error) {
        const errorMessage = error.message;

        if (errorMessage.includes("Số dư không đủ")) {
          message.error(
            "Không thể đăng bài: Số dư không đủ 2000 đồng. Vui lòng nạp thêm tiền để có thể Đăng tin!"
          );
        } else {
          message.error("Đã có lỗi xảy ra");
        }
      } finally {
        loading.value = false;
      }
    },
    onCancel() {
      message.info("Đã hủy đăng tin");
    },
  });
};

const toggleFeature = (featureValue) => {
  formData.accomodation[featureValue] = !formData.accomodation[featureValue];
};

const resetForm = () => {
  Object.assign(formData, {
    title: "",
    content: "",
    accomodation: {
      motel: "",
      price: "",
      acreage: "",
      electricPrice: "",
      waterPrice: "",
      gender: "",
      address: "",
      idDistrict: "",
      interior: "",
      airConditioner: "",
      heater: "",
      internet: "",
      toilet: "",
      time: "",
      parking: "",
      security: "",
      owner: "",
      kitchen: "",
      secondMotel: "",
      openHours: "",
      delivery: "",
      dineIn: "",
      takeAway: "",
      bigSpace: "",
      linkShopeeFood: "",
    },
  });
};
</script>

<style scoped>
.submit-btn:hover {
  background-color: #2980b9;
}
.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
