<template>
  <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Activity name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="Activity title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
  <el-form-item label="Activity form">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>

<script>
/** Nombre, titulo y descripcion **/
import { reactive } from 'vue'
export default {
  name: 'formNodoSimple',
  setup () {
    const form = reactive({
      name: '',
      title: '',
      desc: ''
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
