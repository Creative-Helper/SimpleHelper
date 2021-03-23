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
import { ref } from 'vue'
import deepClone from '@/assets/js/deepClone'
import { useStore } from 'vuex'

export default {
  name: 'CreateNodoSimple',
  components: { formNodoSimple },
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
          formSend.type = 'simple'
          store.dispatch('nodes/addNode', formSend)
          console.log(formSend)
        } else {
          console.log('error form')
        }
      })
    }
    return {
      formCreate,
      createCurrent
    }
  }
}
</script>

<style scoped lang="scss">

</style>
