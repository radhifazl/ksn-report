<template>
    <div class="account-info-container w-100 mt-3">
      <div class="account-info-box">
        <div class="account-header"></div>
        <div class="account-info p-3 padtop" v-for="acc in accountInfo" :key="acc.uid">
          <div class="account-img text-center">
            <img :src="acc.photoURL" alt="Avatar">
          </div>

          <div class="account-name">
            <h6 class="font-title">Nama</h6>
            <span class="font-desc-2">{{ acc.name }}</span>
          </div>

          <div class="account-email">
            <h6 class="font-title">Email</h6>
            <span class="font-desc-2">{{ acc.email }}</span>
          </div>

          <div class="account-id">
            <h6 class="font-title">ID User</h6>
            <span class="font-desc-2">{{ acc.uid }}</span>
          </div>
        </div>
      </div>
      <div class="account-info-vector d-lg-flex d-none">
          <img src="@/assets/images/vector/info.svg">
      </div>
    </div>
</template>

<script>
import { auth, firestore } from "@/firebase";
import { getDoc, doc } from '@firebase/firestore'


export default {
    name: 'AccountInfo',
    data() {
        return {
            accountInfo: []
        }
    },
    methods: {
        async getUserInfo() {
            this.accountInfo = []
            await getDoc(doc(firestore, 'users', auth.currentUser.uid))
            .then(doc => {
                this.accountInfo.push(doc.data())
                console.log(this.accountInfo)
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

.account-info-box {
    width: 100%;
    height: 100%;
    background: $dark;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;

    .account-header {
        height: 120px;
    }

    .account-info {
        background: $white;
        border-radius: 30px;
        position: relative;

        .account-img {
            height: 120px;
            width: 120px;
            margin-top: 1rem;
            border-radius: 50%;
            overflow: hidden;
            background: $white;
            position: absolute;
            top: -22%;
            left: 50%;
            transform: translateX(-50%);

            img {
                width: 100%;
                height: 100%;
            }
        }

        .account-name, .account-email, .account-id {
            border-bottom: 1px solid $dark;
            margin-bottom: 1rem;
        }
    }

    .account-info-vector {
        display: none;
    }
}

@media screen and (min-width: 768px) {
    .account-info-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .account-info-box {
        width: 45%;
        height: 100%;
        border-radius: 15px;

        .account-info {
            border-radius: 15px;
        }
    }
    .account-info-vector {
        width: 55%;
        height: 300px;
        position: relative;

        img {
            width: 1000px;
            height: 600px;
            position: absolute;
            bottom: -23%;
            left: -40%;
        }
    }
}
</style>