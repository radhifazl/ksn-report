<template>
  <div class="project-tugas-wrapper d-flex bg-col">
      <div class="project-tugas">
        <PageHeader>
          <UserRoutes />
        </PageHeader>
        <div class="tugas-content p-4">
          <div class="tugas-header d-flex justify-content-between align-items-center">
            <h2 class="font-title mb-4" id="welcome-text">
              Daftar Tugas :
            </h2>
          </div>

          <div class="daftar-tugas d-flex flex-wrap gap-4">
            <div class="tugas p-3">
              <div class="tugas-header mb-4">
                <h4 class="tugas-title font-title">Java Vibes</h4>
              </div>
              <div class="tugas-content">
                <div class="figma-link-wrapper d-flex justify-content-between align-items-center">
                  <h6 class="figma-title font-title">Figma :</h6>
                  <a class="figma-link font-title">Test</a>
                </div>

                <div class="gitlab-link-wrapper d-flex justify-content-between align-items-center">
                  <h6 class="gitlab-title font-title">Gitlab :</h6>
                  <a class="gitlab-link font-title">Test</a>
                </div>
              </div>

              <div class="tugas-report-btn">
                <router-link :to="'/user/'+uid+'/progress'">
                  <i class='bx-fw bx bxs-report'></i> Lapor Progress
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { auth } from "@/firebase";
export default {
  components: { PageHeader, UserRoutes },
  name: 'UserTugas',
  data() {
    return {
      uid: auth.currentUser.uid
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
.project-tugas-wrapper {
  width: 100%;
  height: 100%;

  .project-tugas {
    width: 100%;
  }
}

.tugas {
  width: 49%;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.425) 0px 0px 0px, rgba(0, 0, 0, 0.425) 0px 6px 6px;
  position: relative;
  background: $primary-color;
  color: $white;
  border-radius: 10px;

  .tugas-header {
      color: $secondary-color;
  }

  .tugas-content {
    div {
      margin-bottom: 0.5rem;
      a {
        cursor: pointer;
      }
    }
  }

  .tugas-report-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    background: $secondary-color;
    padding: 0.5rem 1rem;
    padding-right: 2rem;
    border-top-right-radius: 45px;

    a {
      color: $white;
      font-family: $first-font;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
  }
}

@media screen and (max-width: 768px) {
  .tugas {
    width: 100%;
  }
}
</style>