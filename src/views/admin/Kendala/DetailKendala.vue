<template>
  <div class="detail-kendala-container bg-col padtop">
      <div class="detail-wrapper" v-for="(report, i) in reports" :key="i">      
        <Title/>
        <DetailWrapper>
            <DetailHeader>
                <h3 class="font-title">{{report.namatugas}}</h3>
                <span class="date font-desc-2">{{report.date}}</span>
            </DetailHeader>
            <DetailContent v-if="hideReply">
                <div class="detail-box detail-nama">
                    <div class="detail-title">
                        <h5 class="font-title">Nama</h5>
                    </div>
                    <div class="detail-info">
                        <p class="font-desc-2">
                            {{report.name}}
                        </p>
                    </div>
                </div>
                
                <div class="detail-box detail-team">
                    <div class="detail-title">
                        <h5 class="font-title">Team</h5>
                    </div>
                    <div class="detail-info">
                        <p class="font-desc-2">
                            {{report.team}}
                        </p>
                    </div>
                </div>
                
                <div class="detail-box detail-email">
                    <div class="detail-title">
                        <h5 class="font-title">Email</h5>
                    </div>
                    <div class="detail-info">
                        <p class="font-desc-2">
                            {{report.email}}
                        </p>
                    </div>
                </div>
                
                <div class="detail-box detail-tugas">
                    <div class="detail-title">
                        <h5 class="font-title">Nama Tugas</h5>
                    </div>
                    <div class="detail-info">
                        <p class="font-desc-2">
                            {{report.namatugas}}
                        </p>
                    </div>
                </div>
                
                <div class="detail-box detail-kendala">
                    <div class="detail-title">
                        <h5 class="font-title">Kendala</h5>
                    </div>
                    <div class="detail-info">
                        <p class="font-desc-2">
                            {{report.desc}}
                        </p>
                    </div>
                </div>
            </DetailContent>
            <DetailContent v-if="reply">
                <form @submit.prevent="replyReport(report.rep_id)">
                    <div class="detail-box detail-nama">
                        <div class="detail-title">
                            <h5 class="font-title">Nama Admin</h5>
                        </div>
                        <div class="detail-info">
                            <input type="text" class="form-control" v-model="replyForm.namaAdmin">
                        </div>
                    </div>

                    <div class="detail-box detail-email">
                        <div class="detail-title">
                            <h5 class="font-title">Email Admin</h5>
                        </div>
                        <div class="detail-info">
                            <input type="text" class="form-control" v-model="replyForm.emailAdmin">
                        </div>
                    </div>
                    
                    <div class="detail-box detail-kendala">
                        <div class="detail-title">
                            <h5 class="font-title">Kendala Murid</h5>
                        </div>
                        <div class="detail-info">
                            <p class="font-desc-2">
                                {{report.desc}}
                            </p>
                        </div>
                    </div>
                    
                    <div class="detail-box detail-balasan">
                        <div class="detail-title">
                            <h5 class="font-title">Balasan / Solusi</h5>
                        </div>
                        <div class="detail-info">
                            <textarea type="text" class="form-control" placeholder="Balasan / Solusi" v-model="replyForm.solusi" @keyup="checkVal"></textarea>
                        </div>
                    </div>

                    <button class="btn btn-primary btn-submitreply" type="submit">
                        Kirim Balasan
                    </button>
                    <button class="btn btn-secondary btn-cancel mx-3" @click="reply = false, hideReply = true">
                        Batalkan
                    </button>
                </form>
            </DetailContent>
            <p class="font-desc-2" v-if="noKendala">Tidak ada kendala</p>
        </DetailWrapper>
        <div class="action-wrapper d-flex justify-content-evenly align-items-center">
            <DeleteButton @click="deleteReport(report.rep_id)"/>
            <span v-if="isReplied" class="font-desc-2" style="color: #888;">Laporan sudah dibalas</span>
            <ReplyButton @click="openReplyForm" v-else/>
        </div>
      </div>
    <div class="go-back p-4">
        <router-link to="/admin/aJBM7W9ML5TPSMYEU6gD9xOFbYt1/listkendala">
            Kembali
        </router-link>
    </div>
  </div>
</template>

