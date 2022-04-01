<template>
  <div class="admin-dashboard ccontainer d-flex">
    <div class="admin-dashboard-content cwrap">
      <page-header>
        <admin-routes />
      </page-header>
      <h1>Halo Admin</h1>
      <button class="mt-5" @click="logout">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import PageHeader from '@/components/Header/PageHeader.vue'
import AdminRoutes from '@/components/SidebarRoutes/AdminRoutes.vue'
export default {
  name: 'AdminDashboard',
  components: {
    PageHeader,
    AdminRoutes
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