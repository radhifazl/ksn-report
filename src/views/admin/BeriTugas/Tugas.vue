<template>
  <div class="send-tugas-container bg-col w-100" style="height: 100%; min-height: 100vh">
      <PageHeader>
          <AdminRoutes/>
      </PageHeader>

      
      <UserList @getUser="getUser" class="padtop"/>

      <div class="send-tugas-wrapper p-4">
        <div class="form-wrapper p-2">
          <form action="" @submit.prevent="sendTugas" id="send-tugas-form">
            <div class="input-box input-nama">
              <label class="font-title" for="id_murid">ID Murid</label>
              <input 
                type="text" 
                name="id_murid"
                id="id_murid" 
                placeholder="Masukkan ID Murid" 
                class="form-control" readonly
                v-model="formTugas.id_murid"
              >
            </div>

            <div class="input-box input-nama">
              <label class="font-title" for="nama">Nama</label>
              <input 
                type="text" 
                name="nama" 
                id="nama" 
                placeholder="Masukkan Nama Murid" 
                class="form-control"
                v-model="formTugas.nama"
              >
            </div>
            
            <div class="input-box input-email">
              <label class="font-title" for="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Masukkan Email Murid" 
                class="form-control"
                v-model="formTugas.email"
              >
            </div>
            
            <div class="input-box input-namatugas">
              <label class="font-title" for="tugas">Nama Tugas</label>
              <input 
                type="text" 
                name="tugas" 
                id="tugas" 
                placeholder="Masukkan Nama Tugas" 
                class="form-control"
                v-model="formTugas.tugas"
              >
            </div>
            
            <div class="input-box input-figma">
              <label class="font-title" for="figma">Link Desain (Figma)</label>
              <input 
                type="text" 
                name="figma" 
                id="figma" 
                placeholder="Masukkan Link Desain (Figma)" 
                class="form-control"
                v-model="formTugas.figma"
                pattern="https://www.figma.com/file/(.)+" title="Include https://www.figma.com/file/ in the link"
              >
            </div>
            
            <div class="input-box input-gitlab">
              <label class="font-title" for="gitlab">Link Repository (GitLab)</label>
              <input 
                type="text" 
                name="gitlab" 
                id="gitlab" 
                placeholder="Masukkan Link Desain (Gitlab)" 
                class="form-control"
                v-model="formTugas.gitlab"
                pattern="https://gitlab.com/ksnusantara/(.)+" title="Include https://gitlab.com/ksnusantara/ in the link"
              >
            </div>
            
            <div class="input-box input-desc">
              <label class="font-title" for="desc">Deskripsi</label> <span class="font-desc-2">Optional</span>
              <textarea name="desc" id="desc" placeholder="Tambahkan Deskripsi / Note Mengenai Tugas Yang Diberikan" class="form-control" v-model="formTugas.desc"></textarea>
            </div>

            <div class="submit-wrapper d-flex align-items-center justify-content-between">
              <SubmitButton v-if="userSelected" class=" w-100">
                <button class="submitlaporan-btn p-2 px-4 w-100" disabled>
                  Pilih user terlebih dahulu
                </button>
              </SubmitButton>
              
              <SubmitButton v-else class=" w-100">
                <button class="submitlaporan-btn p-2 px-4 w-100 sending-btn" disabled v-if="loading">
                  <i class='bx-fw bx bxs-send bx-fade-right' style="margin-right: 1rem"></i> Mengirim...
                </button>
                <button class="submitlaporan-btn p-2 px-4 w-100" type="submit" v-else>
                  Kirim Tugas ke Murid
                </button>
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import AdminRoutes from '@/components/SidebarRoutes/AdminRoutes.vue'
import UserList from '../UserList.vue'
import { firestore } from "@/firebase";
import {  
  getDocs, collection, addDoc
} from "firebase/firestore";
import SubmitButton from '@/components/Buttons/SubmitButton.vue';
import { Toast } from "@/plugins/Toast";
import Swal from 'sweetalert2'
import { getDate } from "@/plugins/Date";

export default {
  components: { PageHeader, AdminRoutes, UserList, SubmitButton },
  name: 'SendTugas',
  data() {
    return {
      kendalaUser: [],
      formTugas: {
        id_murid: '',
        nama: '',
        email: '',
        tugas: '',
        figma: '',
        gitlab: '',
        desc: '',
      },
      userSelected: true,
      loading: false,
    }
  },
  methods: {
    getUser({ id, name, email }) {
      this.formTugas.id_murid = id
      this.formTugas.nama = name
      this.formTugas.email = email
      this.userSelected = false
    },
    async sendTugas() {
      const tugas = this.formTugas.tugas,
            figma = this.formTugas.figma,
            gitlab = this.formTugas.gitlab,
            idMurid = this.formTugas.id_murid,
            form = document.getElementById('send-tugas-form')

      if(!tugas || !figma || !gitlab) {
        Toast.fire({
          icon: 'error',
          title: 'Mohon isi form dengan lengkap!'
        })
        return false
      } else {
        this.loading = true
        await addDoc(collection(firestore, 'user', 'tugas', idMurid), {
          tugas: this.formTugas.tugas,
          figma: this.formTugas.figma,
          gitlab: this.formTugas.gitlab,
          desc: this.formTugas.desc,
          id_murid: this.formTugas.id_murid,
          nama: this.formTugas.nama,
          email: this.formTugas.email,
          status: 'Belum Dikerjakan',
          date: getDate(new Date())
        }).then(() => {
          this.loading = false
          Toast.fire({
            icon: 'success',
            title: 'Tugas berhasil dikirim!'
          })
          this.formTugas.nama = ''
          this.formTugas.email = ''
          this.formTugas.desc = ''
          this.formTugas.id_murid = ''
          this.formTugas.tugas = ''
          this.formTugas.figma = ''
          this.formTugas.gitlab = ''
          this.userSelected = true
        }).catch(err => {
          Toast.fire({
            icon: 'error',
            title: err.message
          })
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
.form-wrapper {
  background: $white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  form {
    .input-box {
      margin-bottom: 1rem;
      label {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
      span {
        color: #888;
        font-size: 0.767rem;
        position: relative;
        margin-left: 1rem;

        &::after {
          content: '*';
          position: absolute;
          top: -2px;
          left: -8px;
          color: red;
        }
      }
      input {
        font-size: 0.938rem;
        font-family: $third-font;
      }
      textarea {
        height: 150px;
        resize: none;
      }
    }
    .submitlaporan-btn:disabled {
      background: #888;
      color: #ccc;
      cursor: not-allowed;
    }
    .sending-btn {
      animation: colorChange 1.4s linear infinite;
      @keyframes colorChange {
        0%, 100% {
          color: #fff;
        }
        50% {
          color: #888;
        }
      }
    }

    .sending-btn:disabled {
      background: $dark;
    }
  }
}
</style>