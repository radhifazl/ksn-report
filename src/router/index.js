import { onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'


import HomeView from '../views/HomeView.vue'

// meta: {
//   requiresAuth: true
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/:uid/dashboard',
    name: 'UserDashboard',
    component: () => import('../views/user/UserDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/:uid/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/admin/AdminDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:uid/tugas',
    name: 'usertugas',
    component: () => import('../views/user/pages/ProjectTugas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:uid/progress',
    name: 'LaporProgress',
    component: () => import('../views/user/pages/LaporProgress.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:uid/kendala',
    name: 'LaporKendala',
    component: () => import('../views/user/pages/LaporKendala.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/discussion',
    name: 'Discussion Chat',
    component: () => import('../views/DiscussionChat.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth, (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if(to.path === '/' && getCurrentUser()) {
    next(`/user/${auth.currentUser.uid}/dashboard`)
    return
  }

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next()
    } else {
      next("/")
    }
  } else {
    next()
  }
})

export default router
