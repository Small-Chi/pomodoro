import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    sound: 'alarm.mp3',
    items: [],
    timeleft: time,
    current: '',
    finished: [],
    break: false
  },
  mutations: {
    selectSound (state, data) {
      state.sound = data
    },
    additem (state, data) {
      state.items.push({
        name: data,
        model: data
      })
    },
    start (state) {
      if (state.break) {
        state.current = 'rest'
        state.timeleft = timebreak
      } else {
        state.current = state.items.shift().name
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (!state.break) {
        state.finished.push(state.current)
      }
      state.current = ''
      if (state.items.length > 0) {
        state.break = !state.break
      }
      state.timeleft = state.break ? timebreak : time
    },
    reset (state) {
      state.timeleft = time
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({ key: 'pomodoro' })
  ]
})
