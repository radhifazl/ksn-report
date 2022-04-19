<template>
  <div class="lapor-progress-wrapper d-flex bg-col">
    <div class="lapor-progress" style="height: 100vh">
      <PageHeader>
        <UserRoutes />
      </PageHeader>

      <div class="lapor-header text-center p-4">
          <h2 class="font-title mb-2 mt-3" id="welcome-text">
            Lapor Progress
          </h2>
          <span v-if="isKendalaSent">*Lihat laporan terakhir yang kamu kirim di bawah.</span>
      </div>

      <div class="laporan-container p-4 pt-2">
        <div class="form-wrapper mx-auto">
          <form id="form-laporan" @submit.prevent="sendProgress">
            <input type="hidden" name="uid" id="uid" v-model="user.uid"> 
            <div class="laporan-nama laporan-box">
              <input type="text" 
               name="name" 
               id="name" 
               placeholder="Nama Lengkap" minlength="10"
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
               placeholder="Nama Tugas" minlength="10"
               autocomplete="off" v-model="formLaporan.namatugas"
              >
            </div>
            <div class="laporan-gitlablink laporan-box">
              <input type="text" 
               name="gitlablink" 
               id="gitlab-link" 
               placeholder="Link Project (GitLab)" minlength="14"
               autocomplete="off" v-model="formLaporan.gitlablink"
               pattern="https?://gitlab.+" title="Include https://gitlab"
              >
            </div>

            <SubmitButton>
              <button type="submit" class="submitlaporan-btn">
                <div class="loading" v-if="loading">
                  <i class='bx-fw bx bxs-send bx-fade-left' ></i> <span>Mengirim...</span>
                </div>
                <div class="send-text" v-else>
                  <i class='bx-fw bx bxs-send'></i> Submit Laporan
                </div>
              </button>
            </SubmitButton>
          </form>
        </div>
      </div>
      <div class="submitted-report-wrapper mt-3 p-4" v-if="isKendalaSent">
          <div class="wrapper-title mb-3">
            <button class="see-report-btn mx-auto d-flex align-items-center mx-auto" @click="getLastReport" :disabled="isDisabled">
              <i class='bx-fw bx bxs-chevron-right'></i> 
              <h5>Lihat Laporan Yang Sudah Dikirim</h5>
            </button>
          </div>
          <div class="report-wrapper mx-auto" v-if="lastReport.length > 0">
            <div class="report-item" v-for="(report, i) in lastReport" :key="i">
              <div class="submitted-wrapper">
                <div class="item-box box-nama">
                  <h6 class="label label-nama"><i class='bx-fw bx bxs-circle'></i> Nama Lengkap</h6>
                  <p>{{ report.name }}</p>
                </div>
                <div class="item-box box-team">
                  <h6 class="label label-team"><i class='bx-fw bx bxs-circle'></i> Nama Team</h6>
                  <p>{{ report.team }}</p>
                </div>
                <div class="item-box box-email">
                  <h6 class="label label-email"><i class='bx-fw bx bxs-circle'></i> Email</h6>
                  <p>{{ report.email }}</p>
                </div>
                <div class="item-box box-tugas">
                  <h6 class="label label-tugas"><i class='bx-fw bx bxs-circle'></i>Nama Tugas</h6>
                  <p>{{ report.namatugas }}</p>
                </div>
                <div class="item-box box-gitlab flex-column">
                  <h6 class="label label-kendala"><i class='bx-fw bx bxs-circle'></i>Gitlab Link</h6>
                  <p class="desc-paragraph">{{ report.gitlablink }}</p>
                </div>
              </div>

              <div class="option-btn-wrapper d-flex align-items-center gap-3">
                <DeleteButton @deleteReport="deleteReport(report.id)"/>
                <UpdateButton @editReport="popEditForm = true"/>
              </div>


              <div class="update-form-wrapper w-100" v-if="popEditForm">
                <form id="edit-form" class="p-4" @submit.prevent="editReport(report.id)">
                  <div class="form-title d-flex align-items-center justify-content-center">
                    <i class='bx-fw bx bxs-edit'></i>
                    <h5>Update Laporan</h5>
                  </div>
                  <div class="note mb-3">
                    <p class="text-center font-desc-2" style="font-style: italic; font-size: 0.838rem;">Note: Nama team dan email tidak dapat dirubah</p>
                  </div>
                  <div class="update update-name">
                    <label for="editnama">Nama Lengkap</label>
                      <input type="text" id="editnama" name="editnama" autocomplete="off" v-model="updateForm.updateNama">
                  </div>

                  <div class="update update-namatugas">
                    <label for="editnamatugas">Nama Tugas</label>
                      <input type="text" id="editnamatugas" name="editnamatugas" autocomplete="off" v-model="updateForm.updateNamatugas">
                  </div>

                  <div class="update update-desc">
                    <label for="editgitlab">Deskripsi Kendala</label>
                    <input type="text" id="editgitlab" name="editgitlab" autocomplete="off" v-model="updateForm.updateLink">
                  </div>

                  <button type="submit" class="update-btn">
                    <i class='bx-fw bx bxs-edit'></i> Update Laporan
                  </button>
                  <button class="update-btn" @click="popEditForm = false">
                    Batalkan
                  </button>
                </form>
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
import { auth, firestore } from '@/firebase'
import { Toast } from "@/plugins/Toast"
import { uuid } from "@/plugins/Uuid"
import Swal from 'sweetalert2'
import {
  addDoc, deleteDoc, collection, doc, getDocs, updateDoc
} from "firebase/firestore"
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import DeleteButton from '@/components/Buttons/DeleteButton.vue';
import UpdateButton from '@/components/Buttons/UpdateButton.vue';

