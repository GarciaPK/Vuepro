// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginPage.vue'
import Admin from '../views/AdminPage.vue'
import User from '../views/UserPage.vue'

const routes = [
  { path: '/', component: Login },
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      { path: 'listar-usuarios', component: () => import('../components/AdminComponents/ListarUsuarios.vue')}
    ]
  },
  {
    path: '/user',
    component: User,
    meta: { requiresAuth: true },
    children: [
      { path: 'tarea', component: () => import('../components/UserComponents/UserComponent.vue')}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
