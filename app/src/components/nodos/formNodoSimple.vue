<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="formulario">
  <el-form-item label="Nombre">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="Titulo" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
  <el-form-item label="Descripcion" prop="description">
    <el-input type="textarea" v-model="form.description"></el-input>
  </el-form-item>
  <el-form-item>
   <slot name="footer" />
  </el-form-item>
</el-form>
</template>

<script>

import UUIDGenerate from '@/assets/js/UUIDGenerate'
import { reactive, ref } from 'vue'
export default {
  name: 'formNodoSimple',
  setup () {
    const formulario = ref(null)
    const form = reactive({
      id: UUIDGenerate(),
      name: '',
      title: '',
      description: ''
    })
    const rules = {
      title: [
        {
          required: true,
          message: 'Se necesita el titulo',
          trigger: 'blur'
        },
        {
          min: 3,
          message: 'El titulo debe tener mas de 3 caracteres',
          trigger: 'blur'
        }
      ],
      description: [
        {
          required: true,
          message: 'La descripcion es necesaria',
          trigger: 'blur'
        },
        {
          min: 5,
          message: 'La descripcion debe tener mas de 5 caracteres',
          trigger: 'blur'
        }
      ]
    }
    return {
      form, rules, formulario
    }
  }
}
</script>

<style scoped lang="scss">

</style>
