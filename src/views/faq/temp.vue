<template>
  <div>
    <a-button @click="GoToHref">返回</a-button>
  </div>
</template>

<script>
export default {
  methods:{
    GoToHref(){
      console.log('你好')
      this.$router.push({
        path:'/faq'
      })
    }
  }
}
</script>

<style>

</style>