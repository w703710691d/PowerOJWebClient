<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="Title">
      <a-input v-model="form.name" placeholder="此标题必须填写" />
    </a-form-model-item>
    <a-form-model-item label="Start Time">
      <a-date-picker @change="onChange" />
    </a-form-model-item>
    <a-form-model-item label="End Time">
      <a-date-picker @change="onChange" />
    </a-form-model-item>
    <a-form-model-item label="content">
      <a-textarea placeholder="Basic usage" :rows="4" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> Submit </a-button>
      <a-button style="margin-left: 10px"> Reset </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  name: 'Addnotice',
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!', this.form)
    },
    onChange () {
      console.log('测试')
    }
  }
}
</script>
