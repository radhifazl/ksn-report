<template>
  <div class="w-100">
    <nav class="container-fluid navbar fixed-top navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/">
              <div class="nav-logo d-flex align-items-center gap-3">
                <img src="@/assets/logo.png" alt="Logo" width="50" class="logo"> 
                <a href="" class="navbar-brand">
                  <span>KSN</span> REPORT
                </a>
              </div>
            </router-link>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'HomeHeader'
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.navbar {
  height: 5rem;
  background: $dark;
  /* background: $sidebar-bg; */
  .container-fluid {
    a {
      text-decoration: none;
    }
    .nav-logo {
      a {
        font-family: $first-font;
        font-size: 1.5rem;
        font-style: italic;
        font-weight: 700;
        span {
          color: $secondary-color;
        }
      }
    }
  }
}
</style>