const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "contact",
        alias: "",
        component: () => import("src/pages/contact/IndexContact.vue"),
      },
      {
        path: "register",
        alias: "register",
        component: () => import("pages/contact/RegisterContact.vue"),
      },
      {
        path: "profile",
        alias: "profile",
        component: () => import("pages/profile/IndexProfile.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/auth/IndexLogin.vue") },
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
