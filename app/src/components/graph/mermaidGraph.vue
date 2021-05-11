<template>
  <div class="mermaid">
{{diagram}}
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'

export default {
  name: 'mermaidGraph',
  setup () {
    const diagram = 'graph TD; ' +
    'A-->B;' +
    'A-->C;' +
    'B-->D;' +
    'C-->D;'
    onBeforeMount(() => {
    import('mermaid/dist/mermaid').then(m => {
      m.initialize({
        startOnLoad: true
      })
      m.init()
    })
    })
    return { diagram }
  }
}
</script>

<style scoped lang="scss">

</style>
