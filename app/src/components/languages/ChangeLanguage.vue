<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">{{ t('languages.buttons.change') }}</el-button>
    <modal :visible="dialogVisible" :title="t('languages.modal.titles.change')">
      <form-language @operation="operation" :externalLanguage="internalLanguage" action="change"/>
    </modal>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import formLanguage from '@/components/languages/formLanguage'
import modal from '@/components/modal'
import deepClone from '@/assets/js/deepClone'

export default {
  name: 'ChangeLanguage',
  components: {
    formLanguage,
    modal
  },
  emits: ['operation'],
  props: {
    externalLanguage: {
      type: Object,
      require: true
    }
  },
  setup (props, context) {
    const { t } = useI18n()
    const dialogVisible = ref(false)
    const internalLanguage = ref(deepClone(props.externalLanguage))
    const operation = () => {
      dialogVisible.value = false
      context.emit('operation')
      setTimeout(() => {
        internalLanguage.value = deepClone(props.externalLanguage)
      }, 1000)
    }
    watch(() => props.externalLanguage, (selection) => {
      setTimeout(() => {
        internalLanguage.value = deepClone(selection)
      }, 1000)
    })
    return {
      dialogVisible,
      t,
      internalLanguage,
      operation
    }
  }
}
</script>

<style scoped lang="scss">

</style>
