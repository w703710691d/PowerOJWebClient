<template>
  <a-card>
    <a-input
      placeholder="Search or Goto"
      style="width: 200px"
      class="input-medium search-query"
      v-model="text"
    />
    <select name="scope" class="input-small">
      <option value>All</option>
      <option value="title" selected>Title</option>
      <option value="source">Source</option>
      <option value="tag">Tag</option>
      <option value="content">Content</option>
    </select>
    <button type="submit" class="btn btn-info">Search</button>
    <div class="pull-right">
      <span class="badge badge-info">30/32 Pages</span>
      <span class="badge badge-info">1576 Problems</span>
    </div>
    <br />
    <br />
    <a-table
      :columns="columns"
      :row-key="record => record.pid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
       <template slot="title1" slot-scope="text, record">
        <div v-html="record.title">
        </div>
      </template> 
      <template slot="ratio" slot-scope="text,record">
        <a-statistic :value="(record.accepted/record.submission) *100" :precision="2" suffix="%"></a-statistic>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import reqwest from 'reqwest'
import { fetchProblemListData } from '@/api/problem'

const columns = [
  {
    title: 'ID',
    dataIndex: 'pid',
    width: '10%',
    sorter: (a, b) => a.pid - b.pid,
  },
  {
    title: 'Title',
    dataIndex: 'title1',
    width: '40%',
    sorter: (a, b) => a.title.length-b.title.length,
    scopedSlots: { customRender: 'title1' }
  },
  {
    title: 'AC',
    dataIndex: 'accepted',
    width: '10%',
    sorter: (a, b) => a.accepted - b.accepted,
  },
  {
    title: 'Submit',
    dataIndex: 'submission',
    width: '10%',
    sorter: (a, b) => a.submission - b.submission,
  },
  {
    title: 'Ratio',
    dataIndex: 'ratio',
    width: '10%',
    scopedSlots: { customRender: 'ratio' },
    sorter: (a, b) => a.ratio - b.ratio,
  },
  {
    title: 'Date',
    dataIndex: 'ctime',
    width: '20%',
    sorter: (a, b) => (new Date(a.ctime)).getTime() -  (new Date(b.ctime)).getTime(),
  }
]
export default {
  name: 'problem',
  data() {
    return {
      columns,
      data: [],
      pagination: {
        position: 'bottom'
      },
      loading: false,
      reserchObj: {
        page: 1,
        limit: 10,
        pid: 2000,
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
        let res = await fetchProblemListData({ ...this.reserchObj })
        console.log(res)
        let pagination = { ...this.pagination }
        pagination.total = res.data.total
        this.data = res.data.queryList.map(item=>({
          ...item,
          ratio: (item.accepted/item.submission).toFixed(2)
        }))
        this.pagination = pagination

        // let pid = '123'
        // let title = 'biaoti1'
        // let source =  undefined
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
    handleTableChange(pagination) {
      this.reserchObj = {
        ...this.reserchObj,
        page: pagination.current,
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
  margin-bottom: 0;
  vertical-align: middle;
  border-radius: 4px 0 0 4px;
  position: relative;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  border: 1px solid #ccc;
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