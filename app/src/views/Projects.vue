<template>
  <div>
    Proyectos
    {{index}}
    <div v-if="index === 'pr72'">
      <Nodos />
    </div>
    <div v-if="index === 'pr1'">
      <form-crud-project />
    </div>
  </div>
</template>
<script>
import Nodos from '@/components/nodos/Nodos'
import FormCrudProject from '@/components/projects/crud/FormCrudProject'
export default {
  name: 'Projects',
  components: { Nodos, FormCrudProject },
  props: {
    index: {
      type: String,
      require: false,
      default: ''
    }
  },
  setup () {
    const temp = 0
    return {
      temp
    }
  }
}
</script>

<style scoped lang="scss">

</style>
