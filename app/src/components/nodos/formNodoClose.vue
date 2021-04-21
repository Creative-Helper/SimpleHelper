<template>
  <el-form :rules="rules" :model="form" label-width="180px" ref="formulario">
    <el-form-item label="Nombre">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Titulo" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="Referencia" prop="reference">
      <el-input v-model="form.reference"></el-input>
    </el-form-item>
    <el-form-item label="Descripcion" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="Ejemplo" prop="example">
      <el-input type="textarea" v-model="form.example"></el-input>
    </el-form-item>
    <el-form-item label="Salida del ejemplo" prop="output">
      <el-input type="textarea" v-model="form.output"></el-input>
    </el-form-item>
    <el-form-item label="Enlace">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item>
      <slot name="buttons" />
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue'
import UUIDGenerate from '@/assets/js/UUIDGenerate'
export default {
  name: 'formNodoClose',
  setup () {
    const formulario = ref(null)
    const form = ref(reactive({
      id: UUIDGenerate(),
      name: '',
      title: '',
      reference: '',
      description: '',
      example: '',
      output: '',
      link: ''
    }))
    const clearForm = () => {
      form.value = reactive({
        id: UUIDGenerate(),
        name: '',
        title: '',
        reference: '',
        description: '',
        example: '',
        output: '',
        link: ''
      })
    }
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
      reference: [
        {
          required: true,
          message: 'Se necesita la referencia',
          trigger: 'blur'
        },
        {
          min: 3,
          message: 'La referencia debe tener mas de 3 caracteres',
          trigger: 'blur'
        }
      ],
      example: [
        {
          required: true,
          message: 'Se necesita el ejemplo',
          trigger: 'blur'
        },
        {
          min: 3,
          message: 'El ejemplo debe tener mas de 3 caracteres',
          trigger: 'blur'
        }
      ],
      output: [
        {
          required: true,
          message: 'Se necesita el resultado del ejemplo',
          trigger: 'blur'
        },
        {
          min: 3,
          message: 'El resultado del ejemplo debe tener mas de 3 caracteres',
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
      form, rules, formulario, clearForm
    }
  }
}
</script>

<style scoped lang="scss">

</style>
