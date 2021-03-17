<template>
  <div>
    <el-form label-position="left" label-width="300px" :model="internalLanguage" :rules="rules" ref="LanguageForm">
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="internalLanguage.name"></el-input>
      </el-form-item>
      <el-form-item label="Caracteres identificadores (2 caracteres)" prop="short">
        <el-input type="text" v-model="internalLanguage.short" class="two-char"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-alert v-if="formError"
                title="Error en el envio"
                type="error"
                description="Por favor  revise el formulario y los errores marcados"
                show-icon>
      </el-alert>
    </div>
    <div class="text-center">
    <uploadGeneral v-model:filename="internalLanguage.file" ref="uploadForm"/>
       </div>
    <div class="text-right">
    <el-button type="secondary" @click="operationLanguage" class="espaciado">
      Cancelar
    </el-button>
    <el-button type="success" @click="createLanguage" class="espaciado" v-if="action==='create'">
      {{ t('languages.enviar') }}
    </el-button>
    <el-button type="warning" @click="changeLanguage" class="espaciado" v-if="action==='change'">
      {{ t('languages.enviar') }}
    </el-button>
    <el-button type="danger" @click="deleteLanguage" class="espaciado" v-if="action==='delete'">
      {{ t('languages.enviar') }}
    </el-button>
      </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import uploadGeneral from '@/components/uploadGeneral'
import deepClone from '@/assets/js/deepClone'
import { useI18n } from 'vue-i18n'

export default {
  name: 'formLanguage',
  components: { uploadGeneral },
  props: {
    externalLanguage: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    },
    action: {
      type: String,
      require: false,
      default: 'create',
      validation: (value) => ['create', 'change', 'delete'].includes(value)
    }
  },
  emits: ['operation'],
  setup (props, context) {
    const { t } = useI18n()
    const formError = ref(false)
    const store = useStore()
    const LanguageForm = ref(null)
    const uploadForm = ref(null)
    const internalLanguage = reactive(deepClone(props.externalLanguage))
    const createLanguage = () => {
      LanguageForm.value.validate((valid) => {
        if (valid) {
          formError.value = false
          store.dispatch('language/createLanguage', deepClone(internalLanguage))
          internalLanguage.name = ''
          internalLanguage.short = ''
          internalLanguage.file = ''
          uploadForm.value.handleRemove()
          context.emit('operation')
        } else {
          formError.value = true
        }
      })
    }
    const changeLanguage = () => {
      return {}
    }
    const deleteLanguage = () => {
      return {}
    }
    const resetForm = () => {
      LanguageForm.value.resetFields()
      formError.value = false
      uploadForm.value.handleRemove()
    }
    const operationLanguage = () => context.emit('operation')
    const rules = {
      name: [
        {
          required: true,
          message: 'Please input language name',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: 'Length should be 3 to 20',
          trigger: 'blur'
        }
      ],
      short: [
        {
          required: true,
          message: 'Please input short name',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 2,
          message: 'Length should be 2',
          trigger: 'blur'
        }
      ]
    }
    return {
      internalLanguage,
      t,
      createLanguage,
      changeLanguage,
      deleteLanguage,
      operationLanguage,
      rules,
      LanguageForm,
      uploadForm,
      formError,
      resetForm
    }
  }
}
</script>
