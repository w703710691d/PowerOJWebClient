<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form">
      <!-- <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      > -->
      <!-- <div class="user-login-other">
          <a >
            <router-link  class="register" :to="{ name: 'register' }">注册账户</router-link>
          </a>
      </div>-->
      <!-- <a-tab-pane key="tab1" tab="账号密码登录"> -->
      <!-- <router-link class="register" :to="{ name: 'register' }">注册账户</router-link> -->

      <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px" :message="errMessage" />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账户: "
          v-decorator="['username', {
            rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }],
            validateTrigger: 'change'}]"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="密码: "
          v-decorator="['password', {
            rules: [{ required: true, message: '请输入密码' }],
            validateTrigger: 'blur'}]"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input-password>
      </a-form-item>
      <!-- </a-tab-pane> -->
      <!-- </a-tabs> -->

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha', {
                rules: [{ required: true, message: '请输入验证码' }],
                validateTrigger: 'blur' }]"
            >
              <a-icon slot="prefix" type="mail" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <img :src="imgSrc" alt="验证码" @click="getCaptchaImg" />
        </a-col>
      </a-row>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
        <router-link :to="{name: 'forget'}" class="forge-password" style="float: right">忘记密码</router-link>
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          @click="handleSubmit"
        >确定
        </a-button>
      </a-form-item>

      <!-- <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
      </div>-->
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { get2step, getCaptcha } from '@/api/login'
import store from '@/store'
import router from '@/router'
import Forget from './Forget'

export default {
  components: {
    TwoStepCaptcha
  },
  name: 'Login',
  data () {
    return {
      imgSrc: undefined,
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      verKey: undefined,
      errMessage: undefined,
      isForget: false
    }
  },
  created () {
    get2step({})
      .then((res) => {
        this.requiredTwoStepCaptcha = res.result.stepCode
      })
      .catch(() => {
        this.requiredTwoStepCaptcha = false
      })
    // this.requiredTwoStepCaptcha = true
  },
  mounted () {
    this.getCaptchaImg()
  },
  methods: {
    ...mapActions(['loginAction', 'logoutAction']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        loginAction
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)

          const sendData = {
            name: values.username,
            password: values.password,
            code: values.captcha,
            verKey: this.verKey
          }
          loginAction(sendData)
            .then((res) => {
              this.loginSuccess(res)
              this.$emit('closeModel')
            })
            .catch((err) => {
              console.log(err)
              this.isLoginError = true
              this.errMessage = err.message
              // this.requestFailed(err)
            })
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    async getCaptchaImg () {
      try {
        const res = await getCaptcha()
        console.log(res)
        this.imgSrc = res.data.base64
        this.verKey = res.data.verKey
      } catch (error) {
        console.log(error)
      }
    },

    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.logoutAction().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      console.log(res)
      store.dispatch('getUserRolesAndPermissionsAction').then((res) => {
        const roles = res.listRole.map(item => item.name)
        store
          .dispatch('GenerateRoutes', {
            roles
          })
          .then(() => {
            window.location.reload()
            router.addRoutes(store.getters.addRouters)
            this.$notification.success({
              message: '欢迎',
              description: `${timeFix()}，欢迎回来`
            })
            this.isLoginError = false
          })
      })
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || err || '请求出现错误，请稍后再试',
        duration: 4
      })
      //  this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .register {
    display: block;
    float: right;
    position: relative;
    z-index: 1;
  }
}
</style>
