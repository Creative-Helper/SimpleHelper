<template>
  <div class="createlng">
    <el-button type="text" @click="dialogVisible = true">{{t('languages.new')}}</el-button>
    <modal :visible="dialogVisible" title="Agregar lenguaje" >
    <form-language @operation="operation" ref="controlModal"/>
    </modal>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import formLanguage from '@/components/languages/formLanguage'
import modal from '@/components/modal'
export default {
  name: 'CreateLanguage',
  components: { formLanguage, modal },
  emits: ['operation'],
  setup (props, context) {
    const { t } = useI18n()
    const controlModal = ref(null)
    const dialogVisible = ref(false)
    const operation = () => {
      dialogVisible.value = false
      context.emit('operation')
    }
    watch(
      () => dialogVisible.value,
      (current, old) => {
        if (!current && old) {
          controlModal.value.resetForm()
        }
      }
    )
    return {
      dialogVisible, t, controlModal, operation
    }
  }
}
</script>
