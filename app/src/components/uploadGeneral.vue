<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="lineUpload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      multiple
      :limit="1"
      name="image"
      list-type="picture"
      :file-list="fileListInternal">
      <div class="espaciado">
        <el-button size="small" type="primary" :disabled="fileListInternal.length !== 0">
          {{t('languages.buttons.upload')}}
        </el-button>
      </div>
      <template #tip>
        <div class="el-upload__tip">{{t('languages.messages.file')}}
          <div v-if="fileListInternal.length > 0" class="espaciado">
            {{t('languages.messages.beforeFile')}}
          </div>
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'uploadGeneral',
  props: {
    url: {
      type: String,
      default: 'language/upload',
      require: false
    }
  },
  emits: ['update:filename'],
  setup (props, context) {
    const { t } = useI18n()
    const lineUpload = process.env.VUE_APP_DOMAIN + ':' + process.env.VUE_APP_PORT + process.env.VUE_APP_API_URL + props.url
    const fileListInternal = ref([])
    const handleRemove = () => {
      fileListInternal.value = []
      context.emit('update:filename', null)
    }
    const handleSuccess = (response, file, fileList) => {
      fileListInternal.value = fileList
      context.emit('update:filename', file.name)
    }
    return {
      lineUpload,
      handleRemove,
      fileListInternal,
      handleSuccess,
      t
    }
  }
}
</script>

<style scoped lang="scss">
.el-upload__tip {
  width: 100%;
  text-align: center;
}
</style>
