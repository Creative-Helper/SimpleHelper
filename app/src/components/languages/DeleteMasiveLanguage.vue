<template>
  <div class="createlng">
  <el-button type="text" @click="dialogVisible = true">{{t('languages.buttons.delete')}}</el-button>
  <modal :visible="dialogVisible" :title="t('languages.modal.titles.deletes')" >
  <el-table
    :data="internaList"
    style="width: 100%">
    <el-table-column
      prop="name"
      :label="t('languages.fields.name')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="short"
      :label="t('languages.fields.shortshort')"
      width="180">
    </el-table-column>
    <el-table-column
      :label="t('languages.fields.image')">
      <template #default="scope">
        <div class="content-image-language" v-if="scope.row.type==='image'">
          <img :src="scope.row.image" :alt="scope.row.name"/>
        </div>
        <div class="content-image-language" v-html="scope.row.image" v-if="scope.row.type==='text'"/>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      :label="t('languages.fields.operations')"
      width="120">
      <template #default="scope">
        <el-button type="text" @click="recovery(scope.row)">{{t('languages.buttons.recovery')}}</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-button type="primary" @click="dialogVisible=false" class="espaciado">
      {{t('languages.buttons.cancel')}}
    </el-button>
    <el-button type="danger" @click="deleteLang" class="espaciado">
      {{t('languages.buttons.delete')}}
    </el-button>
  </modal>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import deepClone from '@/assets/js/deepClone'
import modal from '@/components/modal'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
export default {
  name: 'DeleteMassiveLanguage',
  components: { modal },
  emits: ['operation'],
  props: {
    listLanguage: {
      type: Array,
      require: true,
      default: () => { return [] }
    }
  },
  setup (props, context) {
    const internaList = ref(deepClone(props.listLanguage))
    const { t } = useI18n()
    const store = useStore()
    const dialogVisible = ref(false)
    const recovery = (elemento) => {
      internaList.value = internaList.value.filter(item => item.short !== elemento.short)
    }
    const deleteLang = () => {
      internaList.value.forEach(item => {
        store.dispatch('language/deleteLanguage', deepClone(item))
      })
      internaList.value = []
      dialogVisible.value = false
      context.emit('operation')
    }
    watch(() => props.listLanguage, (value) => {
      internaList.value = value
    })
    return {
      recovery, internaList, t, dialogVisible, deleteLang
    }
  }
}
</script>
