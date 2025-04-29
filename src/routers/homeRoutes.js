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
import PrivacyPolicy from "../pages/policy/PrivacyPolicy.vue";
import RestaurantList from "../pages/sv-restaurant/RestaurantList.vue";
import RestaurantDetail from "../pages/sv-restaurant/RestaurantDetail.vue";
import BeverageList from "../pages/sv-beverage/BeverageList.vue";
import BeverageDetail from "../pages/sv-beverage/BeverageDetail.vue";
import StoreList from "../pages/sv-store/StoreList.vue";
import StoreDetail from "../pages/sv-store/StoreDetail.vue";
import UtilityList from "../pages/sv-utility/UtilityList.vue";
import UtilityDetail from "../pages/sv-utility/UtilityDetail.vue";

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
      requiresAuth: true,
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
    path: "/post/restaurant",
    name: "RestaurantList",
    component: RestaurantList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/restaurant/:id",
    name: "RestaurantDetail",
    component: RestaurantDetail,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/beverage",
    name: "BeverageList",
    component: BeverageList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/beverage/:id",
    name: "BeverageDetail",
    component: BeverageDetail,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/store",
    name: "StoreList",
    component: StoreList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/store/:id",
    name: "StoreDetail",
    component: StoreDetail,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/utility",
    name: "UtilityList",
    component: UtilityList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/utility/:id",
    name: "UtilityDetail",
    component: UtilityDetail,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/my-posts",
    name: "MyPostList",
    component: MyPostList,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/update-post/:id",
    name: "UpdatePost",
    component: UpdatePost,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/list-notifications",
    name: "ListNotification",
    component: ListNotifications,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/payment-history",
    name: "PaymentHistory",
    component: PaymentHistory,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/payment/:id/result",
    name: "PaymentResult",
    component: PaymentResult,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
    meta: {
      requiresAuth: true,
    },
  },
];
