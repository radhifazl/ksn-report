<template>
  <li class="nav-list">
    <router-link :to="'/user/'+uid+'/dashboard'">
      <i class='bx-fw bx bxs-dashboard'></i> Dashboard
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/user/'+uid+'/tugas'">
      <i class='bx-fw bx bx-task'></i> Tugas
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/user/'+uid+'/kendala'">
      <i class='bx-fw bx bxs-error' ></i> Lapor Kendala
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/user/'+uid+'/inbox'">
      <i class='bx-fw bx bxs-inbox' ></i> Inbox Kendala
    </router-link>
  </li>
  <li class="nav-list">
    <router-link :to="'/discussion/'+uid">
      <i class='bx-fw bx bxs-conversation'></i> Diskusi KSN
    </router-link>
  </li>
</template>

<script>
import { auth } from "@/firebase";
export default {
  name: 'UserRoutes',
  data() {
    return {
      uid: auth.currentUser.uid
    }
  }
}
</script>

<style>

</style>