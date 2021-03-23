<template>
  <div>
    <form-nodo-close ref="formCreate">
      <template v-slot:buttons>
        <el-button type="success" @click="createCurrent">Enviar</el-button>
      </template>
    </form-nodo-close>
  </div>
</template>

<script>
import formNodoClose from '@/components/nodos/formNodoClose'
import { ref } from 'vue'
import deepClone from '@/assets/js/deepClone'
import { useStore } from 'vuex'

export default {
  name: 'CreateNodoClose',
  components: { formNodoClose },
  setup () {
    const formCreate = ref(null)
    const store = useStore()
    const createCurrent = () => {
      formCreate.value.formulario.validate((valid) => {
        console.log('invalidado: ', valid)
        if (valid) {
          console.log('entro')
          const formSend = deepClone(formCreate.value.form)
          console.log(formSend)
          formSend.type = 'close'
          store.dispatch('nodes/addNode', formSend)
          console.log(formSend)
        } else {
          console.log('error form')
        }
      })
    }
    return {
      formCreate, createCurrent
    }
  }
}
</script>

<style scoped>

</style>
