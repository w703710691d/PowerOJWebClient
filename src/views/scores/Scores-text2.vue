<template>
  <a-card>
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>

      <a-form-model-item>
        <a-select v-model="selectValue" default-value="name" style="width: 120px" @change="handleChange">
          <a-select-option value="name"> Name </a-select-option>
          <a-select-option value="realName"> RealName </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item>
        <a-input v-model="inputValue" type="text" placeholder="请输入" />
      </a-form-model-item>

      <a-form-model-item>
        <a-button type="primary" html-type="submit" >Serach</a-button>
      </a-form-model-item>
    </a-form-model>

    <!-- 计算属性filter 要使用起来 -->
    <a-table bordered :data-source="filter" :columns="columns">
      <template slot="name" slot-scope="text">{{ text }}</template>
    </a-table>
  </a-card>
</template>

<script>

import moment from 'moment'

export default {
  data() {
    return {
      selectValue: 'name',
      inputValue: '',
      formInline: {},
      // 一般是后台给的数据
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          realName: 'ek1', // 要与后台的数据名以及selectValue的数据名对应 因为要用selectValue
        },
        {
          key: '1',
          name: 'Edward King 1',
          realName: 'ek2',
        },
        {
          key: '2',
          name: 'Edward King 2',
          realName: 'ek3',
        },
        {
          key: '3',
          name: 'Edward King 3',
          realName: 'ek4',
        },
      ],
      count: 2,
      // 一般是前端自定义的数据
      columns: [
        {
          title: 'name',
          dataIndex: 'name', // 对应的是dataSource中的name 一一对应
          width: '30%',
          scopedSlots: { customRender: 'name' }, // 与slot=“name”一一对应
        },
        {
          title: 'realname',
          dataIndex: 'realName',
        },
      ],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  computed: {
    filter: function() {
      // console.log(this.selectValue)
      // filter返回的是新数组
      // indexOf返回的是索引值
      // item.name等价于item[name] 用[]可以动态 不会写死
      return this.dataSource.filter(item=>{
          return item[this.selectValue].includes(this.inputValue)
          // 等价于
          // if(this.selectValue == 'name')
          // // includes包含 部分及整体都可以
          // return item.name.includes(this.inputValue)
          // else if(this.selectValue == 'realName') {
          //   return item.realName.includes(this.inputValue)
          // }
      })
    }
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    handleSubmit(e) {
      console.log(this.formInline);
  }
}
}
</script>

<style>
</style>