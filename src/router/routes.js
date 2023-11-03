import { useUserStore } from "src/stores/user-store";

const routes = [
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "contact",
        name: "contact",
        alias: "",
        component: () => import("src/pages/contact/IndexContact.vue"),
      },
      {
        path: "register",
        alias: "register",
        name: "register",
        component: () => import("pages/contact/RegisterContact.vue"),
      },
      {
        path: "profile",
        alias: "profile",
        name: "profile",
        component: () => import("pages/profile/IndexProfile.vue"),
      },
    ],
  },
  {
    path: "",
    alias: "",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "auth",
        component: () => import("pages/auth/IndexLogin.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
