<template>
  <div class="tugas-slider-wrapper w-100">
      <div class="tugas-user-box mt-3 mb-4" v-for="(user, i) in userInfo" :key="'user-'+i">
            <div class="tugas-user-header font-title p-3">
                <h4>{{ user.name }}</h4>
                <h6>{{ user.email }}</h6>
            </div>

            <div class="tugas-user-summary mt-4 p-3">
                <div class="total-tugas d-flex justify-content-between align-items-center font-desc-2">
                    <h5>Total Tugas</h5>
                    <h5 class="font-title">{{ user.totalTugas ? user.totalTugas : 0 }}</h5>
                </div>

                <div class="tasks task-finished">
                    <h6 class="font-desc-2">Selesai Dikerjakan</h6>
                    <h6 class="font-title">{{ user.totalSelesai ? user.totalSelesai : 0 }}</h6>
                </div>

                <div class="tasks task-onprogress">
                    <h6 class="font-desc-2">Sedang Dikerjakan</h6>
                    <h6 class="font-title">{{ user.totalOnProgress ? user.totalOnProgress : 0 }}</h6>
                </div>

                <div class="tasks task-unfinished">
                    <h6 class="font-desc-2">Belum Dikerjakan</h6>
                    <h6 class="font-title">{{ user.totalBelumSelesai ? user.totalBelumSelesai : 0 }}</h6>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import { firestore } from "@/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export default {
    name: 'TugasSlider',
    data() {
        return {
            userInfo: [],
            taskInfo: [],
        }
    },
    methods: {
        async getUserInfo() {
            await getDocs(collection(firestore, 'users'))
            .then(users => {
                users.forEach(user => {
                    this.userInfo.push(user.data());
                })
            })
        }
    },
    created() {
        this.getUserInfo()
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.tugas-user-box {
    width: 300px;
    height: 320px;
    background: $white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

    .tugas-user-header {
        background: $dark;
        color: $secondary-color;
        border-radius: 10px 10px 0 0;

        h6 {
            color: $white;
        }
    }

    .tugas-user-summary {
        .total-tugas {
            transform: translateY(-1.5rem);
        }
        .tasks {
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #888;
        }
    }
}

@media screen and (max-width: 768px) {
    .tugas-user-box {
        width: 100%;
    }
}
</style>