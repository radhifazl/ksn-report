<template>
  <div class="lapor-progress-wrapper d-flex">
    <div class="lapor-progress" style="height: 100vh">
      
      <PageHeader>
        <UserRoutes />
      </PageHeader>

      <div class="lapor-header text-center p-4">
          <h2 class="font-title mb-2 mt-3" id="welcome-text">
            Lapor Kendala
          </h2>
      </div>

      <div class="laporan-container p-4 pt-2">
        <div class="form-wrapper mx-auto">
          <form id="form-laporan" @submit.prevent="sendKendala">
            <input type="hidden" name="uid" id="uid" v-model="formLaporan.uid"> 
            <div class="laporan-nama laporan-box">
              <input type="text"
               v-model="formLaporan.name" 
               name="name" 
               id="name" 
               placeholder="Nama Lengkap" 
               autocomplete="off" minlength="10" maxlength="50"
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
               placeholder="Nama Tugas / Project" 
               autocomplete="off" minlength="10" maxlength="50"
              >
            </div>
            <div class="laporan-desc laporan-box">
              <textarea name="desc" id="desc" placeholder="Jelaskan kendalamu disini" v-model="formLaporan.desc" minlength="50"></textarea>
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
              <span v-if="isKendalaSent">*Lihat laporan terakhir yang kamu kirim di bawah.</span>
            </SubmitButton>
          </form>
        </div>
      </div>
      
      <div class="submitted-report-wrapper mt-3 p-4" v-if="isKendalaSent">
          <div class="wrapper-title mb-3">
            <button class="see-report-btn mx-auto d-flex align-items-center" @click="getLastReport" :disabled="isDsabled">
              <i class='bx-fw bx bxs-chevron-right'></i> 
              <h5>Lihat Laporan Yang Sudah Dikirim</h5>
            </button>
          </div>
          <div class="report-wrapper mx-auto" v-if="lastReport.length > 0">
            <div class="report-item" v-for="(report, i) in lastReport" :key="i">
              <div class="submitted-wrapper">
                <div class="item-box box-nama">
                  <h6 class="label label-nama"><i class='bx-fw bx bxs-circle'></i>Nama Lengkap</h6>
                  <p>{{ report.name }}</p>
                </div>
                <div class="item-box box-team">
                  <h6 class="label label-team"><i class='bx-fw bx bxs-circle'></i>Nama Team</h6>
                  <p>{{ report.team }}</p>
                </div>
                <div class="item-box box-email">
                  <h6 class="label label-email"><i class='bx-fw bx bxs-circle'></i>Email</h6>
                  <p>{{ report.email }}</p>
                </div>
                <div class="item-box box-tugas">
                  <h6 class="label label-tugas"><i class='bx-fw bx bxs-circle'></i>Nama Tugas</h6>
                  <p>{{ report.namatugas }}</p>
                </div>
                <div class="item-box box-kendala">
                    <h6 class="label label-kendala"><i class='bx-fw bx bxs-circle'></i>Kendala</h6>
                    <p class="desc-paragraph">{{ report.desc }}</p>
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
                    <label for="editdesc">Deskripsi Kendala</label>
                      <textarea id="editdesc" name="editdesc" autocomplete="off" v-model="updateForm.updateDesc"></textarea>
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
import { Toast } from "@/plugins/Toast";
import { uuid } from "@/plugins/Uuid";
import { 
  doc, collection, setDoc, updateDoc,
  addDoc, getDoc, getDocs, deleteDoc
} from "firebase/firestore";
import Swal from "sweetalert2";
import SubmitButton from "@/components/Buttons/SubmitButton.vue";
import DeleteButton from "@/components/Buttons/DeleteButton.vue";
import UpdateButton from '@/components/Buttons/UpdateButton.vue';

export default {
    name: 'LaporKendala',
    components: {
      PageHeader, UserRoutes, 
      SubmitButton, DeleteButton, UpdateButton
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
        },
        isKendalaSent: false,
        kendalaUser: [],
        lastReport: [],
        loading: false,
        isDisabled: false,
        popEditForm: false,
        updateForm: { 
          updateNama: '',
          updateNamatugas: '',
          updateDesc: ''
        },
      }
    },
    methods: {
      async sendKendala() {
        if(!this.formLaporan.name || !this.formLaporan.namatugas || !this.formLaporan.desc) {
          Toast.fire({
            title: 'Form kosong, mohon isi semua!',
            icon: 'warning'
          })
        } else {
          this.loading = true
          await addDoc(collection(firestore, 'kendala', this.user.displayName, this.user.displayName), {
            id: uuid(),
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
            })
            this.isKendalaSent = true
            this.loading = false
            setTimeout(() => {
              this.isKendalaSent = false
            }, 300000)
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
          
          this.formLaporan.name = ''
          this.formLaporan.namatugas = ''
          this.formLaporan.desc = ''
        }
      },
      async getLastReport() {
        this.isDisabled = true
        const docSnap = await getDocs(collection(firestore, 'kendala', this.user.displayName, this.user.displayName))
        docSnap.forEach(doc => {
          this.kendalaUser.push({...doc.data(), id: doc.id})
        })
        if(this.kendalaUser.length > 1) {
          this.lastReport.push(this.kendalaUser[0])
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
          confirmButtonText: 'Ya, hapus laporan!'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteDoc(doc(firestore, 'kendala', this.user.displayName, this.user.displayName, id))
            Swal.fire(
              'Terhapus!',
              'Laporan berhasil dihapus.',
              'success'
            )
            this.isKendalaSent = false
          }
        }).catch(err => {
          console.log(err)
        })
      },
      editReport(id) {
        if(!this.updateForm.updateNama || !this.updateForm.updateNamatugas || !this.updateForm.updateDesc) {
          Swal.fire({
            title: 'Form kosong, mohon isi semua!',
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Oke',
          })
        } else {
          updateDoc(doc(firestore, 'kendala', this.user.displayName, this.user.displayName, id), {
            name: this.updateForm.updateNama,
            namatugas: this.updateForm.updateNamatugas,
            desc: this.updateForm.updateDesc
          }).then(() => {
            Toast.fire({
              title: 'Laporan berhasil diperbarui!',
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: 'Dismiss',
              showCloseButton: false,
            })
            this.popEditForm = false
            this.getLastReport()
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

      }
    },
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
@import "@/styles/submittedreport.scss";
@import "@/styles/updateform.scss";

.lapor-progress-wrapper {
  background-color: rgb(241, 241, 241);
}
.lapor-progress {
  width: 100%;
  height: 100%;
}

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

        i {
          font-size: 1rem;
        }
      }
    }
  }
}


</style>