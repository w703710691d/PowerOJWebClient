<template>
  <a-card>
    <div class="pull-right">
      <span class="badge badge-info">{{ pagination.current }}/{{ totalPage }} Pages</span>
      <span class="badge badge-info">{{ pagination.total }} Problems</span>
    </div>
    <br />
    <br />
    <a-table
      :columns="columns"
      :row-key="(record) => record.pid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="title1" slot-scope="text, record">
        <div v-html="record.title"></div>
      </template>
      <template slot="ratio" slot-scope="text, record">
        <a-statistic :value="(record.accepted / record.submission) * 100" :precision="2" suffix="%"></a-statistic>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { fetchProblemListData } from '@/api/problem'

const columns = [
  {
    title: '序号',
    dataIndex: 'pid',
    width: '10%',
    sorter: (a, b) => a.pid - b.pid,
  },
  {
    title: '赛事',
    dataIndex: 'title',
    width: '40%',
    sorter: (a, b) => a.title.length - b.title.length,
    scopedSlots: { customRender: 'title1' },
  },
  {
    title: 'ACMER',
    dataIndex: 'accepted',
    width: '10%',
    sorter: (a, b) => a.accepted - b.accepted,
  },
  {
    title: '发布时间',
    dataIndex: 'submission',
    width: '10%',
    sorter: (a, b) => a.submission - b.submission,
  },

  {
    title: '比赛时间',
    dataIndex: 'ctime',
    width: '20%',
    sorter: (a, b) => new Date(a.ctime).getTime() - new Date(b.ctime).getTime(),
  },
]

const genData = (n) => {
  const data = []
  for (let i = 0; i < n; i++) {
    data.push({
      pid: i + 1,
      title: `第${i+1}届信息工程学院计算机程序设计大赛`,
      accepted: '超级管理员',
      submission: Date.now(),
      ctime: Date.now()
    })
  }
  return data
}

export default {
  name: 'problem',
  data() {
    return {
      columns,
      data: genData(20 ),
      pagination: {
        position: 'bottom',
        current: 1,
        pageSize: 10,
        total: 1,
      },
      loading: false,
      reserchObj: {
        page: 1,
        limit: 10,
        // pid:undefined,
        // source:undefined,
        // title:undefined
      },
      text: undefined,
      selected: undefined,
      totalPage: 1,
    }
  },
  mounted() {
    // this.fetch()
    this.getProblemList()
  },
  methods: {
    async getProblemList() {
      try {
        this.loading = true
        let res = await fetchProblemListData({ ...this.reserchObj })
        console.log(res)
        let pagination = {
          ...this.pagination,
          current: this.reserchObj.page,
          pageSize: this.reserchObj.limit,
        }
        pagination.total = res.data.total
        this.totalPage = res.data.pages
        this.data = res.data.records.map((item) => ({
          ...item,
          ratio: (item.accepted / item.submission).toFixed(2),
        }))
        this.pagination = pagination
        this.loading = false

        // let pid = undefined
        // let title = undefined
        // let source =  undefined
        // this.reserchObj = {
        //   ...this.reserchObj,
        //   pid: this.text,
        //   title: this.text,
        //   source: this.text
        // }
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    handleTableChange(pagination) {
      this.reserchObj = {
        ...this.reserchObj,
        page: pagination.current,
        limit: pagination.pageSize,
      }
      this.getProblemList()
    },
    handleChangeInSelected(value) {
      this.selected = value
    },
    handleSearch() {
      let obj = { page: 1, limit: 10 }
      if (this.selected) obj[this.selected] = this.text
      this.reserchObj = { ...obj }
      this.getProblemList()
    },
  },
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
input.search-query {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  padding-right: 14px;
  padding-left: 14px;
  border-radius: 14px 0 0 14px;
}
.input-small {
  display: inline-block;
  width: 90px;
  margin-left: -3px;
  vertical-align: middle;
  border-radius: 4px 0 0 4px;
  // position: relative;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  // background-color: #fff;
  // border: 1px solid #ccc;
}
select {
  display: inline-block;
  margin-bottom: 0;
  width: 220px;
  vertical-align: middle;
  border-radius: 4px 0 0 4px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.btn-info {
  vertical-align: top;
  border-radius: 0 14px 14px 0;
  color: #fff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #49afcd;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  margin-left: -1px;
  background-image: linear-gradient(to bottom, #52c41a, #52c41a);
  background-repeat: repeat-x;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}
</style>