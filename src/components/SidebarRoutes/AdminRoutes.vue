<template>
  <li class="nav-list">
    <router-link :to="'/admin/'+uid+'/dashboard'">
      <i class='bx-fw bx bxs-dashboard'></i> Dashboard
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/admin/'+uid+'/sendtugas'">
      <i class='bx-fw bx bx-task'></i> Beri Tugas
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/admin/'+uid+'/progress'">
      <i class='bx-fw bx bxs-report' ></i> Laporan Tugas
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/admin/'+uid+'/listkendala'">
      <i class='bx-fw bx bxs-error' ></i> Laporan Kendala
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/discussion/'+uid">
      <i class='bx-fw bx bxs-conversation'></i> Diskusi KSN
    </router-link>
  </li>
</template>

<script>
import { ref } from "vue";
export default {
    name: 'AdminRoutes',
    setup() {
      const adminUid = "aJBM7W9ML5TPSMYEU6gD9xOFbYt1"
      const uid = ref(adminUid)
      return {
        uid
      }
    }
}
</script>

<style>

</style>