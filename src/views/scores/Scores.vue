<template>
  <a-card>
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="Id">
        <a-input v-model="formInline.id" placeholder="请输入id"></a-input>
      </a-form-model-item>
      <a-form-model-item label="Date">
        <a-range-picker
          @change="dateChange"
        >
          <!-- <template slot="dateRender" slot-scope="current">
            <div class="ant-calendar-date" :style="getCurrentStyle(current)">{{ current.date() }}</div>
          </template> -->
        </a-range-picker>
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
import { getScoreByTime ,getScoreById } from '@/api/scores'
import moment from 'moment';

export default {
  data() {
    return {
      formInline: {
        id: '',
        endTime: null,
        startTime:null,
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
          title: 'age',
          dataIndex: 'age',
        },
        {
          title: 'address',
          dataIndex: 'address',
        },
      ],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  create(){
    getScoreByTime({endTime:null,startTime:null})
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  },
  methods: {
    handleSubmit(e) {
      console.log(this.formInline)
    },
    dateChange(date,dateString){
      this.formInline.startTime = dateString[0]+' 00:00:00'
      this.formInline.endTime = dateString[1]+' 00:00:00'
    },
    getCurrentStyle(current, today) {
      const style = {};
      if (current.date() === 1) {
        style.border = '1px solid #1890ff';
        style.borderRadius = '50%';
      }
      return style;
    }
  }
}
</script>

<style>
</style>