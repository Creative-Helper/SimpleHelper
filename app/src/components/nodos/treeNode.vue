<template>
  <el-tree :data="treeData" :props="defaultProps" :draggable="true" :allow-drop="dragAuth" @node-drag-end="nodeEnd">
    <template #default="{ data }">
      <tree-item :data="data" />
    </template>
  </el-tree>
  <div class="content-button">
    <div class="content-button-color">
    <span class="simple"><i class="el-icon-circle-plus-outline"></i>&nbsp;Permite herencia</span>
    <span class="close"><i class="el-icon-circle-check"></i>&nbsp;No permite herencia</span>
    </div>
    <div><el-button>Boton</el-button></div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue'
import deepClone from '@/assets/js/deepClone'
import treeItem from './treeItem'

export default {
  name: 'treeNode',
  components: { treeItem },
  props: {
    data: {
      type: Array,
      require: false,
      default: () => { return [] }
    },
    treeConfig: {
      type: Object,
      require: false,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      }
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const treeData = ref([])
    const defaultProps = ref(reactive({}))
    const dragAuth = (node, destiny) => {
      return destiny.data.type !== 'close'
    }
    const nodeEnd = () => {
      emit('change')
    }
    onMounted(() => {
      setTimeout(() => {
        treeData.value = props.data
        defaultProps.value = reactive(deepClone(props.treeConfig))
      }, 500)
    })
    watch(() => props.data, current => {
      treeData.value = current
    })
    return { dragAuth, treeData, defaultProps, nodeEnd }
  }
}
</script>

<style scoped lang="scss">
.content-button {
width: 80%;
  border: 1px solid #909399;;
  border-radius: 10px;
  padding: 8px;
  background-color: #ffffff;
  margin: 10px auto 2px;
  display: grid;
  grid-template-columns: 200px auto;
  grid-column-gap: 10px;
}

.content-button-color {
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 10px;
  font-size: 0.8em;
}

.simple {
  color: darkcyan;
}

.close {
  color: darkred;
}
</style>
