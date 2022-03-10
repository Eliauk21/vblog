import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '', //用户名
    password: ''  //密码
  },
  mutations: {
    setusername(state, payload) {
      state.username = payload
    },
    setpassword(state, payload) {
      state.password = payload
    },
    removeusername(state) {
      state.username = ''
    },
    removepassword(state) {
      state.password = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
