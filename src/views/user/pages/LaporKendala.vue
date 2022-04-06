<template>
  <div class="lapor-progress-wrapper ccontainer d-flex">
    <div class="lapor-progress cwrap">
      
      <page-header>
        <user-routes />
      </page-header>

      <div class="lapor-header p-4">
          <h2 class="font-title mb-1" id="welcome-text">
            Lapor Kendala
          </h2>
      </div>

      <div class="laporan-container p-4 pt-2">
        <div class="form-wrapper">
          <form id="form-laporan" @submit.prevent="sendKendala">
            <input type="hidden" name="uid" id="uid" v-model="formLaporan.uid"> 
            <div class="laporan-nama laporan-box">
              <input type="text"
               v-model="formLaporan.name" 
               name="name" 
               id="name" 
               placeholder="Nama" 
               autocomplete="off"
              >
            </div>
            <div class="laporan-team laporan-box">
              <input type="text"
               v-model="formLaporan.team"
               name="team" 
               id="team" 
               placeholder="Team" 
               autocomplete="off" 
               readonly
              >
            </div>
            <div class="laporan-email laporan-box">
              <input type="email"
               v-model="formLaporan.email"
               name="email" 
               id="email" 
               placeholder="Email" 
               autocomplete="off" 
               readonly
              >
            </div>
            <div class="laporan-nama-tugas laporan-box">
              <input type="text" 
               v-model="formLaporan.namatugas"
               name="namatugas" 
               id="nama-tugas" 
               placeholder="Nama Tugas" 
               autocomplete="off"
              >
            </div>
            <div class="laporan-desc laporan-box">
              <textarea name="desc" id="desc" placeholder="Jelaskan kendalamu disini" v-model="formLaporan.desc"></textarea>
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
import PageHeader from '@/components//Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { auth, firestore } from '@/firebase'
import { Toast } from "@/components/Toast";
import { doc, collection, setDoc, addDoc } from "firebase/firestore";

export default {
    name: 'LaporKendala',
    components: {
      PageHeader, UserRoutes
    },
    data() {
      return {
        user: auth.currentUser,
        formLaporan: {
          name: '',
          uid: auth.currentUser.uid,
          team: 'Development Team',
          email: auth.currentUser.email,
          namatugas: '',
          desc: ''
        }

      }
    },
    created() {

    },
    methods: {
      async sendKendala() {
        if(!this.formLaporan.name && !this.formLaporan.namatugas && !this.formLaporan.desc) {
          Toast.fire({
            title: 'Form kosong, mohon isi semua!',
            icon: 'warning'
          })
        } else {
          await addDoc(collection(firestore, 'kendala', this.user.displayName, this.user.displayName), {
            name: this.formLaporan.name,
            uid: this.formLaporan.uid,
            team: this.formLaporan.team,
            email: this.formLaporan.email,
            namatugas: this.formLaporan.namatugas,
            desc: this.formLaporan.desc
          }).then(() => {
            Toast.fire({
              title: 'Laporan berhasil dikirim!',
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: 'Dismiss',
              showCloseButton: false,
              timer: 3000,
              timerProgressBar: true
            })
          })
          
          this.formLaporan.name = ''
          this.formLaporan.namatugas = ''
          this.formLaporan.desc = ''
        }
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
        font-weight: 400;
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