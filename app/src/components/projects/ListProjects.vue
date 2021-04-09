<template>
  <div class="text-left">
    <el-button type="success" size="small" @click="createProject">Crear proyecto</el-button>
  </div>
  <el-table
    ref="refListProjects"
    :data="ListOfProjects"
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
      prop="id"
      label="Identificador">
    </el-table-column>
    <el-table-column
      label="Acciones">
      <template #default="scope">
        <el-button type="text" @click="changeProject(scope.row)">Modificar</el-button>
        <el-popconfirm
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
      </template>
    </el-table-column>
  </el-table>
  <modal title="Modificar Proyecto" :visible="visible" top="0">
    <form-crud-project :extern-form="projectObjective" :status="status" ref="refFormChanges" />
    <el-button type="text" @click="closeModal">Cerrar modal</el-button>
  </modal>
</template>

<script>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import FormCrudProject from '@/components/projects/crud/FormCrudProject'
import modal from '@/components/modal'
import deepClone from '@/assets/js/deepClone'
import UUIDGenerate from '@/assets/js/UUIDGenerate'

export default {
  name: 'ListProjects',
  components: {
    FormCrudProject,
    modal
  },
  setup () {
    const store = useStore()
    const status = ref('change')
    const refListProjects = ref('')
    const refFormChanges = ref('')
    const visible = computed(() => store.getters['projects/getModalStatus'])
    const projectObjective = reactive({})
    const ListOfProjects = computed(() => store.getters['projects/getList'])
    const init = () => {
      store.dispatch('projects/Init')
    }
    const createProject = () => {
      status.value = 'create'
      projectObjective.value = {
        id: UUIDGenerate(),
        name: '',
        title: '',
        description: '',
        languages: [],
        mainLanguage: -1, // radio button
        link: '',
        linkPosition: 0 // radio button depende del link.
      }
      store.dispatch('projects/openModal')
    }
    const changeProject = (project) => {
      status.value = 'change'
      projectObjective.value = deepClone(project)
      store.dispatch('projects/openModal')
    }
    const deleteProject = (project) => {
      store.dispatch('projects/deleteProject', project)
    }
    const closeModal = () => {
      store.dispatch('projects/closeModal')
    }
    onMounted(() => {
      init()
    })
    return {
      ListOfProjects,
      refListProjects,
      changeProject,
      createProject,
      deleteProject,
      visible,
      projectObjective,
      refFormChanges,
      status,
      closeModal
    }
  }
}
</script>

<style scoped>

</style>
