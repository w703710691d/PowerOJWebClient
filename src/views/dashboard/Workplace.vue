<template>
<div>
  <a-input-search placeholder="Search or Goto" style="width: 200px" enter-button @search="onSearch" />
  <div class="pull-right">
    <span class="badge badge-info">30/32 Pages</span>
    <span class="badge badge-info">1576 Problems</span>
  </div>
    <br /><br />

  <a-table
    :columns="columns"
    :row-key="record => record.login.uuid"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
  </a-table>
</div>
  
</template>
<script>
import reqwest from 'reqwest'
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    sorter: true,
    width: '5%',
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
  },
]

export default {
  data () {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        data: {
          results: 10,
          ...params
        },
        type: 'json'
      }).then(data => {
        const pagination = { ...this.pagination }
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200
        this.loading = false
        this.data = data.results
        this.pagination = pagination
      })
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
    background-color: #3a87ad;
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
    text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 9px;
}
</style>