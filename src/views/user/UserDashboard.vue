<template>
  <div class="user-dashboard ccontainer d-flex">
      <div class="user-dash-content cwrap">
          <PageHeader>
            <UserRoutes />
          </PageHeader>

          <div class="dashboard-content p-4">
            <div class="welcome-text mb-4">
              <h1 class="font-title">Halo, <span>{{username}}</span></h1>
              <h6 class="font-desc">Update selalu progress pengerjaan web kamu disini!</h6>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import UserRoutes from '@/components/SidebarRoutes/UserRoutes.vue'
import { auth } from '@/firebase'
// import { useStore } from 'vuex'

export default {
  name: 'UserDashboard',
  components: { PageHeader, UserRoutes },
  data() {
    return {
      username: "",
      projects: [
        {
          title: 'Java Vibes',
          desc: 'Invitation web bertemakan adat dari suku jawa',
        },
        {
          title: 'Beautiful Wood',
          desc: 'Invitation web bertemakan kayu indah',
        },
        {
          title: 'Dark Grey',
          desc: 'Invitation web dengan tema palette abu gelap',
        },
        {
          title: 'Pink Flowers',
          desc: 'Invitation web bertemakan bunga yang indah berwarna merah muda',
        },
        {
          title: 'Dark Gold',
          desc: 'Invitation web bertemakan warna gelap dan juga emas',
        },
      ]
    }
  },
  mounted() {
    this.getUserInfo(auth.currentUser)
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
    height: 100vh;
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