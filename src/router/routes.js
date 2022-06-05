
const routes = [
  {
    path: '/',
    component: () => import('layouts/initialLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') } //pages/Index.vue
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') } //pages/Index.vue
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'detalles', name: 'detalles', component: () => import('pages/Detalles.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'carrito', component: () => import('pages/Carrito.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'NewProduct', component: () => import('pages/NewProduct.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'EditProduct', component: () => import('pages/EditProduct.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'compras', component: () => import('pages/Compras.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Supermercado', component: () => import('pages/Supermercado.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Moda', component: () => import('pages/Moda.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Ofertas', component: () => import('pages/Ofertas.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'RegistroCliente', component: () => import('pages/RegistroCliente.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'Publicaciones', component: () => import('pages/Publicaciones.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'Principal', component: () => import('pages/Administrador/Principal.vue') }
    ]
  },

   // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
]


export default routes
