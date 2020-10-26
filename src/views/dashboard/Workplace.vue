<template>
<div>
  <a-input-search placeholder="input search text" style="width: 200px" enter-button @search="onSearch" />
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
    width: '15%',
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
    width: '15%',
    sorter: (a, b) => a.report.length - b.report.length
  },
  {
    title: 'AC',
    dataIndex: 'AC',
    width: '15%'
  },
  {
    title: 'Submit',
    dataIndex: 'Submit',
    width: '15%'
  },
  {
    title: 'Ratio',
    dataIndex: 'Ratio',
    width: '15%'
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    width: '15%'
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
