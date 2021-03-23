<template>
  <div>
    Proyectos
    {{index}}
    <div v-if="index === 'pr72'">
      <Nodos />
    </div>
  </div>
</template>
<script>
import Nodos from '@/components/nodos/Nodos'
export default {
  name: 'Projects',
  components: { Nodos },
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
