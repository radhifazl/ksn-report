<template>
  <li class="nav-list">
    <router-link to="/user/dashboard">
      <i class='bx-fw bx bxs-dashboard'></i> Dashboard
    </router-link>
  </li>
  <li class="nav-list">
    <router-link to="/user/tugas">
      <i class='bx-fw bx bx-task'></i> Tugas
    </router-link>
  </li>
  <li class="nav-list">
    <router-link to="/user/progress">
      <i class='bx-fw bx bxs-report' ></i> Lapor Progress
    </router-link>
  </li>
  <li class="nav-list">
    <router-link to="/user/kendala">
      <i class='bx-fw bx bxs-error' ></i> Lapor Kendala
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
  name: 'UserRoutes'
}
</script>

<style>

</style>