export default {
    name: 'LaporProgress',
    components: {
      PageHeader, UserRoutes, SubmitButton, DeleteButton, UpdateButton
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
        },
        isKendalaSent: false,
        loading: false,
        progressUser: [],
        lastReport: [],
        isDisabled: false,
        updateForm: {
          updateNama: '',
          updateNamatugas: '',
          updateLink: ''
        },
        popEditForm: false
      }
    },
    methods: {
      async sendProgress() {
        if(!this.formLaporan.name || !this.formLaporan.namatugas || !this.formLaporan.gitlablink) {
          Toast.fire({
            icon: 'error',
            title: 'Mohon lengkapi form progress dengan benar!',
          })
        } else {
          this.loading = true
          await addDoc(collection(firestore, 'user', 'progress', this.user.uid), {
            id: uuid(),
            name: this.formLaporan.name,
            team: this.formLaporan.team,
            email: this.formLaporan.email,
            namatugas: this.formLaporan.namatugas,
            gitlablink: this.formLaporan.gitlablink,
            date: this.getDate(new Date())
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
            this.loading = false
            this.isKendalaSent = true
            setTimeout(() => {
              this.isKendalaSent = false
            }, 300000)
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
      async getLastReport() {
        this.isDisabled = true
        const docSnap = await getDocs(collection(firestore, 'user', 'progress', this.user.uid))
        docSnap.forEach(doc => {
          this.progressUser.push({...doc.data(), id: doc.id})
        })
        if(this.progressUser.length >= 1) {
          this.lastReport.push(this.progressUser[0])
        } else {
          this.lastReport = []
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
            deleteDoc(doc(firestore, 'user', 'progress', this.user.uid, id))
            .then(() => {
              Swal.fire(
                'Terhapus!',
                'Laporan berhasil dihapus.',
                'success'
              )
              this.isKendalaSent = false
            })
          }
        })
      },
      editReport(id) {
        if(!this.updateForm.updateNama || !this.updateForm.updateNamatugas || !this.updateForm.updateLink) {
          Swal.fire({
            title: 'Form kosong, mohon isi semua!',
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Oke',
          })
        } else {
          updateDoc(doc(firestore, 'user', 'progress', this.user.uid, id), {
            name: this.updateForm.updateNama,
            namatugas: this.updateForm.updateNamatugas,
            gitlablink: this.updateForm.updateLink,
            date: this.getDate(new Date())
          }).then(() => {
            Toast.fire({
              title: 'Laporan berhasil diperbarui!',
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: 'Dismiss',
              showCloseButton: false,
            })
            this.popEditForm = false
          }).catch(err => {
            Toast.fire({
              title: 'Terjadi kesalahan, mohon coba lagi!',
              text: err.message,
              icon: 'error',
              showConfirmButton: true,
              confirmButtonText: 'Dismiss',
              showCloseButton: false,
            })
          })
        }
      },
      getDate(date) {
        const ddmmyyy = this.padTo2Digits(date.getDate()) + '/' + this.padTo2Digits(date.getMonth()+1) + '/' + date.getFullYear()
        const now = ddmmyyy 
        return now
      },
      padTo2Digits(num) {
        return num.toString().padStart(2, '0')
      }
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
@import "@/styles/submittedreport.scss";
@import "@/styles/updateform.scss";


.lapor-progress {
  width: 100%;
  height: 100%;
}

.lapor-header {
  span {
    color: #888;
  }

  @media screen and (max-width: 768px) {
    span {
      font-size: 0.938rem;
    }
  }
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