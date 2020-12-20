<template>
  <a-card>
    <a-input
      placeholder="Problem ID"
      style="width: 200px"
      class="input-medium search-query1"
      v-model="ProblemID"
    />
    <a-input
      placeholder="User Name"
      style="width: 200px"
      class="input-medium search-query2"
      v-model="UserName"
    />
    <a-select name="scope" class="input-small" default-value="Language" @change="handleChangeInSelected1" :allowClear="true">
      <!-- <a-select-option value>All</a-select-option> -->
      <a-select-option value="Language" selected>Language</a-select-option>
      <a-select-option value="GCC11">GCC11</a-select-option>
      <a-select-option value="G++11">G++11</a-select-option>
      <a-select-option value="Pascal">Pascal</a-select-option>
      <a-select-option value="Java" selected>Java</a-select-option>
      <a-select-option value="Python2.7">Python2.7</a-select-option>
      <a-select-option value="GCC99">GCC99</a-select-option>
      <a-select-option value="G++98">G++98</a-select-option>
      <a-select-option value="G++14" selected>G++14</a-select-option>
      <a-select-option value="GCC17">G++17</a-select-option>
      <a-select-option value="G++11">G++11</a-select-option>
      <a-select-option value="Python3">Python3</a-select-option>
      <a-select-option value="Kotlin" selected>Kotlin</a-select-option>
      <a-select-option value="G++20">G++20</a-select-option>
      <a-select-option value="GCC18">GCC18</a-select-option>
    </a-select>
    <a-select name="scope" class="input-small" default-value="Result" @change="handleChangeInSelected2" :allowClear="true">
      <!-- <a-select-option value>All</a-select-option> -->
      <a-select-option value="Result" selected>Result</a-select-option>
      <a-select-option value="AC">AC</a-select-option>
      <a-select-option value="PE">PE</a-select-option>
      <a-select-option value="WA">WA</a-select-option>
           <a-select-option value="TLE" selected>TLE</a-select-option>
      <a-select-option value="MLE">MLE</a-select-option>
      <a-select-option value="OLE">OLE</a-select-option>
      <a-select-option value="CE">CE</a-select-option>
      <a-select-option value="RF" selected>RF</a-select-option>
      <a-select-option value="RE">RE</a-select-option>
      <a-select-option value="SE">SE</a-select-option>
      <a-select-option value="VE">VE</a-select-option>
      <a-select-option value="RUN" selected>RUN</a-select-option>
      <a-select-option value="WAIT">WAIT</a-select-option>
      <a-select-option value="REJUDGE">REJUDGE</a-select-option>
      <a-select-option value="SIM">SIM</a-select-option>
      <a-select-option value="COM" selected>COM</a-select-option>
      <a-select-option value="QUE">QUE</a-select-option>
      <a-select-option value="Not-AC">Not-AC</a-select-option>
    </a-select>
    <button type="submit" class="btn btn-info" @click="handleSearch">Search</button>
    <div class="pull-right">
      <span class="badge badge-info">{{pagination.current}}/{{totalPage}} Pages</span>
      <span class="badge badge-info">{{pagination.total}} Records</span>
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
        <div v-html="record.title"></div>
      </template>
      <template slot="ratio" slot-scope="text,record">
        <a-statistic :value="(record.accepted/record.submission) *100" :precision="2" suffix="%"></a-statistic>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { fetchStatusListData } from '@/api/status'

const columns = [
  {
    title: 'Run ID',
    dataIndex: 'pid',
    width: '10%',
    // sorter: (a, b) => a.pid - b.pid
  },
  {
    title: 'User',
    dataIndex: 'title1',
    width: '15%',
    // sorter: (a, b) => a.title.length - b.title.length,
    scopedSlots: { customRender: 'title1' }
  },
  {
    title: 'Problem',
    dataIndex: 'accepted',
    width: '10%',
    // sorter: (a, b) => a.accepted - b.accepted
  },
  {
    title: 'Result',
    dataIndex: 'submission',
    width: '15%',
    // sorter: (a, b) => a.submission - b.submission
  },
  {
    title: 'Time',
    dataIndex: 'ratio',
    width: '10%',
    scopedSlots: { customRender: 'ratio' },
    // sorter: (a, b) => a.ratio - b.ratio
  },
  {
    title: 'Memory',
    dataIndex: 'ctime',
    width: '10%',
    // sorter: (a, b) => new Date(a.ctime).getTime() - new Date(b.ctime).getTime()
  },
    {
    title: 'Language',
    dataIndex: 'ctime',
    width: '10%',
    // sorter: (a, b) => new Date(a.ctime).getTime() - new Date(b.ctime).getTime()
  },
    {
    title: 'Code Length',
    dataIndex: 'ctime',
    width: '10%',
    // sorter: (a, b) => new Date(a.ctime).getTime() - new Date(b.ctime).getTime()
  },
    {
    title: 'Submit Time',
    dataIndex: 'ctime',
    width: '10%',
    // sorter: (a, b) => new Date(a.ctime).getTime() - new Date(b.ctime).getTime()
  },

]
export default {
  name: 'Status',
  data() {
    return {
      columns,
      data: [],
      pagination: {
        position: 'bottom',
        current:1,
        pageSize:10,
        total:1
      },
      loading: false,
      reserchObj: {
        page: 1,
        limit: 10
        // pid:undefined,
        // source:undefined,
        // title:undefined
      },
      text: undefined,
      selected: undefined,
      totalPage: 1,
      UserName: undefined,
      ProblemID: undefined
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
          pageSize: this.reserchObj.limit
        }
        pagination.total = res.data.total
        this.totalPage=res.data.pages
        this.data = res.data.records.map(item => ({
          ...item,
          ratio: (item.accepted / item.submission).toFixed(2)
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
        limit: pagination.pageSize
      }
      this.getProblemList()
    },
    handleChangeInSelected(value) {
      this.selected = value
    },
    handleChangeInSelected(value) {
      this.selected = value
    },
    handleSearch() {
      let obj = { page: 1, limit: 10 }
      if (this.selected1) obj[this.selected1] = this.ProblemID
      if (this.selected2) obj[this.selected2] = this.ProblemID
      this.reserchObj = { ...obj }
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
input.search-query1 {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  padding-right: 14px;
  padding-left: 14px;
  border-radius: 14px 0 0 14px;
}
input.search-query2 {
  display: inline-block;
  margin-left: -1px;
  vertical-align: middle;
  padding-right: 14px;
  padding-left: 14px;
  // border: 1px solid #ccc;
}
.input-small {
  display: inline-block;
  width: 120px;
  margin-bottom: 0;
  vertical-align: middle;
  border-radius: 4px 0 0 4px;
  position: relative;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  // background-color: #fff;
  // border: 1px solid #ccc;
  margin-left: -1px;
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