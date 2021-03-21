<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Activity title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="Activity title">
      <el-input v-model="form.short"></el-input>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input type="textarea" v-model="form.example"></el-input>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input type="textarea" v-model="form.output"></el-input>
    </el-form-item>
    <el-form-item label="Activity title">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'formNodoClose',
  setup () {
    const form = reactive({
      name: '',
      title: '',
      short: '',
      description: '',
      example: '',
      output: '',
      link: ''
    })
    const onSubmit = () => { return {} }
    return {
      form, onSubmit
    }
  }
}
</script>

<style scoped lang="scss">

</style>
