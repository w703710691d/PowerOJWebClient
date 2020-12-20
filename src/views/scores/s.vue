<template>
  <a-card>
    <a-form-model layout="inline"  @submit="handleSubmit" @submit.native.prevent>
      <!-- <a-form-model-item label="Id">
        <a-input v-model="formInline.id" placeholder="请输入id"></a-input>
      </a-form-model-item> -->
          <a-form-model-item   >
       <a-range-picker @change="dateChange" :model="formInline"/>
       </a-form-model-item>
      <a-form-model-item>
        <!-- :disabled="formInline.id === '' || formInline.date === ''" -->
        <a-button type="primary" html-type="submit">Serach</a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <!-- text表示dataSource中name对应的数据 -->
      <!-- record表示dataSource中每一个个对象 -->
      <!-- slot-scope表示需要table中绑定的dataSource的数据 -->
      <template slot="name" slot-scope="text">{{ text }}</template>
    </a-table>
  </a-card>
</template>

<script>
import { getScoreByTime, getScoreById } from '@/api/scores'
import moment from 'moment'

export default {
  data() {
    return {
      selectValue: 'name',
      inputValue: null,
      termValue:null,
      formInline: {
        id: '',
        endTime: null,
        startTime: null,
      },
      // 一般是后台给的数据
      dataSource: [],
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

        {
          title: 'AC1',
          dataIndex: 'ac1',
        },
        {
          title: 'Rep1',
          dataIndex: 'rep1',
        },
        {
          title: 'AC2',
          dataIndex: 'ac2',
        },
        {
          title: 'Rep2',
          dataIndex: 'rep2',
        },
        {
          title: 'AC3',
          dataIndex: 'ac3',
        },
        {
          title: 'Rep3',
          dataIndex: 'rep3',
        },
        {
          title: 'AC4',
          dataIndex: 'ac4',
        },
        {
          title: 'Rep4',
          dataIndex: 'rep4',
        },
        {
          title: 'AC5',
          dataIndex: 'ac5',
        },
        {
          title: 'Rep5',
          dataIndex: 'rep5',
        },
        {
          title: 'AC6',
          dataIndex: 'ac6',
        },
        {
          title: 'Rep6',
          dataIndex: 'rep6',
        },
        {
          title: 'AC7',
          dataIndex: 'ac7',
        },
        {
          title: 'Rep7',
          dataIndex: 'rep7',
        },
        {
          title: 'AC8',
          dataIndex: 'ac8',
        },
        {
          title: 'Rep8',
          dataIndex: 'rep8',
        },

        {
          title: 'class',
          dataIndex: 'classes',
        },
        {
          title: 'teacher',
          dataIndex: 'teacher',
        },
      ],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    onChange(value) {
       console.log(`selected ${value}`)
    },
    handleSubmit(e) {
      const data = {
        endTime: this.formInline.endTime,
        startTime: this.formInline.startTime,
      }
      // console.log(data)
      // 这是传给后台的参数
      getScoreByTime(data)
        .then((res) => {
          // 这是后台返回的数据
          console.log(res)
          this.dataSource = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 这是日期选择器自己会返回的两种数据类型
    dateChange(date, dateString) {
      this.formInline.startTime = dateString[0] + ' 00:00:00'
      this.formInline.endTime = dateString[1] + ' 24:00:00'
    },
    getCurrentStyle(current, today) {
      const style = {}
      if (current.date() === 1) {
        style.border = '1px solid #1890ff'
        style.borderRadius = '50%'
      }
      return style
    },
  },
}
</script>

<style>
</style>