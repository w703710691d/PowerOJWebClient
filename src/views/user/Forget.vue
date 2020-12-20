<template>
  <div class="main user-layout-register">
    <a-form ref="formRegister" :form="form" id="formRegister" layout="vertical" :hideRequiredMark="true">
      <a-form-item label="用户名">
        <a-input
          size="large"
          type="text"
          placeholder="本校学生使用学号注册"
          v-decorator="['User.name', {rules: [{ required: true, message: '此字段必须填写' }], validateTrigger: ['change', 'blur']}]"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
     
      <a-form-item label="电子邮箱">
        <a-input
          size="large"
          type="text"
          placeholder="邮箱"
          v-decorator="['User.email', {rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}]"
        >
          <a-icon slot="prefix" type="mail" />
        </a-input>
      </a-form-item>
     
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item label="验证码">
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="mail" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="4">
           <div>
             <img :src="imgSrc" alt="验证码" @click="getCaptchaImg" :style="{marginTop:24 +'px'}" />
           </div>
        </a-col>
        
      </a-row>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
        >发送</a-button>
        <!-- <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link> -->
      </a-form-item>
      </a-form>
  </div>
</template>

<script>
import { getSmsCaptcha, getCaptcha } from '@/api/login'
import { deviceMixin } from '@/store/device-mixin'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'Register',
  components: {},
  mixins: [deviceMixin],
  data() {
    return {
      form: this.$form.createForm(this),
      imgSrc: undefined,
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    }
  },
  mounted() {
    this.getCaptchaImg()
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password')
      console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }      
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePhoneCheck(rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)

      callback()
    },

    handlePasswordInputClick() {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit() {
      const {
        form: { validateFields },
        state,
        $router
      } = this
      validateFields({ force: true }, async (err, values) => {
        if (!err) {
          console.log(values)
          try {
            let res = await register({...values})
            // if (res.status === '401'){
            //   alert('错误')
            //   return
            // }

            state.passwordLevelChecked = false
            $router.push({ name: 'login', params: { ...values } })
          } catch (error) {
             state.passwordLevelChecked = false
            $router.push({ name: 'login', params: { ...values } })
          }
        }
      })
    },


    async getCaptchaImg() {
      try {
        let res = await getCaptcha()
        console.log(res)
        this.imgSrc = res.data.base64
      } catch (error) {
        console.log(error)
      }
    },

    getCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        $message,
        $notification
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = $message.loading('验证码发送中..', 0)

          getSmsCaptcha({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              $notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  },
  watch: {
    'state.passwordLevel'(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 100%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
  .sp {
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
}
</style>
