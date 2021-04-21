<template>
  <div>
    <form-nodo-simple ref="formCreate">
      <template v-slot:footer>
        <el-button type="primary" @click="createCurrent">Crear</el-button>
      </template>
    </form-nodo-simple>
  </div>
</template>

<script>
import formNodoSimple from '@/components/nodos/formNodoSimple'
import { ref, computed } from 'vue'
import deepClone from '@/assets/js/deepClone'
import { useStore } from 'vuex'

export default {
  name: 'CreateNodoSimple',
  components: { formNodoSimple },
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
          formSend.type = 'simple'
          formSend.project = projectActive.value.name
          store.dispatch('nodes/addNode', formSend)
          resetForm()
        } else {
          console.log('error form')
        }
      })
    }
    return {
      formCreate,
      createCurrent,
      resetForm
    }
  }
}
</script>

<style scoped lang="scss">

</style>
