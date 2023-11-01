const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "contact",
        alias: "",
        component: () => import("pages/contact/IndexContact.vue"),
      },
      {
        path: "register",
        alias: "",
        component: () => import("pages/contact/RegisterContact.vue"),
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
