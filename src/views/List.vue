<template lang="pug">
#list
  b-form-group.CenterInput(label="" label-for="newinput" invalid-feedback="字數太少")
    b-form-input#newinput(v-model="newinput" :state="newinputstate" @keydown.enter="additem" style='height: 87px;')
  b-btn.plusBtn(variant="#F44438" @click="additem")
    b-icon.plus(icon="plus" font-scale="7.5")
  router-link(to="/")
    b-btn.Back
      b-icon.back(icon="x" font-scale="10")
  h2.A All Tasks
    ul.all
      li(v-for="item in items")
        label
          input(type="checkbox")
          .circle
            .dot
          span.text {{ item.name }}
        br
      li(v-for="item in finished")
        label
          input(type="checkbox")
          .circle
            .dot(style="display: block")
          span.text(style="text-decoration: line-through;") {{ item }}
  div.line
  h2.H Had done
    ul.Had
      li(v-for="(item, idx) in finished")
        span.text {{ item }}
</template>

<script>
export default {
  data () {
    return {
      newinput: ''
    }
  },
  computed: {
    newinputstate () {
      return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    },
    items () {
      return this.$store.state.items
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    }
  }
}
</script>
