<template>
  <div class="progress-murid-container w-100 bg-col" style="height: 100%; min-height: 100vh;">
      <PageHeader>
          <AdminRoutes/>
      </PageHeader>

      <UserList @getUser="getUser" class="padtop"/>

      <div class="progress-murid p-4">
          <div class="filter-option-wrapper mb-4">
              <span class="filter-title">
                    <i class='bx-fw bx bx-filter' ></i>
                    <label class="font-title mb-2" for="filter">Filter Status</label>
              </span>
              <select class="form-select form-select-sm font-desc mb-2" id="filter" v-model="status" :disabled="isUserSelected">
                <option value="Belum Dikerjakan" selected>Belum dikerjakan</option>
                <option value="Sedang Dikerjakan">Sedang dikerjakan</option>
                <option value="Selesai Dikerjakan">Selesai dikerjakan</option>
              </select>
              <p>
                  User dipilih: {{username}}
              </p>
          </div>

          <div class="tugas-wrapper">
              <div class="tugas mb-4" v-for="(task, i) in daftarTugas" :key="task.id" :id="'tugas-'+i">
                  <div class="tugas-header text-center p-2">
                      <h5 class="font-title">{{task.namatugas}}</h5>
                      <p class="font-title">{{task.date}}</p>
                  </div>
                  <div class="tugas-status p-2 d-flex align-items-start justify-content-between">
                      <h5 class="font-title">Status</h5>
                      <p class="font-title" id="status-tugas">{{task.status}}</p>
                  </div>
                  <div class="tugas-links p-2">
                      <div class="figma-link">
                        <h5 class="font-title">Link Figma</h5>
                        <a class="font-title" :href="task.figmalink">
                            {{task.figmalink}}
                        </a>
                      </div>
                      
                      <div class="gitlab-link">
                        <h5 class="font-title">Link Repository</h5>
                        <a class="font-title" :href="task.gitlablink">
                            {{task.gitlablink}}
                        </a>
                      </div>
                      
                      <div class="confirm-button d-flex justify-content-between align-items-center">
                        <SubmitButton v-if="isFinished">
                            <button class="submitlaporan-btn px-4" @click="confirmStatus(task.uid, task.id)">
                                Konfirmasi Tugas Selesai
                            </button>
                        </SubmitButton>
                        <div class="btn btn-danger delete-button" @click="deleteReport(task.id)">
                            <i class="bx bxs-trash"></i>
                        </div>
                      </div>
                  </div>
              </div>

              <div class="loading-wrapper text-center" v-if="loading">
                <i class='bx bx-shape-circle bx-spin' style="font-size: 5rem"></i> <br>
                <span class="font-title" style="font-size: 2rem">Loading...</span>
              </div>

              <div class="no-data text-center mt-5" v-if="notFound"> 
                  <img src="@/assets/images/vector/nodata.svg" alt="No Data" width="200"> <br> <br>
                  <span class="font-title" style="font-size: 1.2rem;">Dokumen tidak ditemukan</span>
              </div>
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
    getDocs, collection, query, where, getDoc, doc, setDoc, updateDoc
} from "firebase/firestore";
import SubmitButton from '@/components/Buttons/SubmitButton.vue';

export default {
    components: { PageHeader, AdminRoutes, UserList, SubmitButton },
    name: 'ProgressMurid',
    data() {
        return {
            status: '',
            username: '',
            daftarTugas: [],
            isUserSelected: true,
            loading: false,
            notFound: false,
            isFinished: false,
        }
    },
    methods: {
        async getUser({ id, name }) {
            this.loading = true
            this.daftarTugas = []
            this.username = name
            this.notFound = false
            
            const tugasRef = collection(firestore, 'admin', 'tugas', id)
            const docSnap = await getDocs(tugasRef)
            
            if(!docSnap.empty) {
                docSnap.forEach(doc => {
                    this.daftarTugas.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            } else {
                console.log('No Data')
            }

            this.isUserSelected = false
            this.loading = false

            const filter = document.getElementById('filter')
            filter.addEventListener('change', async () => {
                const qy = query(tugasRef, where('status', '==', this.status))
                const querySnap = await getDocs(qy)
                this.loading = true
                this.notFound = false

                if(this.status === 'Selesai Dikerjakan') {
                    this.isFinished = true
                } else {
                    this.isFinished = false
                }

                if(!querySnap.empty) {
                    querySnap.forEach(doc => {
                        this.daftarTugas = []
                        this.daftarTugas.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    this.loading = false
                    this.notFound = false
                } else {
                    this.daftarTugas = []
                    this.notFound = true
                    this.loading = false
                }
            })
        },
        async confirmStatus(uid, id) {
            const docRef = doc(firestore, 'user', 'tugas', uid, id)
            await updateDoc(docRef, {
                status: 'Selesai Dikerjakan'
            }).then(() => {
                alert('Status tugas berhasil diubah')
                this.isFinished = false
            }).catch(err => {
                console.log(err)
            })
        },
        deleteReport(id) {
        }
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.tugas-wrapper {
  .tugas {
    height: 100%;
    background: $white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

    .tugas-header {
        background: $dark;
        border-radius: 10px 10px 0 0;
        h5 {
            color: $secondary-color;
        }
        p {
            color: $gray
        }
    }

    .tugas-status {
        background: $dark;
        color: $white;
    }
    
    .tugas-links {
        .gitlab-link, .figma-link {
            margin-bottom: 1rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
  }
}
</style>