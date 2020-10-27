<template>
  <div>
    <a-icon slot="prefix" type="user" />
    <a-button @click="toggleStatus('login')" type="primary" style="margin-right:10px">登录</a-button>
    <a-icon slot="prefix" type="star" />
    <a-button @click="toggleStatus('register')" style="margin-right:20px">注册</a-button>
    <a-modal
      :title="status === 'login' ? '登录' : '注册'"
      :visible="visible"
      :footer="null"
      @cancel="closeModal"
    >
      <login @closeModel="closeModal" v-if="status === 'login'"></login>
      <register v-else></register>
    </a-modal>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register'

export default {
  name: 'LoginCompoment',
  components: {
    Login,
    Register
  },
  data () {
    return {
      visible: false,
      status: 'login'
    }
  },
  methods: {
    toggleStatus(status){
      this.status = status
      this.visible = true
    },
    closeModal(){
      this.visible = false
    }
  }
}
</script>

<style>

</style>