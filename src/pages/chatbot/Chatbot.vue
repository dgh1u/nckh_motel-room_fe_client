<template>
  <div>
    <!-- Chat launcher -->
    <div class="fixed bottom-6 right-6 flex items-center space-x-2">
      <div class="pr-0.5 pb-5">
        <button
          @click="openChat"
          class="flex items-center bg-white px-4 py-2 rounded-t-xl rounded-bl-xl shadow-md hover:shadow-lg transition"
        >
          <span class="text-gray-800 font-medium whitespace-nowrap"
            >Tôi có thể giúp gì cho bạn?</span
          >
        </button>
      </div>
      <button
        @click="openChat"
        class="bg-teal-400 hover:bg-teal-600 p-4 rounded-full shadow-lg transition"
      >
        <BotMessageSquare class="w-6 h-6 text-white" />
      </button>
    </div>

    <!-- Chat Window -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="scale-0 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-0 opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed bottom-4 right-4 w-90 h-[500px] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden z-50"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-400 to-blue-300 rounded-t-xl"
        >
          <div class="flex items-center space-x-2">
            <img src="@/assets/vnua-logo.png" alt="VNUA Chat" class="w-8 h-8" />
            <span class="text-white font-semibold text-lg"
              >VNUA Services Chatbot</span
            >
          </div>
          <div class="flex items-center space-x-2">
            <button @click="clearChat" class="focus:outline-none">
              <RotateCcw class="w-5 h-5 text-white cursor-pointer mr-1" />
            </button>
            <button @click="isOpen = false">
              <X class="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-100 scrollbar-thin scrollbar-thumb-gray-300"
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex"
            :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              v-if="msg.sender === 'bot'"
              class="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl px-4 py-2 max-w-[75%]"
            >
              <template v-if="msg.loading">
                <div class="flex space-x-1">
                  <span class="inline-block animate-pulse">.</span>
                  <span class="inline-block animate-pulse delay-150">.</span>
                  <span class="inline-block animate-pulse delay-300">.</span>
                </div>
              </template>
              <template v-else>
                {{ msg.content }}
              </template>
            </div>
            <div
              v-else
              class="bg-white text-gray-800 rounded-full px-4 py-2 max-w-[75%]"
            >
              {{ msg.content }}
            </div>
          </div>
        </div>

        <!-- Input area -->
        <div class="px-4 py-3 bg-gray-100 pb-3">
          <div class="relative flex items-center">
            <input
              v-model="input"
              type="text"
              placeholder="Enter your message"
              @keydown.enter="handleSend"
              class="w-full rounded-xl border bg-white border-gray-300 px-4 py-3 pr-10"
            />
            <button
              @click="handleSend"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
            >
              <SendHorizonal
                class="w-5 h-5 text-gray-300 hover:text-blue-600"
              />
            </button>
          </div>
        </div>

        <!-- Footer: Powered by Gemini -->
        <div class="pb-2 text-center text-xs text-gray-500 bg-gray-100">
          Powered by
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400 font-semibold"
          >
            Gemini
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { SendHorizonal, X, RotateCcw, BotMessageSquare } from "lucide-vue-next";
import { sendQuery } from "@/apis/chatbotService";

const isOpen = ref(false);
const input = ref("");
const messages = ref([]);
const chatContainer = ref(null);

const openChat = () => (isOpen.value = true);
const clearChat = () => {
  messages.value = [];
  nextTick().then(scrollToBottom);
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const handleSend = async () => {
  const q = input.value.trim();
  if (!q) return;

  messages.value.push({ sender: "user", content: q });
  input.value = "";
  await nextTick();
  scrollToBottom();

  const loadingMsg = { sender: "bot", content: "", loading: true };
  messages.value.push(loadingMsg);
  await nextTick();
  scrollToBottom();

  try {
    const { answer } = await sendQuery(q);
    loadingMsg.content = answer;
  } catch {
    loadingMsg.content = "Error — please try again.";
  } finally {
    loadingMsg.loading = false;
    await nextTick();
    scrollToBottom();
  }
};
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
