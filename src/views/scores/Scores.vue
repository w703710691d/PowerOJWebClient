<template>
  <a-card>
    <a-select
      name="scope"
      class="input-small"
      @change="handleChangeInSelected"
      :value="reserchObj.semester"
      :allowClear="true"
    >
      <a-select-option
        v-for="(item,index) in semesterData"
        :value="item.value"
        :key="item.value"
      >{{item.label}}</a-select-option>
    </a-select>
    <a-select
      name="scope"
      class="input-small"
      @change="handleChangeInSelected1"
      :allowClear="true"
      v-model="reserchObj.type"
    >
      <a-select-option value="name" selected>学号</a-select-option>
      <a-select-option value="realName" selected>姓名</a-select-option>
      <a-select-option value="classes">班级</a-select-option>
      <a-select-option value="teacher">教师</a-select-option>
    </a-select>
    <a-input
      placeholder="Search or Goto"
      style="width: 200px"
      class="input-medium search-query"
      v-model="text"
    />
    <a-button type="primary"  class="btn" @click="handleSearch">Search</a-button>
    <br />
    <br />
    <a-table
      :columns="columns"
      :row-key="record=>record.index"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1680 }"
      bordered
    ></a-table>
  </a-card>
</template>
<script>
import { getSemesterByYear } from '@/api/scores'
const columns = [
  {
    title: '姓名',
    dataIndex: 'realName', // 对应的是dataSource中的name 一一对应
    // scopedSlots: { customRender: 'name' }, // 与slot=“name”一一对应
    width: 80
    // fixed: 'left'
  },
  {
    title: '学号',
    dataIndex: 'name',
    width: 120
  },
  {
    title: '班级',
    dataIndex: 'classes',
    width: 120
  },
  {
    title: '教师',
    dataIndex: 'teacher',
    width: 80
  },
  {
    title: '实验一',
    dataIndex: 'ac1',
    width: 80
  },
  {
    title: '报告一',
    dataIndex: 'rep1',
    width: 80
  },
  {
    title: '实验二',
    dataIndex: 'ac2',
    width: 80
  },
  {
    title: '报告二',
    dataIndex: 'rep2',
    width: 80
  },
  {
    title: '实验三',
    dataIndex: 'ac3',
    width: 80
  },
  {
    title: '报告三',
    dataIndex: 'rep3',
    width: 80
  },
  {
    title: '实验四',
    dataIndex: 'ac4',
    width: 80
  },
  {
    title: '报告四',
    dataIndex: 'rep4',
    width: 80
  },
  {
    title: '实验五',
    dataIndex: 'ac5',
    width: 80
  },
  {
    title: '报告五',
    dataIndex: 'rep5',
    width: 80
  },
  {
    title: '实验六',
    dataIndex: 'ac6',
    width: 80
  },
  {
    title: '报告六',
    dataIndex: 'rep6',
    width: 80
  },
  {
    title: '实验七',
    dataIndex: 'ac7',
    width: 80
  },
  {
    title: '报告七',
    dataIndex: 'rep7',
    width: 80
  },
  {
    title: '实验八',
    dataIndex: 'ac8',
    width: 80
  },
  {
    title: '报告八',
    dataIndex: 'rep8'
    // fixed: 'right',
    // width: 500
  }
]

export default {
  name: 'scores',
  data() {
    let enumList = ['AUTUMN_TERM', 'SPRING_TERM']
    let newYear = new Date().getFullYear()
    let isSpring = new Date().getMonth() < 6
    let arr = []
    for (let i = newYear; i >= newYear - 10; i--) {
      if (isSpring && i === newYear) {
        arr.push({
          label: `${i}年春季`,
          value: i + '&' + enumList[1]
        })
      } else {
        arr.push({
          label: `${i}年秋季`,
          value: i + '&' + enumList[0]
        })
        arr.push({
          label: `${i}年春季`,
          value: i + '&' + enumList[1]
        })
      }
    }
    return {
      columns:columns,
      data: [],
      pagination: {
        // current: 1,
        // pageSize: 10,
        // total: 1
      },
      loading: false,
      reserchObj: {
        // page: 1,
        // limit: 10,
        year: newYear,
        semester: arr[0].value,
        type: undefined
      },
      text: undefined,
      selected: undefined,
      totalPage: 1,
      semesterData: arr
    }
  },
  created() {},
  mounted() {
    // this.fetch()
    this.getScoresList()
  },
  methods: {
    async getScoresList() {
      try {
        this.loading = true
        let sendData = {
          ...this.reserchObj,
          semester: this.reserchObj.semester.split('&')[1]
        }
        delete sendData.type
        if (this.reserchObj.type) {
          sendData[this.reserchObj.type] = this.text
        }
        console.log(sendData)
        let res = await getSemesterByYear(sendData)
        console.log(res)
        let pagination = {
          ...this.pagination,
          total:res.data.length
        }
        this.data = res.data.map((item, index) => ({
          ...item,
          xuhao: index
        }))
        this.pagination = pagination
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    handleTableChange(pagination) {
      this.reserchObj = {
        ...this.reserchObj,
        page: pagination.current,
        limit: pagination.pageSize
      }
      this.getScoresList()
    },
    handleChangeInSelected(value) {
      this.selected = value
      this.reserchObj = {
        ...this.reserchObj,
        semester: value,
        year: value.split('&')[0]
      }
      console.log(value)
      this.getScoresList()
    },
    handleChangeInSelected1(value) {
      this.selected = value
      this.reserchObj = {
        ...this.reserchObj,
        type: value
      }
      console.log(value)
    },
    handleSearch() {
      // let obj = {}
      // if (this.selected) obj[this.selected] = this.text
      // this.reserchObj = { ...obj }
      this.getScoresList()
    }
  }
}
</script>
<style lang="less" scoped>


input.search-query {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  padding-right: 14px;
  padding-left: 14px;
}

.input-small {
  display: inline-block;
  width: 150px;
  margin-left: -3px;
  vertical-align: middle;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
}

.btn {
  vertical-align: top;
  color: #fff;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}
</style>