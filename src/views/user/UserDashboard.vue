<template>
  <div class="user-dashboard ccontainer d-flex">
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
      <div class="user-dash-content cwrap">
          <page-header />

          <div class="dashboard-content p-4">
            <div class="welcome-text mb-4">
              <h1 class="font-title">Halo, <span>{{username}}</span></h1>
              <h6 class="font-desc">Jangan lupa untuk selalu mengerjakan tugasnya sesuai waktu yang ditentukan ya!</h6>
            </div>

            <div class="project-container w-100">
              <h4 class="font-title project-wrapper-title">Finished Projects</h4>

              <div class="project-list-wrapper pt-3">
                <swiper
                  :slidesPerGroup="1"
                  :loop="true"
                  :pagination="{
                    clickable: true,
                  }"
                  :breakpoints="{
                    '640': {
                      slidesPerView: 1
                    },
                    '768': {
                      slidesPerView: 2
                    },
                    '1024': {
                      slidesPerView: 3
                    }
                  }"
                  :navigation="true"
                  :modules="modules"
                  class="mySwiper"
                >
                  <swiper-slide v-for="(project, index) in projects" :key="index" class="swipe">
                    <div class="project">
                      <div class="img">
                        <img src="@/assets/logo.png">
                      </div>
                      <div class="project-content">
                        <div class="title mb-3">
                          <h5 class="font-title">{{project.title}}</h5>
                        </div>
                        <div class="desc">
                          <h6>{{project.desc}}</h6>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/Sidebar/AppSidebar.vue'
import PageHeader from '@/components/Header/PageHeader.vue'
import { auth } from '@/firebase'
import { Swiper, SwiperSlide } from 'swiper/vue'
import "swiper/css"
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from 'swiper'
// import { useStore } from 'vuex'

export default {
  name: 'UserDashboard',
  components: { AppSidebar, PageHeader, Swiper, SwiperSlide },
  data() {
    return {
      username: "",
      projects: [
        {
          title: 'Java Vibes',
          desc: 'Invitation web bertemakan adat dari suku jawa',
        },
        {
          title: 'Beautiful Wood',
          desc: 'Invitation web bertemakan kayu indah',
        },
        {
          title: 'Dark Grey',
          desc: 'Invitation web dengan tema palette abu gelap',
        },
        {
          title: 'Pink Flowers',
          desc: 'Invitation web bertemakan bunga yang indah berwarna merah muda',
        },
        {
          title: 'Dark Gold',
          desc: 'Invitation web bertemakan warna gelap dan juga emas',
        },
      ]
    }
  },
  mounted() {
    this.getUserInfo(auth.currentUser)
  },
  methods: {
    async getUserInfo(user) {
      try {
        this.username = await user.displayName

        if(this.username == null) {
          this.username = user.email;
        }
      } catch(error) {
        console.log(error.message)
      }
    }
  },
  setup() {
    return {
      modules: [Pagination, Navigation]
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/base.scss';

  .dashboard-content {
    .welcome-text {
      h1 span {
        color: $secondary-color;
      }
    }
  }

  .dashboard-progress {
    width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.425) 0px 0px 0px, rgba(0, 0, 0, 0.425) 0px 6px 6px;
    margin: 2rem;
  }

  @media screen and (max-width: 768px) {
    .userprofile-dashboard {
      flex-direction: column;
      justify-content: center;
      .user-img {
        margin-bottom: 2rem;
      }
    }
  }

  .project-container {
    .project-wrapper-title {
      position: relative;
      padding-left: 1rem;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-left: 5px solid $secondary-color;
      }
    }
  }

  .project-list-wrapper {
    width: 90%;
    .mySwiper {
      list-style: none;
      padding-left: 0;
      .swiper-pagination {
        transform: translateY(1rem);
      }
      .swiper-pagination-bullet-active {
        background: $dark;
      }
      .swipe {
        margin-bottom: 2rem;
        .project {
          width: 300px;
          height: 350px;
          background: $white;
          border-radius: 15px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
          .img {
            width: 100%;
            height: 60%;
            border-radius: 15px;
            display: grid;
            place-items: center;
            background: $dark;
            img {
              width: 50%;
            } 
          }
          .project-content {
            width: 100%;
            height: 40%;
            border-radius: 0 0 15px 15px;
            background: $white;
            padding: 1rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .project-list-wrapper {
      width: 100%;

      .project {
        width: 100%;
        height: 250px;
      }
    }
  }
</style>