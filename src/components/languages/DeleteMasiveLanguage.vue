<template>
  <div class="createlng">
  <el-button type="text" @click="dialogVisible = true">{{t('languages.delete')}}</el-button>
  <modal :visible="dialogVisible" title="Borrado masivo de lenguajes" >
  <el-table
    :data="internaList"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="short"
      label="Letters"
      width="180">
    </el-table-column>
    <el-table-column
      label="Image">
      <template #default="scope">
        <div class="content-image-language" v-if="scope.row.type==='image'">
          <img :src="scope.row.image"/>
        </div>
        <div class="content-image-language" v-html="scope.row.image" v-if="scope.row.type==='text'"/>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operaciones"
      width="120">
      <template #default="scope">
        <el-button type="text" @click="recovery(scope.row)">Recovery</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-button type="primary" @click="dialogVisible=false" class="espaciado">
      Cancelar
    </el-button>
  </modal>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import deepClone from '@/assets/js/deepClone'
import modal from '@/components/modal'
import { useI18n } from 'vue-i18n'
export default {
  name: 'DeleteMassiveLanguage',
  components: { modal },
  props: {
    listLanguage: {
      type: Array,
      require: true,
      default: () => { return [] }
    }
  },
  setup (props) {
    const internaList = computed(() => deepClone(props.listLanguage))
    const { t } = useI18n()
    const dialogVisible = ref(false)
    const recovery = (elemento) => {
      console.log(elemento)
    }
    return {
      recovery, internaList, t, dialogVisible
    }
  }
}
</script>
