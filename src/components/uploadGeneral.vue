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
          Clic para subir archivo
        </el-button>
      </div>
      <template #tip>
        <div class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb
          <div v-if="fileListInternal.length > 0" class="espaciado">
            Elimine el archivo ANTES de subir uno nuevo si lo desea cambiar.
          </div>
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script>
import { ref } from 'vue'

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
      handleSuccess
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