<script>
import { firestore, auth } from '@/firebase'
import {  
    getDoc, doc, deleteDoc, addDoc, collection, getDocs
} from "firebase/firestore"
import Title from '@/components/DetailKendala/Title.vue'
import DetailWrapper from '@/components/DetailKendala/DetailWrapper.vue'
import DetailHeader from '@/components/DetailKendala/DetailHeader.vue'
import DetailContent from '@/components/DetailKendala/DetailContent.vue'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'
import ReplyButton from '@/components/Buttons/ReplyButton.vue'
import { Toast } from "@/plugins/Toast"
import Swal from 'sweetalert2'
import { getDate } from "@/plugins/Date"

export default {
    components: { Title, DetailWrapper, DetailHeader, DetailContent, DeleteButton, ReplyButton },
    name: 'DetailKendala',
    props: {
        uid: {
            type: String,
        },
    },
    data() {
        return {
            reports: [],
            reply: false,
            hideReply: true,
            isReplied: false,
            noKendala: false,
            replyForm: {   
                namaAdmin: auth.currentUser.displayName,
                emailAdmin: auth.currentUser.email,
                solusi: '',
            },
            adminUid: 'aJBM7W9ML5TPSMYEU6gD9xOFbYt1'
        }
    },
    created() {
        this.getKendalaDetail()
    },
    methods: {
        async getKendalaDetail() {
            const doc_uid = this.$route.params.uid
            const doc_id = this.$route.params.id
            const docRef = doc(firestore, 'user', 'kendala', doc_uid, doc_id)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists) {
                this.reports.push({
                    rep_id: docSnap.id,
                    ...docSnap.data()
                })
            } else {
                this.noKendala = true
            }

            const repliedDocRef = collection(firestore, 'user', 'kendala', doc_uid, doc_id, 'reply')
            const repliedDoc = await getDocs(repliedDocRef)
            repliedDoc.forEach(doc => {
                if(doc.data().reply === true) {
                    this.isReplied = true
                }
            })
        },
        async deleteReport(id) {
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
                    deleteDoc(doc(firestore, 'user', 'kendala', this.$route.params.uid, id))
                    .then(() => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Berhasil menghapus laporan'
                        })
                        this.$router.push('/admin/aJBM7W9ML5TPSMYEU6gD9xOFbYt1/listkendala')
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        async replyReport(id) {
            if(!this.replyForm.solusi || !this.replyForm.namaAdmin || !this.replyForm.emailAdmin) {
                Toast.fire({
                    icon: 'error',
                    title: 'Lengkapi form terlebih dahulu'
                })
            } else {
                await addDoc(collection(firestore, 'user', 'kendala', this.$route.params.uid, id, 'reply'), {
                    ...this.replyForm,
                    rep_id: id,
                    reply: true,
                    tanggal: getDate(new Date),
                }).then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Berhasil menanggapi laporan'
                    })
                    this.reply = false
                    this.hideReply = true
                    this.isReplied = true
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        openReplyForm() {
            this.reply = true
            this.hideReply = false
        },
        checkVal() {
            if(this.replyForm.solusi.length < 1) {
                document.querySelector('.btn-submitreply').setAttribute('disabled', 'disabled')
                document.querySelector('.btn-submitreply').classList.add('btn-secondary')
            } else {
                document.querySelector('.btn-submitreply').removeAttribute('disabled')
                document.querySelector('.btn-submitreply').classList.remove('btn-secondary')
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';
.detail-kendala-container {
    padding-bottom: 7rem;
    position: relative;
}
.detail-box {
    margin-bottom: 1rem;
    height: fit-content;
    .detail-title {
        margin-bottom: 0.5rem;
        h5 {
            width: 50%;
            position: relative;
            &::after {
                content: ':';
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        @media screen and (min-width: 992px) {
            h5 {
                width: 30%;
            }
        }
    }
    .detail-info {
        p {
            border-bottom: 1px solid $gray;
            padding-bottom: 0.5rem;
        }
    }
}

.detail-box.detail-kendala {
    height: fit-content;
    border-bottom: 1px solid $gray;
    border-radius: 0px;
    .detail-info {
        height: 100px;
        overflow-y: auto;
        p {
            border-bottom: transparent;
            padding-bottom: 0.5rem;
        }
    }
}

.action-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: $dark;
    border-top: 1px solid $gray;
    border-radius: 17px 17px 0 0;
    padding: 1rem 0;
}
</style>