<template>
  <div class="allIzq">
    <create-language @operation="operation"/>
    <span class="titleAll" v-if="bulkSelection.length > 0">Marcados:&nbsp;&nbsp;</span>
    <delete-masive-language :list-language="bulkSelection" v-if="bulkSelection.length > 0" @operation="operation" />
    <change-masive-language :list-languages="bulkSelection" v-if="bulkSelection.length > 0" @operation="operation" />
  </div>
  <el-table
    :data="listLanguage"
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
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
        <delete-language :externalLanguage="scope.row" @operation="operation" />
        <change-language :externalLanguage="scope.row" @operation="operation" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DeleteLanguage from './DeleteLanguage'
import ChangeLanguage from '@/components/languages/ChangeLanguage'
import CreateLanguage from '@/components/languages/CreateLanguage'
import DeleteMasiveLanguage from '@/components/languages/DeleteMasiveLanguage'
import ChangeMasiveLanguage from '@/components/languages/ChangeMasiveLanguage'

export default {
  name: 'languageList',
  components: {
    DeleteLanguage,
    ChangeLanguage,
    CreateLanguage,
    DeleteMasiveLanguage,
    ChangeMasiveLanguage
  },
  setup () {
    const store = useStore()
    const { t } = useI18n()
    const bulkSelection = ref([])
    const init = () => {
      store.dispatch('language/Init')
    }
    const listLanguage = computed(() => store.getters['language/getLanguages'])
    onMounted(() => {
      init()
    })
    const handleSelectionChange = (selection) => {
      bulkSelection.value = selection
    }
    const operation = () => {
      init()
    }
    return {
      listLanguage,
      handleSelectionChange,
      bulkSelection,
      operation,
      t
    }
  }
}
</script>

<style scoped lang="scss">
.content-image-language {
  max-width: 100px;
  overflow: hidden;

  img {
    width: 100%;
  }
}

.allIzq {
  width: 100%;
  text-align: left;

  div.createlng {
    display: inline;
    margin-left: 30px;
  }
  span.titleAll {
    margin-left: 30px;
  }
}
</style>
