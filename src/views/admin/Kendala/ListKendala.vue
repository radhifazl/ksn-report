<template>
  <div class="list-kendala-wrapper w-100 bg-col">
    <div class="list-kendala" id="list-container" :class="{height: isKendala}">
      <PageHeader>
          <AdminRoutes />
      </PageHeader>
      
      <div class="list-content padtop">
        <UserList @getUser="getUser"/>

        <div class="send-show-kendala mt-4" v-if="isKendala">
          <div class="send-show-title w-100 d-flex align-items-center gap-2 mb-3">
              <i class='bx-fw bx bx-list-ul'></i>
              <h3 class="font-title">Daftar Kendala</h3>
          </div>
          <div class="daftar-kendala-container d-flex justify-content-between align-items-center flex-wrap flex-column flex-lg-row w-100">

            <div class="box-kendala" v-for="(report, i) in kendalaUser" :key="i" :id="'kendala-'+i">
              <div class="box-header p-3">
                <h5 class="font-title">{{report.namatugas}}</h5>
                <div class="header-info d-flex justify-content-between align-items-center ">
                  <span>{{report.date}}</span>
                  <button class="btn btn-secondary" @click="getDetail(report.id, report.uid)">
                    Cek Detail
                  </button>
                </div>
              </div>

              <div class="box-content p-3">
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
        <h5 class="text-center" v-if="loading">Loading...</h5>
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
      kendalaUser: [],
      isKendala: false,
      loading: false,
    }
  },
  methods: {
    async getUser({ id }) {
      this.loading = true
      this.kendalaUser = []
      const docSnap = await getDocs(collection(firestore, 'user', 'kendala', id))
      docSnap.forEach(doc => {
        this.kendalaUser.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      this.isKendala = true
      this.loading = false
    },
    getDetail(id, uid) {
      this.$router.push({
        name: 'DetailKendala',
        params: { 
          id, 
          uid,
        }
      })
    }
  },
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.list-kendala {
  height: 100vh;
}

.list-kendala.height {
  height: fit-content;
  padding-bottom: 3rem;
}

.send-show-kendala {
  padding: 1.5rem;
  height: 100%;
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
      height: 300px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

      .box-header {
        background: $dark;
        color: $secondary-color;
        border-radius: 10px 10px 0 0;
        span {
          color: $gray;
        }
      }

      .box-content {
        height: 100%;

        .kendala-desc {
          height: 100%;
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