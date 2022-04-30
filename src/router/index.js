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
  // ----------------------------- ADMIN ROUTES ----------------------------- //
  {
    path: '/admin/:uid/listkendala',
    name: 'ListKendala',
    component: () => import('../views/admin/Kendala/ListKendala.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/:uid/detailkendala/:id',
    name: 'DetailKendala',
    component: () => import('../views/admin/Kendala/DetailKendala.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/:uid/sendtugas',
    name: 'SendTugas',
    component: () => import('../views/admin/BeriTugas/Tugas.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/admin/:uid/progress',
    name: 'ProgressMurid',
    component: () => import('../views/admin/Progress/ProgressMurid.vue'),
    meta: {
      requiresAuth: true
    },
  },
  // ----------------------------- USER ROUTES ----------------------------- //
  {
    path: '/user/:uid/tugas',
    name: 'UserTugas',
    component: () => import('../views/user/pages/ProjectTugas.vue'),
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/user/:uid/progress/:id',
    name: 'LaporProgress',
    component: () => import('../views/user/pages/LaporProgress.vue'),
    meta: {
      requiresAuth: true
    },
    props: true
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
    path: '/user/:uid/inbox',
    name: 'InboxKendala',
    component: () => import('../views/user/pages/InboxKendala.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/user/:uid/reply/:id',
    name: 'ReplyKendala',
    component: () => import('../views/user/pages/ReplyKendala.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/user/:uid/reply/:id',
    name: 'ReplyKendala',
    component: () => import('../views/user/pages/ReplyKendala.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/discussion/:uid',
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
  if(to.path === '/' && getCurrentUser() && auth.currentUser) {
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
