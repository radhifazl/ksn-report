<template>
  <div class="inbox-container w-100 bg-col">
      <div class="inbox-wrapper" style="height: 100vh">
          <PageHeader>
              <UserRoutes/>
          </PageHeader>

          <div class="inbox-content p-4 padtop">
            <div class="inbox-title">
                <h3 class="font-title">Inbox Kendala</h3>
                <span class="font-desc-2" style="color: #888">Temukan balasan dari kendala yang kamu kirim disini!</span>
            </div>

            <div class="inbox-kendala-replies mt-4 w-100">
                <div class="inbox-kendala w-100">
                    <div class="inbox-header p-2 mb-3" v-for="(header, i) in replyHeader" :key="i">
                        <div class="titles">
                            <h5 class="font-title">{{header.nama_tugas}}</h5>
                        </div>
                        <div class="bottom-title">
                            <p>{{header.date}}</p>
                            <button class="btns" @click="sendReplies(header.id, header.nama_tugas)">
                                Check Replies
                            </button>
                        </div>
                    </div>
                </div>

                <div class="no-reply text-center mt-5 pt-5" v-if="isReplied">
                    <img src="@/assets/images/vector/reply.svg" alt="No Reply" width="200">
                    <h5 class="font-title mt-2">Belum ada kendala yang dibalas oleh Admin</h5>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { firestore } from "@/firebase";
import { 
    getDocs, collection
} from "firebase/firestore";
export default {
  name: 'InboxKendala',
  components: { PageHeader, UserRoutes },
  data() {
      return {
          replyHeader: [],
          isReplied: false,
      }
  },
  created() {
      this.getKendala()
  },
  methods: {
      async getKendala() {
          this.isReplied = false
          const docRef = collection(firestore, 'user', 'kendala', this.$route.params.uid)
          const docSnap = await getDocs(docRef)
          if(!docSnap.empty) {
            docSnap.forEach(doc => {
                this.replyHeader.push({
                    nama_tugas: doc.data().namatugas,
                    date: doc.data().date,
                    id: doc.id,
                    desc: doc.data().desc
                })
            })
          } else {
            this.isReplied = true
          }
      },
      sendReplies(id, namaTugas) {
        this.$router.push({
            name: 'ReplyKendala',
            params: { 
                id,
                namaTugas
            }
        })
      }
  }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.inbox-header {
    position: relative;
    background: $dark;
    height: 80px;
    border-radius: 5px;
    h5 {
        color: $secondary-color;
    }
    p {
        color: $gray;
    }
    .bottom-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .btns {
            color: $gray;
            border: none;
            outline: none;
            background: transparent;
            &:hover {
                color: $white;
            }
        }
    }
}
</style>