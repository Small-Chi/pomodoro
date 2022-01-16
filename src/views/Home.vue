<template lang="pug">
#home
  b-form-group.CenterInput(label="" label-for="newinput" invalid-feedback="字數太少")
    b-form-input#newinput(v-model="newinput" :state="newinputstate" @keydown.enter="additem" style='height: 87px; border: 2px solid #f44438')
  b-btn.plusBtn(variant="#F44438" @click="additem")
    b-icon.plus(icon="plus" font-scale="7.5")
  .square(:class="{ blueBgColor: this.current == 'rest' }")
  h1 {{ timeMinute }}
  h5 {{ timeSecond }}
  b-progress(:value="value" height="43px" class="mb-2" :style="progress" variant="info" max="1500")
  router-link(to="/list")
    b-btn.List
      b-icon.list(icon="list" font-scale="7.5")
  input.start(:class="{ blueTColor: this.current == 'rest' }" type="button" value="Start" v-if="status !== 1" @click="start")
  input.Reset(:class="{ blueTColor: this.current == 'rest' }" type="button" value="Reset" v-else @click="reset")
  h2.W(:class="{ breakColor: this.current == 'rest' }") Work
  h2.B-2(:class="{ breakColor: this.current != 'rest' }") Break
  ul.all
    li(v-for="item in items") {{ item.name }}
      .red-dot
  p ......Only show the first four tasks …...
</template>

<script>
export default {
  data () {
    return {
      newinput: '',
      // 0 = 停止
      // 1 = 倒數中
      // 2 = 暫停
      status: 0,
      timer: 0,
      value: 0,
      progress: {
        backgroundColor: '#f44438',
        position: 'absolute',
        bottom: '-8px',
        width: 'width 1920px'
      }
    }
  },
  computed: {
    newinputstate () {
      return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    },
    items () {
      return this.$store.state.items
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeMinute () {
      const m = Math.floor(this.timeleft / 60).toString().padStart(2, '0')
      return `${m}`
    },
    timeSecond () {
      const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `.${s}`
    },
    current () {
      return this.$store.state.current
    }
  },
  methods: {
    start () {
      if (this.status === 0 && this.items.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          this.value++
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    // pause () {
    //   this.status = 2
    //   clearInterval(this.timer)
    // },
    reset () {
      if (this.status === 1) {
        this.$store.commit('reset')
        this.value = 0
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')

      if (!skip) {
        const audio = new Audio()
        audio.src = require('@/assets/' + this.$store.state.sound)
        audio.play()
      }

      if (this.items.length > 0) {
        this.start()
        this.value = 0
      }
    },
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    }
  }
}
</script>
