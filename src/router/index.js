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
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: SignupPage
  // },
  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: () => import('../views/user/UserDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/admin/AdminDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/tugas',
    name: 'usertugas',
    component: () => import('../views/user/pages/ProjectTugas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/progress',
    name: 'LaporProgress',
    component: () => import('../views/user/pages/LaporProgress.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/kendala',
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

const user = auth.currentUser;
const adminEmail = "radhifazlinurfahriza2gmail.com";
const adminUid = "aJBM7W9ML5TPSMYEU6gD9xOFbYt1";


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
  if(to.path === '/' && auth.currentUser) {
    next('/user/dashboard')
    if(auth.currentUser.email === adminEmail && auth.currentUser.uid === adminUid) {
      router.push('/admin/dashboard')
    }
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
