<template>
  <div class="discussion-chat ccontainer d-flex bg-lightgrey">
      <div class="discussion-wrapper w-100">
          <page-header>
              <user-routes />
          </page-header>
          <div class="discussion-content w-100">
              <div class="discussion-view container-fluid">
                  <chat />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import Chat from '@/components/Chat/Chat.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
export default {
  components: { PageHeader, Chat, UserRoutes }
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