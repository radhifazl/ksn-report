<template>
  <div class="user-dashboard ccontainer d-flex">
      <div class="user-dash-content cwrap">
          <PageHeader>
            <UserRoutes />
          </PageHeader>

          <div class="dashboard-content p-4 padtop">
            <div class="welcome-text mb-4">
              <h1 class="font-title">Halo, <span>{{username}}</span></h1>
              <h6 class="font-desc">Update selalu progress pengerjaan web kamu disini!</h6>
            </div>

            <div class="profile-wrapper">
              <h3 class="font-title">Account Info</h3>

              <AccountInfo/>
            </div>
          </div>
       </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { auth, firestore } from '@/firebase'
import { 
  doc, setDoc, getDocs, collection, query, where
} from "firebase/firestore";
import { onAuthStateChanged } from '@firebase/auth';
import AccountInfo from '@/components/Account/AccountInfo.vue';
// import { useStore } from 'vuex'

export default {
  name: 'UserDashboard',
  components: { PageHeader, UserRoutes, AccountInfo },
  data() {
    return {
      username: "",
      tugas: [],
      tugasSelesai: [],
      tugasBelumSelesai: [],
      tugasOnProgress: [],
      totalTugas: 0,
      totalSelesai: 0,
      totalOnProgress: 0,
      totalBelumSelesai: 0,
    }
  },
  created() {
    this.getUserInfo(auth.currentUser)

    onAuthStateChanged(auth, async user => {
      if(user) {
        const tugasRef = collection(firestore, 'user', 'tugas', user.uid)
        const tugasSnap = await getDocs(tugasRef)
        tugasSnap.forEach(doc => {
          this.tugas.push({
            id: doc.id,
            ...doc.data()
          })
        })

        this.totalTugas = this.tugas.length

        //FINISHED TASK QUERY
        const finishedQy = query(tugasRef, where('status', '==', 'Selesai Dikerjakan'))
        const finishedQuerySnap = await getDocs(finishedQy)
        finishedQuerySnap.forEach(doc => {
          this.tugasSelesai.push({
            id: doc.id,
            ...doc.data()
          })
        })

        this.totalSelesai = this.tugasSelesai.length

        //ON PROGRESS TASK QUERY
        const progressQy = query(tugasRef, where('status', '==', 'Sedang Dikerjakan'))
        const progressQuerySnap = await getDocs(progressQy)
        progressQuerySnap.forEach(doc => {
          this.tugasOnProgress.push({
            id: doc.id,
            ...doc.data()
          })
        })

        this.totalOnProgress = this.tugasOnProgress.length

        // UNFINISHED TASK QUERY
        const unfinishedQy = query(tugasRef, where('status', '==', 'Belum Dikerjakan'))
        const unfinishedQuerySnap = await getDocs(unfinishedQy)
        unfinishedQuerySnap.forEach(doc => {
          this.tugasBelumSelesai.push({
            id: doc.id,
            ...doc.data()
          })
        })

        this.totalBelumSelesai = this.tugasBelumSelesai.length


        // IF THE UID IS NOT ADMIN
        if(user.uid !== "aJBM7W9ML5TPSMYEU6gD9xOFbYt1") {
          setDoc(doc(firestore, 'users', user.uid), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            totalTugas: this.totalTugas,
            totalSelesai: this.totalSelesai,
            totalOnProgress: this.totalOnProgress,
            totalBelumSelesai: this.totalBelumSelesai,
          })
        }
      } else {
        console.log('Logged out')
      }
    })
  },
  methods: {
    async getUserInfo(user) {
      try {
        this.username = await user.displayName

        if(this.username == null) {
          this.username = user.email;
        }
      } catch(error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/base.scss';

  .user-dashboard {
    height: 100%;
    max-height: 100vh;
  }

  .dashboard-content {
    .welcome-text {
      h1 span {
        color: $secondary-color;
      }
    }
  }

  .dashboard-progress {
    width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.425) 0px 0px 0px, rgba(0, 0, 0, 0.425) 0px 6px 6px;
    margin: 2rem;
  }

  @media screen and (max-width: 768px) {
    .userprofile-dashboard {
      flex-direction: column;
      justify-content: center;
      .user-img {
        margin-bottom: 2rem;
      }
    }
  }
</style>