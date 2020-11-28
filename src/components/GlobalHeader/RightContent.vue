<template>
  <div :class="wrpCls">
    <!-- <select-lang :class="prefixCls" /> -->
    <login-component v-if="roles.includes('guest')"></login-component>
    <avatar-dropdown v-else :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import LoginComponent from '@/views/user/index'
import store from '@/store'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang,
    LoginComponent
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {},
      roles: store.state.user.roles
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: store.state.user.name
      }
    }, 1500)
  }
}
</script>
