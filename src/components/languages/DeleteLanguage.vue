<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">{{t('languages.delete')}}</el-button>
    <modal :visible="dialogVisible" title="Eliminar lenguaje">
      <form-language @operation="dialogVisible = false" :externalLanguage="internalLanguage" action="delete"/>
    </modal>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import formLanguage from '@/components/languages/formLanguage'
import modal from '@/components/modal'
import deepClone from '../../assets/js/deepClone'
export default {
  name: 'DeleteLanguage.vue',
  components: { formLanguage, modal },
  props: {
    externalLanguage: {
      type: Object,
      require: true,
      default: () => { return {} },
      validation: (value) => Object.keys(value).length > 0
    }
  },
  setup (props) {
    const { t } = useI18n()
    const dialogVisible = ref(false)
    const internalLanguage = computed(() => deepClone(props.externalLanguage))
    return {
      dialogVisible, t, internalLanguage
    }
  }
}
</script>

<style scoped lang="scss">

</style>
