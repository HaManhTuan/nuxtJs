<template>
<div>
  <div class="title">
    <slot name="title"></slot>
  </div>
  <div class="content">
    <slot name="content"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      footer: ''
    }
  },
   created() {
    this.$eventBus.$on('sendToFooter', (data) => {
      this.getData(data)
    })
   },
  methods: {
    getData(data) {
      this.footer = data
    }
  }
  }
</script>

<style scoped>

</style>
