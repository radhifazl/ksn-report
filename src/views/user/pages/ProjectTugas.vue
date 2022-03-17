<template>
  <div class="project-tugas-wrapper ccontainer d-flex">
      <app-sidebar>
        <router-link to="/user/dashboard">
          <li class="navlist-item">
            <i class='bx-fw bx bxs-dashboard'></i> Dashboard
          </li>
        </router-link>

        <router-link to="/user/tugas">
          <li class="navlist-item">
            <i class='bx-fw bx bx-task'></i> Tugas
          </li>
        </router-link>

        <router-link to="/user/progress">
          <li class="navlist-item">
            <i class='bx-fw bx bxs-report' ></i> Lapor Progress
          </li>
        </router-link>

        <router-link to="/user/kendala">
          <li class="navlist-item">
            <i class='bx-fw bx bx-error'></i> Lapor Kendala
          </li>
        </router-link>

        <router-link to="/user/contact">
          <li class="navlist-item">
            <i class='bx-fw bx bx-chat'></i> Kontak Admin PKL
          </li>
        </router-link>

        <li class="navlist-item">
          <button class="nav-logout" @click="logout">
            <i class='bx-fw bx bxs-log-out'></i> Logout
          </button>
        </li>
      </app-sidebar>
      <div class="project-tugas cwrap">
        <page-header />
        <div class="tugas-content p-4">
          <div class="tugas-header d-flex justify-content-between align-items-center">
            <h2 class="font-title mb-4" id="welcome-text">
              Daftar Tugas :
            </h2>

            <h6 class="font-desc">{{tanggal}}</h6>
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
                <router-link to="/user/progress">
                  <i class='bx-fw bx bxs-report'></i> Lapor Progress
                </router-link>
              </div>
            </div>
            <div class="tugas p-3">
              <div class="tugas-header mb-4">
                <h4 class="tugas-title font-title">Love Flower</h4>
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
                <router-link to="/user/progress">
                  <i class='bx-fw bx bxs-report'></i> Lapor Progress
                </router-link>
              </div>
            </div>
            <div class="tugas p-3">
              <div class="tugas-header mb-4">
                <h4 class="tugas-title font-title">Flower Purple</h4>
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
                <router-link to="/user/progress">
                  <i class='bx-fw bx bxs-report'></i> Lapor Progress
                </router-link>
              </div>
            </div>
            <div class="tugas p-3">
              <div class="tugas-header mb-4">
                <h4 class="tugas-title font-title">Dark Gold</h4>
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
                <router-link to="/user/progress">
                  <i class='bx-fw bx bxs-report'></i> Lapor Progress
                </router-link>
              </div>
            </div>
            <div class="tugas p-3">
              <div class="tugas-header mb-4">
                <h4 class="tugas-title font-title">Sunflower</h4>
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
                <router-link to="/user/progress">
                  <i class='bx-fw bx bxs-report'></i> Lapor Progress
                </router-link>
              </div>
            </div>
            <div class="tugas p-3">
              <div class="tugas-header mb-4">
                <h4 class="tugas-title font-title">Dark Grey</h4>
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
                <router-link to="/user/progress">
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
import AppSidebar from '@/components/Sidebar/AppSidebar.vue'
import PageHeader from '@/components/Header/PageHeader.vue'
export default {
  components: { AppSidebar, PageHeader },
  name: 'UserTugas',
  data() {
    return {
      tanggal: ''
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    getDate() {
      const now = new Date()
      this.tanggal = now.toJSON().slice(0, 10).toString()
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
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