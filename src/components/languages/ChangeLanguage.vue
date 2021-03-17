<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">{{t('languages.change')}}</el-button>
    <modal :visible="dialogVisible" title="Modificar lenguaje">
      <form-language @operation="operation" :externalLanguage="internalLanguage" action="change"/>
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
  name: 'ChangeLanguage',
  components: { formLanguage, modal },
  emits: ['operation'],
  props: {
    externalLanguage: {
      type: Object,
      require: true,
      default: () => { return {} }
    }
  },
  setup (props, context) {
    const { t } = useI18n()
    const dialogVisible = ref(false)
    const internalLanguage = computed(() => deepClone(props.externalLanguage))
    const operation = () => {
      dialogVisible.value = false
      context.emit('operation')
    }
    return {
      dialogVisible, t, internalLanguage, operation
    }
  }
}
</script>

<style scoped lang="scss">

</style>
