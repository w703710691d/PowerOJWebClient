<template>
  <div>
    <h2>FAQ</h2>
    <a-button @click="GoToHref">跳转</a-button>
  </div>
</template>

<script>
export default {
  name:'faq',
  data(){
    return {

    }
  },
  methods: {
    GoToHref(){
      console.log('你好')
      this.$router.push({
         path:'/faq/add'
      })
    }
  }
}
</script>

<style>
</style>
