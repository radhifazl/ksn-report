<template>
    <div class="reply-container bg-col w-100">
        <div class="reply-wrapper">
            <PageHeader>
                <UserRoutes/>
            </PageHeader>

            <div class="reply-content p-4 padtop">
                <div class="reply-title">
                    <h3 class="font-title">Balasan Kendala</h3>
                    <span class="font-desc-2" style="color: #888">Temukan balasan dari kendala yang kamu kirim disini!</span>
                </div>

                <div class="reply-kendala mt-4 p-3" v-for="(reply, i) in replies" :key="i">
                    <div class="reply-box reply-name">
                        <h5 class="font-title">Nama Admin</h5>
                        <p class="font-desc-2">{{reply.namaAdmin}}</p>
                    </div>
                    
                    <div class="reply-box reply-email">
                        <h5 class="font-title">Email Admin</h5>
                        <p class="font-desc-2">{{reply.emailAdmin}}</p>
                    </div>
                    
                    <div class="reply-box reply-date">
                        <h5 class="font-title">Tanggal dibalas</h5>
                        <p class="font-desc-2">{{reply.date}}</p>
                    </div>
                    
                    <div class="reply-box reply-id">
                        <h5 class="font-title">ID Laporan</h5>
                        <p class="font-desc-2">{{reply.rep_id}}</p>
                    </div>
                    
                    <div class="reply-box reply-solusi">
                        <h5 class="font-title">Balasan / Solusi</h5>
                        <p class="font-desc-2">
                            {{reply.solusi}}
                        </p>
                    </div>
                    
                    <router-link :to="'/user/'+uid+'/inbox'">
                        Kembali
                    </router-link>
                </div>
                <div class="reply-kendala no-reply text-center mt-4 p-3" v-if="noReply">
                    <div class="nodata-vector mb-3">
                        <img src="../../../assets/images/vector/nodata.svg" alt="No Data" width="250">
                    </div>
                    <h5 class="font-title">
                        Tidak ada balasan untuk laporan ini
                    </h5>
                    <router-link :to="'/user/'+uid+'/inbox'">
                        Kembali
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { auth, firestore } from "@/firebase";
import { 
    getDocs, collection
} from "firebase/firestore";

export default {
    name: 'ReplyKendala',
    components: { PageHeader, UserRoutes },
    props: {
        namaTugas: {
            type: String,
        }
    },
    data() {
        return {
            replies: [],
            replyId: '',
            replyHeader: [],
            uid: auth.currentUser.uid,
            noReply: false,
        }
    },
    created() {
        this.getReplies()
    },
    methods: {
        async getReplies() {
            const replyRef = collection(firestore, 'user', 'kendala', this.$route.params.uid, this.$route.params.id, 'reply')
            const replySnap = await getDocs(replyRef)
            if (!replySnap.empty) {
                this.replies = []
                replySnap.forEach(doc => {
                    this.replies.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                    console.log(this.replies)
                })
            } else {
                this.replies = []
                this.noReply = true
                console.log('Belum ada balasan')
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.reply-wrapper {
    height: 100%;
    min-height: 100vh;
}
.reply-kendala {
    background: $white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>