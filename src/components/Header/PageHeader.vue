<template>
  <div class="page-header w-100 d-flex justify-content-between align-items-center">
      <div class="display-username d-flex align-items-center gap-3">
          <img :src="profile" alt="Profile" class="profile-head">
          <h1 class="font-title" id="username">{{ username }}</h1> 
          <span class="font-desc header-team" id="display-team">Development Team</span>
      </div>
      <div class="sidebar pt-2" :class="{active: isActive}">
        <div class="sidebar-contents">
          <ul class="nav-items">
            <li class="nav-list mb-5 pb-4">
              <div class="sidebar-logo d-flex align-items-center gap-3">
                <img src="@/assets/logo.png" alt="KSN" width="50">
                <span class="sidebar-logo-name font-title">Ksn <span>Report</span></span>
              </div>
            </li>
            <slot/>  
            <li class="nav-list logout" @click="logout">
                <i class='bx-fw bx bxs-log-out'></i> Logout
            </li>
          </ul>
          <div class="nav-footer">
            <span class="font-desc-2">
              Dibuat oleh Radhif Azli Nurfahriza <br> SMKN 4 Bogor
            </span>
          </div>
        </div>
      </div>
      <div class="sidebar-menu" @click="openMenu()" :class="{active: isActive}">
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
      </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
import { useStore } from 'vuex'

export default {
  name: 'PageHeader',
  data() {
    return {
      user: auth.currentUser,
      username: "",
      profile: "",
      isActive: false
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.username = this.user.displayName
      this.profile = this.user.photoURL
    },
    openMenu() {
      if(!this.isActive) {
        this.isActive = true
      } else {
        this.isActive = false
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
        position: relative;

        .profile-head {
          width: 40px;
          border-radius: 50%;
        }

        #username {
          margin-top: 0.5rem;
          font-size: 1.1rem;
          color: rgb(95, 95, 95);
          font-weight: 500;
        }

        .header-team {
          font-weight: 500;
          color: #888;
          border-left: 3px solid #888;
          padding-left: 1rem;
        }

        .sidebar {
          position: absolute;
          top: 0;
          left: -100%;
          width: 85%;
          height: 100vh;
          background: $dark;
          box-shadow: 13px 10px 15px 5px rgba(105, 103, 103, 0.25);
          z-index: 100;
          transition: all 0.35s ease;

          .sidebar-contents {
            width: 100%;
            height: 100%;
            position: relative;
            
            .nav-footer {
              padding-left: 1rem;
              position: absolute;
              bottom: 1%;
              left: 1%;
              color: #888;
            }
          }

          .nav-items {
            padding-left: 1rem;
            .nav-list {
              margin-bottom: 2.5rem;
              a {
                color: $white;
                font-family: $second-font;
                font-weight: 500;
                font-size: 1.1rem;
                &.router-link-exact-active {
                  color: $secondary-color;
                  font-weight: 600;
                  letter-spacing: 1px;
                }
                &:hover {
                  color: $secondary-color;
                }

                i {
                  color: $secondary-color;
                }
              }
              .sidebar-logo {
                .sidebar-logo-name {
                  color: $secondary-color;
                  font-size: 2rem;
                  font-style: italic;
                  font-weight: 600;
                  text-transform: uppercase;
                  span {
                    color: $white;
                  }
                }
              }
            }
            .nav-list.logout {
              color: $white;
              font-family: $second-font;
              font-weight: 500;
              font-size: 1.1rem;
              cursor: pointer;
              i {
                color: $secondary-color;
              }
                &:hover {
                  color: $secondary-color;
                }
            }
          }
        }

        .sidebar.active {
          left: 0;
          opacity: 1;
          visibility: visible;
        }

        .sidebar-menu {
          width: 25px;
          height: 25px;
          cursor: pointer;
          transition: all 0.35s ease;

          .menu-bar {
            width: 100%;
            height: 14%;
            display: block;
            background: #888;
            margin-bottom: 0.3rem;
            transition: all 0.35s ease;
          }
        }

        .sidebar-menu.active {
          .menu-bar:nth-child(1) {
              width: 60%;
              transform: translateX(12px);
          }
          .menu-bar:nth-child(3) {
              width: 60%;
          }
        }
        @media screen and (min-width: 862px) {
          .sidebar {
            width: 25%;
          }
        }
    }

    @media screen and (max-width: 768px) {
      .page-header {
        .display-username {
          span {
            display: none;
          }
        }
      }
    }
</style>