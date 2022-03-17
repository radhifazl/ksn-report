import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  // createUserWithEmailAndPassword, 
  // signInWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth'

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
        console.log(error.message)
      }
      commit('SET_USER', auth.currentUser)
      router.push('/user/dashboard')
    },
    async logout({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/')
    }
  },
})
