<template>
  <div>
    Proyectos <span class="el-alert__title" v-if="projectActive">({{projectActive.name}})</span>
    <div style="position: relative">
      <list-projects />
    </div>
  </div>
</template>
<script>

import ListProjects from '@/components/projects/ListProjects'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Projects',
  components: { ListProjects },
  props: {
    index: {
      type: String,
      require: false,
      default: ''
    }
  },
  setup () {
    const store = useStore()
    const projectActive = computed(() => store.getters['projects/getSelect'])
    return {
      projectActive
    }
  }
}
</script>

<style scoped lang="scss">

</style>
