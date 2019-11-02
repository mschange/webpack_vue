<template>
  <div>
    <button @click="orderTest">按钮</button>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "test",
    methods: {
      orderTest() {
        this.$emit("test")
      }
    }
  }
</script>

<style scoped>

</style>
