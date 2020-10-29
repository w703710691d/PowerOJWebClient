<template>
  <div>
    <a-input-search
      placeholder="Search or Goto"
      style="width: 200px"
      enter-button
      
      v-model="text"
    />
    <div class="pull-right">
      <span class="badge badge-info">30/32 Pages</span>
      <span class="badge badge-info">1576 Problems</span>
    </div>
    <br />
    <br />
    <a-table
      :columns="columns"
      :row-key="record => record.login.uuid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    ></a-table>
  </div>
</template>
<script>
import { fetchProblemListData } from '@/api/problem'
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    sorter: true,
    width: '5%'
  },
  {
    title: 'Title',
    dataIndex: 'Title',
    /*
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    */
    width: '20%',
    sorter: (a, b) => a.report.length - b.report.length
  },
  {
    title: 'AC',
    dataIndex: 'AC',
    width: '5%'
  },
  {
    title: 'Submit',
    dataIndex: 'Submit',
    width: '5%'
  },
  {
    title: 'Ratio',
    dataIndex: 'Ratio',
    width: '5%'
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    width: '20%'
  }
]

export default {
  name:'problem',
  data() {
    return {
      data: [],
      pagination: {
        position: 'bottom'
      },
      loading: false,
      columns:[],
      reserchObj:{
        page: 1,
        limit: 10,
        pid:2000,
        source: undefined
      },
      text: undefined
    }
  },
  mounted() {
    // this.fetch()
    this.getProblemList()
  },
  methods: {
    async getProblemList() {
      try {
          let res = await fetchProblemListData({...this.reserchObj})
           console.log(res)

          // let pid = '123'
          // let title = 'biaoti1'
          // let source = pid || undefined
          // this.reserchObj = {
          //   ...this.reserchObj,
          //   pid,
          //   title,
          //   source: this.text
          // }

      } catch (error) {
        console.log(error)
      }
    },
    handleTableChange(pagination){
      this.reserchObj = {
        ...this.reserchObj,
        page: pagination.currentPage,
        limit: pagination.pageSize
      }
      this.getProblemList()
    }
  }
}
</script>
<style lang="less" scoped>
.pull-right {
  margin-right: 0%;
  float: right;
}
.badge-info {
  background-color: #52c41a;
}
.badge {
  margin-left: 4px;
  padding-right: 9px;
  padding-left: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}
.badge {
  display: inline-block;
  padding: 2px 4px;
  font-size: 11.844px;
  font-weight: bold;
  line-height: 14px;
  color: #fff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 9px;
}
</style>