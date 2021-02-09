/**
 * @Author: Caven
 * @Date: 2020-11-17 18:35:04
 */

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
      },
      {
        path: '/preview/:id',
        name: 'preview',
        component: () => import('@/views/preview'),
      },
      {
        path: '/editor/:id',
        name: 'editor',
        component: () => import('@/views/editor'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
