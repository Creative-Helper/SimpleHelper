<template>
  <div>
    <el-tabs v-model="activeOption" @tab-click="handleClick">
      <el-tab-pane label="Listado de nodos" name="list">
        <el-table
          ref="refListNodos"
          :data="storeListNodos"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="Nombre"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="Titulo"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="Tipo">
          </el-table-column>
          <el-table-column
            label="Acciones">
            <template #default="scope">
              <el-button type="text">{{ scope.row.name }}</el-button>
              <!--<el-popconfirm
                confirmButtonText='OK'
                cancelButtonText='No, Gracias'
                icon="el-icon-info"
                iconColor="red"
                @confirm="deleteProject(scope.row)"
                title="Are you sure to delete this?"
              >
                <template #reference>
                  <el-button type="text">Eliminar</el-button>
                </template>
              </el-popconfirm>
              <span v-if="refSelectProject && refSelectProject.id===scope.row.id">&nbsp;Seleccionado</span>
              <el-popconfirm v-else
                             confirmButtonText='OK'
                             cancelButtonText='No, Gracias'
                             icon="el-icon-info"
                             iconColor="red"
                             @confirm="selectProject(scope.row)"
                             title="Are you sure to select this?"
              >
                <template #reference>
                  <el-button type="text">Seleccionar</el-button>
                </template>
              </el-popconfirm>-->
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Arbol de nodos" name="tree">
        <tree-node :data="treeData" :tree-config="defaultProps" @change="treeChange"/>
        <mermaidGraph :project="treeData" ref="refGraphMermaid"/>
      </el-tab-pane>
      <el-tab-pane label="Crear Nodo simple" name="simple">
        <create-nodo-simple ref="nodeSimple"/>
      </el-tab-pane>
      <el-tab-pane label="Crear Nodo final" name="endnode">
        <create-nodo-close ref="nodeClose"/>
      </el-tab-pane>
      <el-tab-pane label="Preview" name="preview">
        <preview :project="projectActive" :nodos="treeData"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateNodoSimple from '@/components/nodos/CreateNodoSimple'
import CreateNodoClose from '@/components/nodos/CreateNodoClose'
import treeNode from './treeNode'
import Preview from '@/components/projects/preview/Preview'
import { useStore } from 'vuex'
import { computed, ref, onMounted, watch } from 'vue'
import deepClone from '../../assets/js/deepClone'
import relationNodeToGraph from '../../assets/js/relationNodeToGraph'
import mermaidGraph from '../graph/mermaidGraph'

export default {
  name: 'ListNodes',
  components: {
    CreateNodoClose,
    CreateNodoSimple,
    treeNode,
    mermaidGraph,
    Preview
  },
  props: {
    projectActive: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const store = useStore()
    const graphTree = ref([])
    const active = ref(props.projectActive)
    const refGraphMermaid = ref('')
    const defaultProps = {
      children: 'children',
      label: 'name'
    }
    const refListNodos = ref('')
    const nodeSimple = ref('')
    const nodeClose = ref('')
    const activeOption = ref('list')
    const storeListNodos = computed(() => store.getters['nodes/getList'])
    const storeListRelations = computed(() => store.getters['nodes/getRelations'])
    const treeData = ref(deepClone(storeListRelations))
    const init = () => {
      store.dispatch('nodes/Init', active.value)
    }
    onMounted(() => {
      init()
    })
    const handleClick = (tab) => {
      const option = tab.paneName
      if (option === 'simple') {
        nodeSimple.value.resetForm()
      }
      if (option === 'endnode') {
        nodeClose.value.resetForm()
      }
    }
    const dragAuth = (node, destiny) => {
      return destiny.data.type !== 'close'
    }
    const treeChange = () => {
      refGraphMermaid.value.forceUpdate()
    }
    watch(storeListRelations, (current) => {
      treeData.value = deepClone(current)
      graphTree.value = relationNodeToGraph(treeData.value)
    })
    return {
      storeListNodos,
      refListNodos,
      activeOption,
      handleClick,
      nodeSimple,
      nodeClose,
      defaultProps,
      treeData,
      storeListRelations,
      dragAuth,
      graphTree,
      treeChange,
      refGraphMermaid
    }
  }
}
</script>

<style scoped>

</style>
