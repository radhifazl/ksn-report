<template>
  <div class="admin-dashboard ccontainer d-flex">
    <app-sidebar>
      <router-link to="/admin/dashboard">
        <li class="navlist-item">
          <i class='bx-fw bx bxs-dashboard'></i> Dashboard
        </li>
      </router-link>

      <router-link to="/admin/beritugas">
          <li class="navlist-item">
            <i class='bx-fw bx bx-task'></i> Beri Tugas
          </li>
      </router-link>

      <router-link to="/admin/laporanprogress">
          <li class="navlist-item">
            <i class='bx-fw bx bxs-report' ></i> Laporan Progress
          </li>
      </router-link>

      <router-link to="/admin/laporankendala">
          <li class="navlist-item">
            <i class='bx-fw bx bx-error'></i> Laporan Kendala
          </li>
      </router-link>

      <li class="navlist-item">
          <button class="nav-logout" @click="logout">
            <i class='bx-fw bx bxs-log-out'></i> Logout
          </button>
      </li>
    </app-sidebar>
    <div class="admin-dashboard-content cwrap">
      <page-header />
      <h1>Halo Admin</h1>
      <button class="mt-5" @click="logout">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import AppSidebar from '@/components/Sidebar/AppSidebar.vue'
import PageHeader from '@/components/Header/PageHeader.vue'
export default {
  name: 'AdminDashboard',
  components: {
    AppSidebar,
    PageHeader
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

<style>

</style>