<template>
  <a-card>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <div>
      <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="handleSubmit"
        >
          <a-form-item label="Name">
            <!-- name是传给后台数据的变量名 -->
            <a-input
              v-decorator="['name', { rules: [{ required: true, message: 'Please input your name!' }] }]"
            />
          </a-form-item>
          <a-form-item label="Age">
            <!-- name是传给后台数据的变量名 -->
            <a-input
              v-decorator="['age', { rules: [{ required: true, message: 'Please input your age!' }] }]"
            />
          </a-form-item>
          <a-form-item label="Address">
            <!-- name是传给后台数据的变量名 -->
            <a-input
              v-decorator="['address', { rules: [{ required: true, message: 'Please input your address!' }] }]"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    
    <a-table bordered :data-source="dataSource" :columns="columns">
      <!-- text表示dataSource中name对应的数据 -->
      <!-- record表示dataSource中每一个个对象 -->
      <!-- slot-scope表示需要table中绑定的dataSource的数据 -->
      <template slot="name" slot-scope="text">
        {{ text }}
        <!-- 一旦在页面产生事件(@input) 浏览器就会自动生成event对象
        this.message = event.target.value; // event对象的target和value -->
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>

      <template slot="operation1" slot-scope="text, record">
        <!-- <a-popconfirm>是operation插槽想要显示的样式 -->
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a-button @click="onDelete">Delete</a-button>
        </a-popconfirm>
      </template>
    
    </a-table>
  </a-card>
</template>

<script>
export default {
  // components: {
  //   EditableCell
  // },
  data() {
    return {
      // 一般是后台给的数据
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
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
          title: 'age',
          dataIndex: 'age',
        },
        {
          title: 'address',
          dataIndex: 'address',
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation1' },
        },
      ],
      visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  methods: {


    
    handleAdd() {
      this.visible = true
      // ...表示展开此数组
      // 此行代码表示将展开的数组与新数组合并 并赋值给dataSource
      // this.dataSource = [...dataSource, newData]
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      // filter过滤 即过滤掉不满足条件的数据
      // =>箭头函数 一个参数item return一行代码 item.key !== key
      // item也表示dataSource中一个一个对象
      this.dataSource = dataSource.filter((item) => item.key !== key)
    },
    handleOk() {
      this.visible = false
    },
    handleSubmit(e) {
      e.preventDefault() // $event 浏览器不要执行与事件关联的默认动作
         判断表单是否有效
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onCellChange (key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find((item) => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
  }
}
</script>

<style>
</style>
