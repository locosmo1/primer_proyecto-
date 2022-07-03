const routes = [
  //Rutas de Cliente

  {
    path: "/",
    component: () => import("layouts/initialLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Administrador/Login.vue") }, //pages/Index.vue
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "carrito", component: () => import("pages/Cliente/Carrito.vue") },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "compras", component: () => import("pages/Cliente/Compras.vue") },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "detalles",
        name: "detalles",
        component: () => import("pages/Cliente/Detalles.vue"),
      },
    ],
  },


  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "index", component: () => import("pages/Cliente/Index.vue") }, //pages/Index.vue
    ],
  },

  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "NewProduct",
        component: () => import("pages/Empresa/NewProduct.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "EditProduct",
        component: () => import("pages/Empresa/EditProduct.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "Supermercado",
        component: () => import("pages/Cliente/Supermercado.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "Moda", component: () => import("pages/Cliente/Moda.vue") },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "Ofertas", component: () => import("pages/Cliente/Ofertas.vue") },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "RegistroCliente",
        component: () => import("pages/Cliente/RegistroCliente.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "Publicaciones",
        component: () => import("pages/Empresa/Publicaciones.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "Principal",
        component: () => import("pages/Administrador/Principal.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  //Rutas de Empresa
  //Rutas de Administrador
  {
    path: "*",
    component: () => import("pages/Administrador/Error404.vue"),
  },
];

export default routes;
