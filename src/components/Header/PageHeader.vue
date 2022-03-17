<template>
  <div class="page-header w-100 d-flex justify-content-between align-items-center">
      <div class="display-username d-flex align-items-center gap-3">
          <img :src="profile" alt="Profile" class="profile-head">
          <h1 class="font-title" id="username">{{ username }}</h1> 
          <span class="font-desc header-team" id="display-team">Development Team</span>
      </div>
      <div class="logout">
          <button class="logout-btn font-title" @click="logout">
              <i class='bx-fw bx bxs-log-out-circle'></i> Logout
          </button>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { auth } from '@/firebase'

export default {
  name: 'PageHeader',
  data() {
    return {
      username: "",
      profile: ""
    }
  },
  beforeMount() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      try {
        this.username = auth.currentUser.displayName
        this.profile = auth.currentUser.photoURL

        if(this.username == null) {
          this.username = auth.currentUser.email;
        }

        if(this.profile == null) {
          this.profile = "@/assets/images/noprofile.png"
        }
      } catch(error) {
        console.log(error.message)
      }
    }
  },
  setup() {
    const store = useStore()

    const logout = () => {
      store.dispatch('logout')
    }

    return {
      logout
    }
  }
}
</script>

<style lang="scss">
    @import '@/styles/base.scss';
    .page-header {
        background: $white;
        box-shadow: 3px 3px 4px rgba($color: #00000056, $alpha: 0.3);
        height: 4rem;
        padding: 1rem;

        .profile-head {
          width: 40px;
          border-radius: 50%;
        }

        #username {
            margin-top: 0.5rem;
            font-size: 1.1rem;
            color: rgb(95, 95, 95);
        }

        .header-team {
          font-weight: 600;
          color: #888;
          border-left: 3px solid #888;
          padding-left: 1rem;
        }
    }

    @media screen and (max-width: 768px) {
      .page-header {
        .display-username {
          span {
            display: none;
          }
        }
        .logout {
          button {
            width: 80px;
          }
        }
      }
    }

    
  .logout-btn {
    background: $primary-color;
    border: none;
    outline: none;
    width: 150px;
    padding: 0.3rem 0;
    height: 2.5rem;
    color: $white;
    border-radius: 5px;
    transition: 0.3s ease;

    &:hover {
      background: $lighter-primary-color;
    }
  }
</style>