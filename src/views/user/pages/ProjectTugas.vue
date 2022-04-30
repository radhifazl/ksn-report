<template>
  <div class="project-tugas-wrapper bg-col">
        <PageHeader>
          <UserRoutes />
        </PageHeader>
        <div class="tugas-content p-4 padtop">
          <div class="tugas-header d-flex justify-content-between align-items-center">
            <h2 class="font-title mb-4" id="welcome-text">
              Daftar Tugas :
            </h2>
          </div>

          

          <div class="daftar-tugas d-flex flex-wrap gap-4">
              <div class="loading text-center mx-auto mt-5 pt-5" v-if="loading">
                <i class='bx bx-shape-circle bx-spin mt-5' style="font-size: 5rem"></i> <br>
                <span class="font-title" style="font-size: 2rem">Loading</span>
              </div>

              <div class="tugas-box" v-for="(task, i) in listTugas" :key="task.id" :id="'tugas-'+i"> 
                <div class="tugas-header d-flex align-items-start justify-content-between">
                  <h4 class="tugas-title font-title">{{ task.tugas }}</h4>
                  <span class="date font-title">{{ task.date }}</span>
                </div>

                <div class="tugas-status mb-4">
                  <span class="status font-title">{{ task.status }}</span>
                </div>

                <div class="tugas-content">
                  <div class="figma-link-wrapper">
                    <h6 class="figma-title font-title">Figma :</h6>
                    <a class="figma-link font-title" :href="task.figma">{{ task.figma }}</a>
                  </div>

                  <div class="gitlab-link-wrapper">
                    <h6 class="gitlab-title font-title">Gitlab :</h6>
                    <a class="gitlab-link font-title" :href="task.gitlab">{{ task.gitlab }}</a>
                  </div>

                  <div class="desc-wrapper">
                    <h6 class="gitlab-title font-title">Deskripsi / Note</h6>
                    <p>
                      {{ task.desc ? task.desc : 'Tidak ada deskripsi / note yang ditambahkan' }}
                    </p>
                  </div>
                </div>

                <div class="tugas-report-btn task-selesai" title="Tugas sudah selesai, tidak ada yang perlu dilaporkan" v-if="taskFinished">
                  <div class="font-title">
                    <i class='bx-fw bx bxs-badge-check'></i> Tugas Selesai
                  </div>
                </div>

                <div class="tugas-report-btn" @click="reportTugas(task.id, task.tugas)">
                  <div class="font-title">
                    <i class='bx-fw bx bxs-report'></i> Lapor Tugas
                  </div>
                </div>
              </div> 

              <div class="no-tugas text-center mt-5 pt-5" v-if="noDoc">
                <img src="@/assets/images/vector/nodata.svg" alt="No Document Found" width="230">
                <h4 class="font-title mt-2">Belum ada tugas yang diberikan</h4>
              </div>
          </div>
        </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { firestore, auth } from "@/firebase";
import { collection, getDocs } from '@firebase/firestore';
export default {
  components: { PageHeader, UserRoutes },
  name: 'UserTugas',
  data() {
    return {
      uid: auth.currentUser.uid,
      listTugas: [],
      loading: false,
      noDoc: false,
      taskFinished: false,
    }
  },
  created() {
    this.getTugas()
  },
  methods: {
    async getTugas() {
      this.loading = true
      const docSnap = await getDocs(collection(firestore, 'user', 'tugas', this.uid))
      
      if(!docSnap.empty) {
        docSnap.forEach(doc => {
          this.listTugas.push({
            id: doc.id,
            ...doc.data()
          })

          if(doc.data().status === 'Selesai Dikerjakan') {
            this.taskFinished = true
          }
        })
        this.noDoc = false
      } else {
        this.listTugas = []
        this.noDoc = true
      }
      this.loading = false
    },
    reportTugas(id, tugas) {
      this.$router.push({
        name: 'LaporProgress',
        params: {
          namaTugas: tugas,
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
.project-tugas-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  .project-tugas {
    width: 100%;
    height: 100px;
  }
}

.tugas-box {
  width: 48%;
  height: 100%;
  min-height: 300px;
  box-shadow: rgba(0, 0, 0, 0.425) 0px 0px 0px, rgba(0, 0, 0, 0.425) 0px 6px 6px;
  position: relative;
  background: $primary-color;
  color: $white;
  border-radius: 10px;
  padding: 1rem;
  padding-bottom: 5rem;

  .tugas-header {
      color: $secondary-color;
      span {
        color: $gray;
      }
  }

  .tugas-status {
    .status {
      color: $gray;
    }
  }

  .tugas-content {
    div {
      margin-bottom: 0.5rem;
      border-bottom: 1px solid $gray;
      padding-bottom: 0.5rem;
      a {
        cursor: pointer;
        width: 50px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .gitlab-link-wrapper, .figma-link-wrapper {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .desc-wrapper {
      p {
        height: 100px;
        overflow-y: auto;
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

  .tugas-option-btn {
    position: absolute;
    bottom: 1%;
    right: 5%;

    .btn-icon {
      border: 2px solid #fff;
      display: grid;
      place-items: center;
      border-radius: 50%;
      cursor: pointer;
      i {
        font-size: 1.5rem;
      }
      &:hover {
        background: rgba(233, 233, 233, 0.349);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .tugas-box {
    width: 100%;
  }
}
</style>