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
              <el-button type="text" @click="addToTree(scope.row)">Agregar al root</el-button>
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
        <div>
          <el-tree :data="treeData" :props="defaultProps"></el-tree>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Crear Nodo simple" name="simple">
        <create-nodo-simple ref="nodeSimple"/>
      </el-tab-pane>
      <el-tab-pane label="Crear Nodo final" name="endnode">
        <create-nodo-close ref="nodeClose"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateNodoSimple from '@/components/nodos/CreateNodoSimple'
import CreateNodoClose from '@/components/nodos/CreateNodoClose'
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'

export default {
  name: 'ListNodes',
  components: {
    CreateNodoClose,
    CreateNodoSimple
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
    const active = ref(props.projectActive)
    const defaultProps = {
      children: 'children',
      label: 'label'
    }
    const treeData = ref([])
    const refListNodos = ref('')
    const nodeSimple = ref('')
    const nodeClose = ref('')
    const activeOption = ref('list')
    const storeListNodos = computed(() => store.getters['nodes/getList'])
    const addToTree = (node) => {
      if (treeData.value[0].children) {
        treeData.value[0].children.push({
          label: node.title
        })
      } else {
        treeData.value[0].children = [{ label: node.title }]
      }
    }
    const init = () => {
      store.dispatch('nodes/Init', active.value)
    }
    onMounted(() => {
      init()
      treeData.value.push({
        label: 'Root'
      })
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
    return {
      storeListNodos,
      refListNodos,
      activeOption,
      handleClick,
      addToTree,
      nodeSimple,
      nodeClose,
      defaultProps,
      treeData
    }
  }
}
</script>

<style scoped>

</style>
