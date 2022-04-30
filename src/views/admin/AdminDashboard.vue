<template>
  <div class="admin-dashboard bg-col w-100">
      <PageHeader>
        <AdminRoutes />
      </PageHeader>

      <div class="admin-dashboard-content p-4 padtop">
        <div class="welcome-text mb-5">
          <h1 class="font-title">Halo, <span>Admin</span></h1>
          <h6 class="font-desc">Jangan lupa untuk memberi dan mengecek tugas murid setiap hari!</h6>
        </div>

        <div class="tugas-summary-slider mt-5">
          <h3 class="font-title">User's Task Summary</h3>
          <TugasSlider/>
        </div>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import PageHeader from '@/components/Header/PageHeader.vue'
import AdminRoutes from '@/components/SidebarRoutes/AdminRoutes.vue'
import TugasSlider from '@/components/TugasSlider/TugasSlider.vue'
export default {
  name: 'AdminDashboard',
  components: {
    PageHeader,
    AdminRoutes,
    TugasSlider
  },
  setup() {
    const store = useStore()

    const logout = () => {
      store.dispatch('logout')
    }

    return {
      logout,
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.admin-dashboard {
  height: 100%;
  min-height: 100vh;

  .admin-dashboard-content {
    .welcome-text {
      h1 span {
        color: $secondary-color;
      }
    }
  }
}
</style>