<template>
  <div class="list-of-users p-4">
      <div class="list-title mb-3 d-flex align-items-center gap-2">
          <i class='bx-fw bx bx-search'></i>
          <h2 class="font-title">
              Cari User
          </h2>
          <span class="font-desc-2" style="font-style: italic; color: #888;">
              {{ foundUser }}
          </span>
      </div>
      <div class="form">
          <form id="user-search" class="form-group" @submit.prevent="findUser">
              <input type="text" 
                id="search" 
                name="search" 
                class="form-control" 
                autocomplete="off" 
                placeholder="Cari dan pilih user"
                v-model="query" @keyup="findUser">
          </form>
      </div>
      <ul class="users" v-if="result">
          <li v-for="(user, i) in filtUser" :key="'user-'+i" class="user">
              <button class="userlist-btn font-desc-2" @click="getUser(user.uid)">
                  {{user.name}}
              </button>
          </li>
      </ul>
  </div>
</template>

<script>
import { collection, getDocs } from '@firebase/firestore'
import { auth, firestore } from "@/firebase";
export default {
    name: 'UserList',
    data() {
        return {
            users: [],
            filtUser: [],
            query: '',
            result: false,
        }
    },
    computed: {
        foundUser() {
            return this.query.length > 0 ? `User ditemukan (${this.filtUser.length})` : ''
        }
    },
    created() {
        this.usersList()
        console.log(this.users)
    },
    methods: {
        async usersList() {
            const docSnap = await getDocs(collection(firestore, 'users'))
            docSnap.forEach(doc => {
                this.users.push({
                    name: doc.data().name,
                    uid: doc.data().uid,
                })
            })
        },
        findUser() {
            if(this.query.length > 0) {
                this.result = true
                this.filtUser = this.users.filter(user => {
                    return user.name.toLowerCase().includes(this.query.toLowerCase())
                })
            } else {
                this.result = false
            }
        },
        getUser(id) {
            this.$emit('getUser', {
                id: id
            })
        }
    }
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.list-of-users {
    width: 100%;

    .users {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;

        li {
            width: fit-content;
            animation: list 0.5s ease-in-out;
            .userlist-btn {
                width: 100%;
                height: 40px;
                cursor: pointer;
                border: none;
                border-radius: 8px;
                box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
                font-weight: 500;
                text-overflow: ellipsis;
                background: $white;
                padding: 0.5rem 1rem;
                color: $dark;

                &:hover {
                    background: $hoverdark;
                    color: $white;
                }
            }
        }
        @keyframes list {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
}
</style>