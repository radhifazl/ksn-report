<template>
  <div class="home w-100">
      <HomeHeader />
      <div class="home-content pt-5 px-2 text-center">
          <div class="welcome-img my-5 my-lg-3">
              <img src="@/assets/images/vector/welcome.svg" alt="Welcome" class="welcome-vector">
          </div>
          <div class="welcome-text font-title mb-3">
              <h4>SIGN IN</h4>
          </div>  

          <div class="login">
              <button class="login-btn font-title" @click="googleLogin">
                  <i class="bx-fw bx bxl-google"></i> Google Sign In
              </button>
          </div>
      </div>
      <div class="wave-vector">
        <img src="@/assets/images/vector/wave.svg" alt="Wave" class="wave">
      </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/Header/HomeHeader.vue'
import { useStore } from 'vuex'
export default {
  components: { HomeHeader },
    name: 'HomeView',
    setup() {
        const store = useStore()

        const googleLogin = () => {
            store.dispatch('googleLogin')
        }

        return {
            googleLogin
        }
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.home {
    height: 100vh;
    position: relative;
    .home-content {
        background: rgb(238, 238, 238);
        height: 100%;
        .welcome-img {
            padding-top: 3rem;
            img {
                width: 50%;
            }
        }

        @media screen and (max-width: 768px) {
            .welcome-img {
                img {
                    width: 100%;
                }
            }
        }

        .login {
            .login-btn {
                border: none;
                border-radius: 40px;
                outline: none;
                background: $dark;
                color: $white;
                font-weight: 500;
                padding: 0.8rem 0;
                width: 200px;
                transition: 0.35s ease;
                animation: wide 0.35s ease;

                &:hover {
                    background: #322f42;
                    width: 220px;
                }
            }
            @keyframes wide {
                from {
                    opacity: 0;
                    transform: translateY(-1rem);
                } to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @media screen and (max-width: 768px) {
                .login-btn {
                    width: 90%;
                }
            }
        }
    }

    .wave-vector {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .wave {
            width: 100%;
        }
    }

    @media screen and (min-width: 768px) {
        .wave-vector {
            display: none;
        }
    }
}


</style>