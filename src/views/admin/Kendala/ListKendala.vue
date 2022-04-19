<template>
  <div class="list-kendala-wrapper w-100 bg-col">
    <div class="list-kendala" style="height: 100%">
      <PageHeader>
          <AdminRoutes />
      </PageHeader>
      
      <div class="list-content">
        <user-list @getUser="getUser"/>

        <div class="send-show-kendala mt-4" v-if="isKendala">
          <div class="send-show-title w-100 d-flex align-items-center gap-2 mb-3">
              <i class='bx-fw bx bx-list-ul'></i>
              <h3 class="font-title">Daftar Kendala</h3>
          </div>
          <div class="daftar-kendala-container d-flex justify-content-between align-items-center flex-wrap flex-column flex-lg-row w-100">
            <div class="box-kendala" v-for="(report, i) in kendala" :key="i" :id="'kendala-'+i">
              <div class="box-header d-flex justify-content-between align-items-center p-3">
                <h5 class="font-title">{{report.namatugas}}</h5>
                <span>{{report.date}}</span>
                <button class="btn btn-secondary">
                  Reply
                </button>
              </div>

              <div class="box-content p-3">
                <div class="content-info">
                  <div class="kendala kendala-pengirim">
                    <h6 class="font-title">Nama</h6>
                    <span>{{report.name}}</span>
                  </div>

                  <div class="kendala kendala-team">
                    <h6 class="font-title">Team</h6>
                    <span>{{report.team}}</span>
                  </div>
                  
                  <div class="kendala kendala-email">
                    <h6 class="font-title">Email</h6>
                    <!-- <a :href="'mailto:'+kendala.email">radhifazlinurfahriza@gmail.com</a> -->
                    <span>{{report.email}}</span>
                  </div>

                  <div class="kendala kendala-tugas">
                    <h6 class="font-title">Nama Tugas</h6>
                    <span>{{report.namatugas}}</span>
                  </div>
                </div>

                <div class="kendala-desc">
                  <h6 class="font-title">Deskripsi Kendala</h6>
                  <div class="isi-desc">
                    <p>
                      {{report.desc}}
                    </p>
                  </div>
                </div>
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
import AdminRoutes from '@/components/SidebarRoutes/AdminRoutes.vue'
import UserList from '../UserList.vue'
import { collection, doc, getDocs } from '@firebase/firestore'
import { firestore } from "@/firebase";
export default {
  components: { PageHeader, AdminRoutes, UserList },
  name: 'ListKendala',
  data() {
    return {
      kendala: [],
      isKendala: false,
    }
  },
  methods: {
    async getUser({ id }) {
      this.isKendala = true
      const docSnap = await getDocs(collection(firestore, 'user', 'kendala', id))
      docSnap.forEach(doc => {
        this.kendala.push(doc.data())
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.send-show-kendala {
  padding: 1.5rem;
  .daftar-kendala-container {
    background: $white;
    padding: 0.8rem;
    border: 1px solid rgb(206, 206, 206);
    box-shadow: rgba(82, 83, 85, 0.199) 0px 1px 2px 0px, rgba(99, 102, 104, 0.15) 0px 2px 6px 2px;
    gap: 1rem;
    padding: 2rem;
    height: 100%;

    .box-kendala {
      width: 48%;
      height: 500px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

      .box-header {
        background: $dark;
        color: $secondary-color;
        border-radius: 10px 10px 0 0;
        span {
          color: #888;
        }
      }

      .box-content {
        height: 100%;
        .content-info {
          height: fit-content;
        }
        .kendala {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #888;
          margin-bottom: 1rem;
          overflow: hidden;

          h6 {
            position: relative;
            width: 200px;
            &::after {
              content: ':';
              position: absolute;
              top: 0;
              right: 0;
            }
          }

          span {
            font-family: $third-font;
          }
        }

        .kendala-desc {
          height: 40%;
          h6 {
            position: relative;
            width: 200px;
            padding-bottom: 0.5rem;
            &::after {
              content: ':';
              position: absolute;
              top: 0;
              right: 0;
            }
          }

          .isi-desc {
            height: 100%;
            overflow: auto;
            p {
              font-family: $third-font;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .send-show-kendala {
    padding: 1rem;
    .daftar-kendala-container {
      padding: 1rem;
      .box-kendala {
        width: 100%;
        .content-info {
          .kendala {
            flex-direction: column;
            align-items: flex-start;
            h6 {
              width: 50%;
            }
          }
          .kendala-desc {
            height: 20%
          }
        }
      }
    }
  }
}
</style>