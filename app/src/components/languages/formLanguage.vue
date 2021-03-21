<template>
  <div>
    <el-form label-position="left" label-width="300px" :model="internalLanguage" :rules="rules" ref="LanguageForm"
             :disabled="action==='delete'">
      <el-form-item :label="t('languages.fields.name')" prop="name">
        <el-input v-model="internalLanguage.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('languages.fields.short')" prop="short">
        <el-input type="text" v-model="internalLanguage.short" class="two-char"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-alert v-if="formError"
                :title="t('languages.ajax.titles.error')"
                type="error"
                @close="formError = false"
                :description="t('languages.errors.modal')"
                show-icon>
      </el-alert>
    </div>
    <div v-if="action==='delete' || action==='change'">
      <div class="content-image-language" v-if="internalLanguage.type==='image'">
        <img :src="internalLanguage.image" :alt="internalLanguage.name"/>
      </div>
      <div class="content-image-language" v-html="internalLanguage.image" v-if="internalLanguage.type==='text'"/>
    </div>
    <div class="text-center" v-if="action!=='delete'">
      <uploadGeneral v-model:filename="internalLanguage.file" ref="uploadForm"/>
    </div>
    <div class="text-right">
      <el-button type="plain" @click="operationLanguage" class="espaciado">
        {{t('languages.buttons.cancel')}}
      </el-button>
      <el-button type="success" @click="createLanguage" class="espaciado" v-if="action==='create'">
        {{ t('languages.buttons.create') }}
      </el-button>
      <el-button type="warning" @click="changeLanguage" class="espaciado" v-if="action==='change'">
        {{ t('languages.buttons.change') }}
      </el-button>
      <el-button type="danger" @click="deleteLanguage" class="espaciado" v-if="action==='delete'">
        {{ t('languages.buttons.delete') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import uploadGeneral from '@/components/uploadGeneral'
import deepClone from '@/assets/js/deepClone'
import { useI18n } from 'vue-i18n'
import { ElNotification } from 'element-plus'

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
    const internalLanguage = ref(deepClone(props.externalLanguage))
    const oldLanguage = ref(deepClone(props.externalLanguage))
    const clearFields = () => {
      internalLanguage.value.name = ''
      internalLanguage.value.short = ''
      internalLanguage.value.file = ''
      formError.value = false
      context.emit('operation')
    }
    const createLanguage = () => {
      if (!internalLanguage.value.file) {
        formError.value = true
        ElNotification.error({
          title: t('languages.ajax.titles.error'),
          message: t('languages.errors.image')
        })
        return
      }
      LanguageForm.value.validate((valid) => {
        if (valid) {
          store.dispatch('language/createLanguage', deepClone(internalLanguage.value))
          clearFields()
        } else {
          formError.value = true
          if (!internalLanguage.value.file) {
            ElNotification.error({
              title: t('languages.ajax.titles.error'),
              message: t('languages.errors.image')
            })
          }
        }
      })
    }
    const resetForm = () => {
      LanguageForm.value.resetFields()
      formError.value = false
    }
    const changeLanguage = () => {
      LanguageForm.value.validate((valid) => {
        if (valid) {
          store.dispatch('language/modifyLanguage',
            {
              oldL: deepClone(oldLanguage.value),
              newL: deepClone(internalLanguage.value)
            })
          clearFields()
          oldLanguage.value.name = ''
          oldLanguage.value.short = ''
          oldLanguage.value.file = ''
          resetForm()
          internalLanguage.value = deepClone(props.externalLanguage)
          oldLanguage.value = deepClone(props.externalLanguage)
        } else {
          formError.value = true
        }
      })
    }
    const deleteLanguage = () => {
      store.dispatch('language/deleteLanguage', deepClone(internalLanguage.value))
      clearFields()
    }
    const operationLanguage = () => context.emit('operation')
    const rules = {
      name: [
        {
          required: true,
          message: t('languages.errors.noname'),
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: t('languages.errors.noLengthName'),
          trigger: 'blur'
        }
      ],
      short: [
        {
          required: true,
          message: t('languages.errors.noShort'),
          trigger: 'blur'
        },
        {
          min: 2,
          max: 2,
          message: t('languages.errors.noLengthShort'),
          trigger: 'blur'
        }
      ]
    }
    watch(() => props.externalLanguage, (selection) => {
      resetForm()
      internalLanguage.value = deepClone(selection)
      oldLanguage.value = deepClone(selection)
    })
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
