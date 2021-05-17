<template>
  <div id="content-mermaid" style="min-height: 200px; min-width:100%">
    <div class="mermaid">
      {{ diagram }}
    </div>
  </div>
  <div>
    <el-button type="primary" @click="forceUpdate()">Refresh</el-button>
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import projectToGraph from './projectToGraph'
import renoveGraph from './renoveGraph'

export default {
  name: 'mermaidGraph',
  props: {
    project: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    const message = () => {
      console.log('click')
    }
    const diagram = ref('')
    const localMermaid = ref(reactive({}))
    const initMermaid = () => {
      localMermaid.value.initialize(
        {
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          flowchart: {
            htmlLabels: false
          },
          er: {
            useMaxWidth: false
          },
          sequence: {
            useMaxWidth: false,
            noteFontWeight: '14px',
            actorFontSize: '14px',
            messageFontSize: '16px'
          }
        }
      )
    }
    const forceUpdate = () => {
      const childElement = document.createElement('div')
      childElement.classList.add('mermaid')
      diagram.value = projectToGraph(props.project)
      childElement.innerText = diagram.value
      renoveGraph('content-mermaid')
      const element = document.getElementById('content-mermaid')
      element.appendChild(childElement)
      localMermaid.value.init(undefined, childElement)
    }
    onMounted(() => {
      import('mermaid/dist/mermaid').then(m => {
        localMermaid.value = reactive(m)
        initMermaid()
        forceUpdate()
      })
    })
    watch(() => props.project, () => {
      setTimeout(() => {
        forceUpdate()
      }, 500)
    })
    return {
      diagram,
      message,
      forceUpdate
    }
  }
}
</script>

<style scoped lang="scss">
.mermaid {
  min-height: 200px;
}

#content-mermaid {
  min-height: 200px;
  min-width: 100%;
}
</style>
