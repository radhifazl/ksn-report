<template>
  <div class="discussion-chat ccontainer d-flex bg-lightgrey">
      <div class="discussion-wrapper w-100">
          <PageHeader>
              <AdminRoutes v-if="admin"/>
              <UserRoutes v-else/>
          </PageHeader>
          <div class="discussion-content w-100 padtop">
              <div class="discussion-view container-fluid">
                  <Chat />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import Chat from '@/components/Chat/Chat.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import AdminRoutes from '@/components/SidebarRoutes/AdminRoutes.vue'
import { ref } from '@vue/reactivity'
import { auth } from '@/firebase'
export default {
  components: { PageHeader, Chat, UserRoutes, AdminRoutes },
  setup() {
    const admin = ref(false)
    const adminEmail = "radhifazlinurfahriza@gmail.com";
    const adminUid = "aJBM7W9ML5TPSMYEU6gD9xOFbYt1";
    if(auth.currentUser.email == adminEmail && auth.currentUser.uid == adminUid) {
        admin.value = true
    } 

    return {
        admin
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
.discussion-content {
    width: 100%;
    height: 88vh;
    .discussion-view {
        width: 100%;
        height: 100%;
    }
}
</style>