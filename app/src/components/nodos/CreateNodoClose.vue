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
import { ref, computed } from 'vue'
import deepClone from '@/assets/js/deepClone'
import { useStore } from 'vuex'

export default {
  name: 'CreateNodoClose',
  components: { formNodoClose },
  setup () {
    const formCreate = ref(null)
    const store = useStore()
    const projectActive = computed(() => store.getters['projects/getSelect'])
    const resetForm = () => {
      formCreate.value.clearForm()
    }
    const createCurrent = () => {
      formCreate.value.formulario.validate((valid) => {
        if (valid) {
          const formSend = deepClone(formCreate.value.form)
          formSend.type = 'close'
          formSend.project = projectActive.value.name
          store.dispatch('nodes/addNode', formSend)
          resetForm()
        } else {
          console.log('error form')
        }
      })
    }
    return {
      formCreate, createCurrent, resetForm
    }
  }
}
</script>

<style scoped>

</style>
