// Import các component cần thiết
import Profile from "../pages/dropdown-menu/profile/Profile.vue";
import Home from "../pages/home/Home.vue";
import NotFound from "../pages/not-found/NotFound.vue";
import Contact from "../pages/contact/Contact.vue";
import MotelList from "../pages/motel-room/MotelList.vue";
import MotelDetail from "../pages/motel-room/MotelDetail.vue";
import MyPostList from "../pages/dropdown-menu/my-posts/MyPostList.vue";
import RoommateFindList from "../pages/roommate-find/RoommateFindList.vue";
import RoommateFindDetail from "../pages/roommate-find/RoommateFindDetail.vue";
import CreatePost from "../pages/create-post/CreatePost.vue";
import UpdatePost from "../pages/update-post/UpdatePost.vue";
import ListNotifications from "../pages/list-notifications/ListNotifications.vue";
import Payment from "../pages/dropdown-menu/payment/Payment.vue";
import PaymentHistory from "../pages/dropdown-menu/payment-history/PaymentHistory.vue";
import PaymentResult from "../pages/payment-result/PaymentResult.vue";

export default [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/post/motel",
    name: "MotelList",
    component: MotelList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/motel/:id",
    name: "MotelDetail",
    component: MotelDetail,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/roommate",
    name: "RoommateFindList",
    component: RoommateFindList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/roommate/:id",
    name: "RoommateFindDetail",
    component: RoommateFindDetail,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/my-posts",
    name: "MyPostList",
    component: MyPostList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/update-post/:id",
    name: "UpdatePost",
    component: UpdatePost,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/list-notifications",
    name: "ListNotification",
    component: ListNotifications,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/payment-history",
    name: "PaymentHistory",
    component: PaymentHistory,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/payment/:id/result",
    name: "PaymentResult",
    component: PaymentResult,
    meta: {
      requiresAuth: false,
    },
  },
];
