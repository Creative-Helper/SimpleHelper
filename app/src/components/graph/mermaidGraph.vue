<template>
  <div class="mermaid">
    {{ diagram }}
  </div>
  {{diagram}}
</template>

<script>
import { onMounted, ref, reactive } from 'vue'
import { boxShape, boxShapeRound, styleShape } from './mermaidStyles'
import mermaidConnect from './mermaidConnect'
export default {
  name: 'mermaidGraph',
  setup () {
    const arrow = mermaidConnect('normal', 'multiple')
    const diagram = 'graph LR; ' +
      styleShape('A', 'Raiz', boxShape) + arrow + boxShapeRound('B', 'Primer elemento') + ';' +
      ' A <--> C;' +
      ' B --> D;' +
      ' C <--> D;'
    const localMermaid = ref(reactive({}))
    onMounted(() => {
      import('mermaid/dist/mermaid').then(m => {
        localMermaid.value = reactive(m)
        localMermaid.value.initialize(
          {
            startOnLoad: false,
            theme: 'default',
            flowchart: {
              htmlLabels: false
            },
            er: {
              useMaxWidth: false
            },
            sequence: {
              useMaxWidth: false,
              // Mermaid handles Firefox a little different.
              // For some reason, it doesn't attach font sizes to the labels in Firefox.
              // If we specify the documented defaults, font sizes are written to the labels in Firefox.
              noteFontWeight: '14px',
              actorFontSize: '14px',
              messageFontSize: '16px'
            }
          }
        )
        setTimeout(() => {
          localMermaid.value.init()
        }, 1200)
      })
    })
    return { diagram }
  }
}
</script>

<style scoped lang="scss">
.mermaid {
  min-height: 200px;
}
</style>
