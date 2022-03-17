<template>
  <div class="sidebar-wrapper" :class="{active: isActive}">
    <div class="sidebar">
        <div class="sidebar-header px-3 pt-4 mb-5 d-flex align-items-center">
            <div class="sidebar-logo d-flex align-items-center justify-content-start gap-1" :class="{active: isActive}">
                <img src="@/assets/logo.png" alt="Logo"> <h1><span>KSN</span> Report</h1>
            </div>
        </div>

        <div class="sidebar-content" :class="{active: isActive}">
            <ul class="sidebar-list">
                <slot/>
            </ul>
        </div>

            <div class="sidebar-menu">
                <div class="sidebar-hamburger" :class="{active: isActive}" @click="openMenu">
                    <span class="menu-bar mb-1"></span>
                    <span class="menu-bar mb-1"></span>
                    <span class="menu-bar mb-1"></span>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AppSidebar',
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        openMenu() {
            if(!this.isActive) {
                this.isActive = true
            } else {
                this.isActive = false
            }
        }
    }
}
</script>

<style lang="scss">
    @import "@/styles/base.scss";
    .sidebar-wrapper.active {
        width: 25%;
    }

    .sidebar-wrapper {
        width: 7%;
        transition: all 0.35s ease;
        .sidebar {
            background: $dark;
            width: 100%;
            height: 100vh;
            transition: all 0.35s ease;

            .sidebar-header {
                transform: translateY(-1rem);
                transition: all 0.35s ease;
                height: 80px;
                .sidebar-logo.active {
                    img {
                        opacity: 1;
                    }

                    h1 {
                        opacity: 1;
                        padding-left: 1rem;
                    }
                }
                .sidebar-logo {
                    img {
                        opacity: 0;
                        width: 40px;
                        transition: all 0.35s ease;
                        transform: translateX(0.5rem);
                    }

                    @media screen and (min-width: 992px) {
                        img {
                            width: 45px;
                        }
                    }

                    h1 {
                        font-size: 1.5rem;
                        color: $white;
                        font-style: italic;
                        font-weight: bold;
                        opacity: 0;
                        transition: all 0.35s ease;

                        span {
                            color: $secondary-color;
                        }
                    }
                }
            }
            

            .sidebar-content.active {
                opacity: 1;
                visibility: visible;
            }

            .sidebar-content {
                opacity: 0;
                visibility: hidden;
                transition: 0.35s ease;
                margin-left: -0.5rem;
                .sidebar-list {
                    list-style: none;
                    a {
                    color: rgb(235, 235, 235);
                    transition: 0.3s ease;
                    font-weight: 600;

                    &:hover {
                        color: $secondary-color;
                    }

                    &.router-link-exact-active {
                        color: $secondary-color;
                    }

                    .navlist-item {
                        margin-bottom: 3rem;

                        i {
                        color: $secondary-color;
                        font-size: 1.5rem;
                        }
                    }
                    }
                }

                .nav-logout {
                    background: transparent; 
                    border: none; 
                    outline: none;
                    color: rgb(235, 235, 235);
                    font-weight: 600;
                    transition: 0.3s ease;

                    &:hover {
                    color: $secondary-color;
                    }

                    i {
                    color: $secondary-color;
                    font-size: 1.5rem;
                    }
                }
            }

            .sidebar-menu {
                width: 28px;
                height: 25px;
                position: absolute;
                bottom: 2%;
                left: 0;
                transition: all 0.35s ease;
                .sidebar-hamburger {
                    width: 100%; height: 100%;
                    cursor: pointer;
                    .menu-bar {
                        width: 100%; height: 13%;
                        background-color: $white;
                        display: block;
                        transition: all 0.35s ease;
                    }
                }

                .sidebar-hamburger.active {
                    .menu-bar:nth-child(1) {
                        width: 60%;
                        transform: translateX(12px);
                    }

                    .menu-bar:nth-child(3) {
                        width: 60%;
                    }
                }
            }
        }    
    }

    @media screen and (min-width: 768px) {
        .sidebar-menu {
            margin-left: 1.1rem;
        }
    }

    @media screen and (max-width: 768px) {
        .sidebar-wrapper.active {
            width: 100%;

            .sidebar {
                height: 100vh;
                background: $primary-color;
            }

            .sidebar-logo img {
                transform: translateY(0);
            }

            .sidebar-menu {
                top: 95%;
            }
        }
        .sidebar-wrapper {
            width: 15%;
            position: fixed;
            bottom: 0;
            left: 0;
            border: none;
            z-index: 1000;

            .sidebar {
                height: 7vh;
                background: #1c162750;
                &:hover {
                    background: $primary-color;
                }
            }

            .sidebar-logo img {
                transform: translateY(-10rem);
            }

            .sidebar-menu {
                width: 20px;
                height: 17px;
                top: 55%;
                left: 50%;
                transform: translate(48%, -50%);
            }
        }
    }
</style>