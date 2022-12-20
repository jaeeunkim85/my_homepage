import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/page/MainPage.vue"),
  },
  {
    path: "/guest",
    name: "guest",
    component: () => import("@/page/GuestView.vue"),
  },
  {
    path: "/info",
    name: "info",
    component: () => import("@/page/InfoView.vue"),
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("@/page/SignUpView.vue"),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/page/BlogMain.vue"),
    children: [
      {
        path: "all",
        name: "landing",
        component: () => import("@/page/blog/BlogLanding.vue"),
      },
      {
        path: "write/:option",
        name: "write",
        component: () => import("@/page/blog/BlogWriteView.vue"),
      },
      {
        path: "detail/:id",
        name: "detail",
        component: () => import("@/page/blog/BlogDetailView.vue"),
      },
      {
        path: "category/:category",
        name: "blogCategory",
        component: () => import("@/page/blog/BlogCategoryView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("to : " + to.path);
  console.log("from : " + from.path);
  next();
});

export default router;
