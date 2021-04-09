<template>
  <div>
    Proyectos
    {{index}}
    <div v-if="listStatus">
      <list-projects />
    </div>
    <div v-if="index === 'pr72'">
      <Nodos />
    </div>
  </div>
</template>
<script>
import Nodos from '@/components/nodos/Nodos'
import ListProjects from '@/components/projects/ListProjects'
import { computed } from 'vue'
export default {
  name: 'Projects',
  components: { Nodos, ListProjects },
  props: {
    index: {
      type: String,
      require: false,
      default: ''
    }
  },
  setup (props) {
    const temp = 0
    const listStatus = computed(() => {
      return props.index === 'pr0' || !props.index.includes('pr')
    })
    return {
      temp, listStatus
    }
  }
}
</script>

<style scoped lang="scss">

</style>
