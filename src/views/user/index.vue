<template>
  <div>
    <a-icon slot="prefix" type="user" />
    <a-button @click="toggleStatus('login')" type="primary" style="margin-right:10px">登录</a-button>
    <a-icon slot="prefix" type="star" />
    <a-button @click="toggleStatus('register')" style="margin-right:20px">注册</a-button>
    <a-modal
      :title="modalTitle"
      :visible="visible"
      :footer="null"
      @cancel="closeModal"
    >
      <login v-if="status === 'login'" @closeModel="closeModal" @changeTitle="handleTitleChange" ref="login"></login>
      <register v-if="status === 'register'"></register>
    </a-modal><!--共同的model-->
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
      status: 'login',
      title: '登录'
    }
  },
  computed: {
    modalTitle() {
      return this.status === 'login' ? this.title === '登录' ? '登录' : '忘记密码' : '注册'
    }
  },
  methods: {
    toggleStatus (status) {
      this.status = status
      this.visible = true
    },
    closeModal () {
      this.visible = false
      this.title = '登录'
      this.$refs.login.reset()
    },
    handleTitleChange(data){
      this.title = data
    }
  }
}
</script>

<style>

</style>