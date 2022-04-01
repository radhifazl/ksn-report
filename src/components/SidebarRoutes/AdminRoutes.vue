<template>
  <li class="nav-list">
    <router-link to="/admin/dashboard">
      <i class='bx-fw bx bxs-dashboard'></i> Dashboard
    </router-link>
  </li>
  <li class="nav-list">
    <router-link to="/admin/tugas">
      <i class='bx-fw bx bx-task'></i> Beri Tugas
    </router-link>
  </li>
  <li class="nav-list">
    <router-link to="/admin/progress">
      <i class='bx-fw bx bxs-report' ></i> Laporan Progress
    </router-link>
  </li>
  <li class="nav-list">
    <router-link to="/admin/kendala">
      <i class='bx-fw bx bxs-error' ></i> Laporan Kendala
    </router-link>
  </li>
  <li class="nav-list">
    <router-link to="/discussion">
      <i class='bx-fw bx bxs-conversation'></i> Diskusi KSN
    </router-link>
  </li>
</template>

<script>
export default {
    name: 'AdminRoutes'
}
</script>

<style>

</style>