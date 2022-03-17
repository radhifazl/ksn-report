<template>
  <div class="lapor-progress-wrapper ccontainer d-flex">
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
    <div class="lapor-progress cwrap">
      <page-header />

      <div class="lapor-header d-flex justify-content-between align-items-center p-4">
          <h2 class="font-title mb-4" id="welcome-text">
            Lapor Kendala
          </h2>

          <h6 class="font-desc">{{tanggal}}</h6>
      </div>

      <div class="laporan-container p-4 pt-2">
        <div class="form-wrapper">
          <form id="form-laporan">
            <input type="hidden" name="uid" id="uid"> 
            <div class="laporan-nama laporan-box">
              <input type="text" 
               name="name" 
               id="name" 
               placeholder="Nama" 
               autocomplete="off"
              >
            </div>
            <div class="laporan-team laporan-box">
              <input type="text" 
               name="team" 
               id="team" 
               placeholder="Team" 
               autocomplete="off" 
               value="Development Team" readonly
              >
            </div>
            <div class="laporan-email laporan-box">
              <input type="email" 
               name="email" 
               id="email" 
               placeholder="Email" 
               autocomplete="off" 
               :value="inpEmail" readonly
              >
            </div>
            <div class="laporan-nama-tugas laporan-box">
              <input type="text" 
               name="namatugas" 
               id="nama-tugas" 
               placeholder="Nama Tugas" 
               autocomplete="off"
              >
            </div>
            <div class="laporan-desc laporan-box">
              <textarea name="desc" id="desc" placeholder="Jelaskan kendalamu disini"></textarea>
            </div>

            <div class="submitlaporan-button">
              <button type="submit" class="submitlaporan-btn">
                <i class='bx-fw bx bxs-send'></i> Submit Laporan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/Sidebar/AppSidebar.vue'
import PageHeader from '@/components//Header/PageHeader.vue'
import { auth } from '@/firebase'

export default {
    name: 'LaporKendala',
    components: {
      AppSidebar,
      PageHeader
    },
    data() {
      return {
        tanggal: '',
        inpEmail: ''
      }
    },
    mounted() {
      this.getDate()
      this.getEmail()
    },
    methods: {
      getDate() {
        const now = new Date()
        this.tanggal = now.toJSON().slice(0, 10).toString()
      },
      getEmail() {
        this.inpEmail = auth.currentUser.email
      }
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.laporan-container {
  .form-wrapper {
    width: 50%;
    height: fit-content;

    .laporan-box {
      margin-bottom: 1.5rem;
      input, textarea {
        width: 100%;
        height: 2.5rem;
        padding: 0.5rem;
        border: none;
        outline: none;
        border-radius: 5px;
        background: rgba(219, 219, 219, 0.884);
        font-size: 0.83rem;
        font-family: $second-font;
      }

      textarea {
        height: 100px;
        resize: none;
      }
    }

    .submitlaporan-button {
      .submitlaporan-btn {
        border: none;
        border-radius: 5px;
        background: $dark;
        color: $white;
        font-family: $second-font;
        font-weight: 600;
        padding: 0.8rem 0;
        font-size: 0.83rem;
        transition: 1s ease;

        /* &:hover i {
          animation: moveright 1s ease infinite;
          transition: 1s ease;
        } */

        /* @keyframes moveright {
          0%, 100% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(-1rem);
          }
        } */
      }
    }
  }
}


@media screen and (max-width: 768px) {
  .laporan-container {
    .form-wrapper {
      width: 100%;


      .submitlaporan-btn {
        width: 70%;
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .laporan-container {
    .form-wrapper {
      width: 50%;

      
      .submitlaporan-btn {
        width: 40%;
      }
    }
  }
}
</style>