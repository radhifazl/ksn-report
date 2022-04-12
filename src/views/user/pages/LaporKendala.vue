<template>
  <div class="lapor-progress-wrapper d-flex">
    <div class="lapor-progress" style="height: 100vh">
      
      <PageHeader>
        <UserRoutes />
      </PageHeader>

      <div class="lapor-header p-4">
          <h2 class="font-title mb-1" id="welcome-text">
            Lapor Kendala
          </h2>
      </div>

      <div class="laporan-container p-4 pt-2 d-flex justify-content-between align-items-start w-100 gap-5 flex-lg-row flex-column">
        <div class="form-wrapper">
          <form id="form-laporan" @submit.prevent="sendKendala">
            <input type="hidden" name="uid" id="uid" v-model="formLaporan.uid"> 
            <div class="laporan-nama laporan-box">
              <input type="text"
               v-model="formLaporan.name" 
               name="name" 
               id="name" 
               placeholder="Nama" 
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
               placeholder="Nama Tugas" 
               autocomplete="off" minlength="10" maxlength="50"
              >
            </div>
            <div class="laporan-desc laporan-box">
              <textarea name="desc" id="desc" placeholder="Jelaskan kendalamu disini" v-model="formLaporan.desc" minlength="50"></textarea>
            </div>

            <SubmitButton/>
          </form>
        </div>

        <div class="submitted-report-wrapper" v-if="isKendalaSent">
          <div class="wrapper-title mb-3">
            <button class="see-report-btn d-flex align-items-center" @click="getLastReport">
              <i class='bx-fw bx bxs-chevron-right'></i> 
              <h5>Lihat Laporan Yang Sudah Dikirim</h5>
            </button>
          </div>

          <div class="report-wrapper w-100" v-if="lastReport.length > 0">
            <div class="report-item" v-for="(report, i) in lastReport" :key="i">
              <div class="item-box box-nama">
                <h6 class="label label-nama"><i class='bx-fw bx bxs-circle'></i> Nama</h6>
                <p>{{ report.name }}</p>
              </div>
              <div class="item-box box-team">
                <h6 class="label label-team"><i class='bx-fw bx bxs-circle'></i> Team</h6>
                <p>{{ report.team }}</p>
              </div>
              <div class="item-box box-email">
                <h6 class="label label-email"><i class='bx-fw bx bxs-circle'></i> Email</h6>
                <p>{{ report.email }}</p>
              </div>
              <div class="item-box box-tugas">
                <h6 class="label label-tugas"><i class='bx-fw bx bxs-circle'></i> Tugas</h6>
                <p>{{ report.namatugas }}</p>
              </div>
              <div class="item-box box-kendala flex-column">
                <h6 class="label label-kendala"><i class='bx-fw bx bxs-circle'></i> Kendala</h6>
                <p class="desc-paragraph">{{ report.desc }}</p>
              </div>

              <div class="delete-report">
                <button class="delete-report-btn btn btn-danger" @click="deleteReport(report.id)">
                  <i class='bx-fw bx bxs-trash'></i> Hapus Laporan
                </button>
              </div>
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
  doc, collection, setDoc, 
  addDoc, getDoc, getDocs, deleteDoc
} from "firebase/firestore";
import Swal from "sweetalert2";
import SubmitButton from "@/components/Buttons/SubmitButton.vue";

export default {
    name: 'LaporKendala',
    components: {
      PageHeader, UserRoutes, SubmitButton
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
        lastReport: []
      }
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
      }
    },
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

  .submitted-report-wrapper {
    width: 50%;
    overflow-x: hidden;
    .wrapper-title {
      .see-report-btn {
        border: none;
        outline: none;
        background: transparent;
        font-family: $first-font;
      }
    }

    .report-wrapper {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
      padding: 0.8rem;
      .report-item {
        .item-box {
          display: flex;
          margin-bottom: 1rem;
          .label {
            width: 40%;
            position: relative;

            i {
              font-size: 0.436rem;
            }

            &::after {
              content: ':';
              position: absolute;
              right: 5%;
              top: 0;
              font-weight: bold;
            }
          }
          p {
            width: 60%;
            border-bottom: 1px solid #888;
          }
        }
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

    .submitted-report-wrapper {
      width: 100%;
      .wrapper-title {
        .see-report-btn {
          h5 {
            font-size: 1.2rem;
            text-align: left;
            padding-left: 0.5rem;
          }
        }
      }

      .report-wrapper {
        .report-item {
          .item-box {
            flex-direction: column;
            p {
              width: 100%;
            padding-left: 0.8rem;
            }

          }
        }
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
    .submitted-report-wrapper {
      .report-wrapper {
        .report-item {
          .item-box {
            p {
              width: 60%;
            }

            p.desc-paragraph {
              width: 100%;
              height: fit-content;
              padding-left: 0.7rem;
            }
          }
        }
      }
    }
  }
}
</style>