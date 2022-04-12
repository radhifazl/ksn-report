<template>
  <div class="lapor-progress-wrapper d-flex">
    <div class="lapor-progress" style="height: 100vh">
      <PageHeader>
        <UserRoutes />
      </PageHeader>

      <div class="lapor-header d-flex justify-content-between align-items-center p-4">
          <h2 class="font-title mb-4" id="welcome-text">
            Lapor Progress
          </h2>
      </div>

      <div class="laporan-container p-4 pt-2">
        <div class="form-wrapper">
          <form id="form-laporan" @submit.prevent="sendProgress">
            <input type="hidden" name="uid" id="uid" v-model="user.uid"> 
            <div class="laporan-nama laporan-box">
              <input type="text" 
               name="name" 
               id="name" 
               placeholder="Nama" 
               autocomplete="off" v-model="formLaporan.name"
              >
            </div>
            <div class="laporan-team laporan-box">
              <input type="text" 
               name="team" 
               id="team" 
               placeholder="Team" 
               autocomplete="off" 
              readonly v-model="formLaporan.team"
              >
            </div>
            <div class="laporan-email laporan-box">
              <input type="email" 
               name="email" 
               id="email" 
               placeholder="Email" 
               autocomplete="off" 
               readonly v-model="formLaporan.email"
              >
            </div>
            <div class="laporan-nama-tugas laporan-box">
              <input type="text" 
               name="namatugas" 
               id="nama-tugas" 
               placeholder="Nama Tugas" 
               autocomplete="off" v-model="formLaporan.namatugas"
              >
            </div>
            <div class="laporan-gitlablink laporan-box">
              <input type="text" 
               name="gitlablink" 
               id="gitlab-link" 
               placeholder="Link Project (GitLab)" 
               autocomplete="off" v-model="formLaporan.gitlablink"
              >
            </div>

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { auth, firestore } from '@/firebase'
import { Toast } from "@/plugins/Toast"
import { uuid } from "@/plugins/Uuid"
import Swal from 'sweetalert2'
import {
  addDoc, deleteDoc, collection, doc
} from "firebase/firestore"
import SubmitButton from '@/components/Buttons/SubmitButton.vue';

export default {
    name: 'LaporProgress',
    components: {
      PageHeader, UserRoutes, SubmitButton
    },
    data() {
      return {
        user: auth.currentUser,
        formLaporan: {
          name: '',
          team: 'Development Team',
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          namatugas: '',
          gitlablink: ''
        }
      }
    },
    methods: {
      async sendProgress() {
        if(!this.formLaporan.name && !this.formLaporan.namatugas && !this.formLaporan.gitlablink) {
          Toast.fire({
            icon: 'error',
            title: 'Mohon lengkapi form progress dengan benar!',
          })
        } else {
          await addDoc(collection(firestore, 'progress', this.user.displayName, this.user.displayName), {
            id: uuid(),
            name: this.formLaporan.name,
            team: this.formLaporan.team,
            email: this.formLaporan.email,
            namatugas: this.formLaporan.namatugas,
            gitlablink: this.formLaporan.gitlablink
          }).then(() => {
            Toast.fire({
              title: 'Laporan berhasil dikirim!',
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: 'Dismiss',
              showCloseButton: false,
              timer: 2000,
              timerProgressBar: true,
            })
          }).catch(() => {
            Toast.fire({
              title: 'Gagal',
              text: 'Laporan gagal dikirim, silahkan coba lagi!',
              icon: 'error',
              showConfirmButton: true,
              confirmButtonText: 'Dismiss',
              showCloseButton: false,
              timer: 2000,
              timerProgressBar: true,
            })
          })
          this.formLaporan.name = ''
          this.formLaporan.namatugas = ''
          this.formLaporan.gitlablink = ''
        }
      },
      deleteReport(id) {
        Swal.fire({
          title: 'Hapus laporan?',
          text: "Laporan akan dihapus secara permanen!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteDoc(doc(firestore, 'progress', this.user.displayName, this.user.displayName, id))
            .then(() => {
              Swal.fire(
                'Terhapus!',
                'Laporan berhasil dihapus.',
                'success'
              )
            })
          }
        })
      }
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.lapor-progress-wrapper {
  background-color: rgb(241, 241, 241);
}

.lapor-progress {
  width: 100%;
  height: 100%;
}

.laporan-container {
  .form-wrapper {
    height: fit-content;

    .laporan-box {
      width: 100%;
      margin-bottom: 1.5rem;
      input {
        width: 100%;
        border: none;
        outline: none;
        border-radius: 5px;
        background: rgba(219, 219, 219, 0.884);
      }

      input {
        height: 2.5rem;
        padding: 0.5rem;
        font-size: 0.83rem;
        font-family: $second-font;
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