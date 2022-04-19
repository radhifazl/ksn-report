import { createStore } from 'vuex'
import router from '../router'
import { auth, firestore } from '../firebase'
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth'
import { Toast } from "@/plugins/Toast";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user;
    },
    CLEAR_USER (state) {
      state.user = null
    }
  },
  actions: {
    async googleLogin({commit}) {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

      try {
        await signInWithPopup(auth, provider)
      } catch(error) {
        switch(error.code) {
          case 'auth/account-exists-with-different-credential':
            Toast.fire({
              icon: 'error',
              title: 'Email already in use with different credential',
              timer: 3000,
              showCancelButton: false,
              timerProgressBar: true,
            })
            console.log('You have already signed up with a different auth provider for that email.');
            break
          case 'auth/cancelled-popup-request':
            Toast.fire({
              icon: 'error',
              title: 'The popup has been closed',
              timer: 3000,
              showCancelButton: false,
              timerProgressBar: true,
            })
            console.log('The popup has been closed.');
            break
          case 'auth/popup-blocked':
            Toast.fire({
              icon: 'error',
              title: 'The popup was blocked by the browser',
              timer: 3000,
              showCancelButton: false,
              timerProgressBar: true,
            })
            console.log('The popup was blocked by the browser.');
            break
          case 'auth/popup-closed-by-user':
            Toast.fire({
              icon: 'error',
              title: 'The popup window was closed',
              timer: 3000,
              showCancelButton: false,
              timerProgressBar: true,
            })
            this.dispatch('logout')
            console.log('The popup window was closed.');
            break
          default:
            console.log('An undefined error occurred.');
        }
      }
      commit('SET_USER', auth.currentUser)

      const adminEmail = "radhifazlinurfahriza@gmail.com";
      const adminUid = "aJBM7W9ML5TPSMYEU6gD9xOFbYt1";
      if(auth.currentUser.email == adminEmail && auth.currentUser.uid == adminUid) {
        router.push(`/admin/${auth.currentUser.uid}/dashboard`)
        
      } else {
        router.push(`/user/${auth.currentUser.uid}/dashboard`)
      }
    },
    async logout({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/')
    }
  },
})
