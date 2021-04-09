<template>
  <el-form label-width="200px" :model="formLocal" :rules="rules" ref="ProjectForm">
    <el-form-item label="Nombre" prop="name" required>
      <el-input v-model="formLocal.name"></el-input>
    </el-form-item>
    <el-form-item :label="'Titulo ('+formLocal.description.length+ ' de 30 caracteres)' " prop="title">
      <el-input v-model="formLocal.title"></el-input>
    </el-form-item>
    <el-form-item label="Descripcion">
      <el-input v-model="formLocal.description"></el-input>
    </el-form-item>
    <el-form-item label="Enlace del proyecto">
      <el-input v-model="formLocal.link"></el-input>
    </el-form-item>
    <el-form-item required>
      <h3>Idiomas</h3>
      <div class="grid2">
      <el-transfer
        v-model="selectLanguages"
        :titles="['Disponibles', 'Elegidas']"
        :data="allLanguages">
      </el-transfer>
        <div v-if="error" class="transfer-error"><span>{{error}}</span></div>
        <div v-if="selectLanguages.length > 0">
          <span>Lenguaje por defecto: </span>
          <el-radio v-model="formLocal.mainLanguage" :label="allLanguages[lang].key" v-for="lang in selectLanguages" :key="allLanguages[lang].key">{{allLanguages[lang].label}}</el-radio>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="sendForm(status)" v-if="status==='create'">Enviar</el-button>
      <el-button type="success" @click="sendForm(status)" v-if="status==='change'">Cambiar</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import deepClone from '@/assets/js/deepClone'

export default {
  name: 'FormCrudProject',
  props: {
    status: {
      type: String,
      require: false,
      default: 'create',
      validation: (value) => ['create', 'delete', 'change'].includes(value)
    },
    externForm: {
      type: Object,
      require: true,
      default: () => {
        return {
          id: '',
          name: '',
          title: '',
          description: '',
          languages: [],
          mainLanguage: -1,
          link: '',
          linkPosition: 0
        }
      }
    }
  },
  setup: function (props) {
    const store = useStore()
    const init = () => {
      store.dispatch('language/Init')
    }
    const ProjectForm = ref('')
    const error = ref('')
    const selectLanguages = ref([])
    const listLanguages = computed(() => store.getters['language/getLanguages'])
    const allLanguages = computed(() => listLanguages.value.map((item, index) => {
      return {
        key: index,
        label: item.name,
        short: item.short,
        disabled: false
      }
    }))
    const modifyExternal = (externalForm) => {
      selectLanguages.value = []
      setTimeout(() => {
        allLanguages.value.forEach(item => {
          externalForm.languages.forEach(element => {
            if (item.short === element.short) {
              selectLanguages.value.push(item.key)
            }
          })
        })
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        formLocal.value.mainLanguage = parseInt(externalForm.mainLanguage)
      }, 200)
      return deepClone(externalForm)
    }
    const formLocal = ref(modifyExternal(props.externForm.value))
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('El nombre es necesario'))
      }
      if (value.length < 3 || value.length > 20) {
        callback(new Error('El nombre debe tener entre 3 y 20 caracteres'))
      } else {
        if (value.trim().indexOf(' ') !== -1) {
          callback(new Error('El nombre no debe tener espacios en blanco'))
        } else {
          callback()
        }
      }
    }
    const validateLanguages = () => {
      if (selectLanguages.value.length === 0) {
        error.value = 'Falta seleccionar idioma'
        return false
      }
      if (formLocal.value.mainLanguage === -1) {
        if (selectLanguages.value.length === 1) {
          formLocal.value.mainLanguage = allLanguages.value[selectLanguages.value[0]].key
        } else {
          error.value = 'Falta seleccionar idioma'
          return false
        }
      }
      return true
    }
    const convertLanguagesSelect = () => {
      if (selectLanguages.value.length === 0) {
        return
      }
      formLocal.value.languages = []
      selectLanguages.value.forEach(item => {
        formLocal.value.languages.push({
          short: allLanguages.value[item].short
        })
      })
    }
    const rules = {
      name: [
        {
          validator: checkName,
          trigger: 'blur'
        }
      ],
      title: [
        {
          required: true,
          message: 'El titulo es necesario',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 30,
          message: 'El titulo debe tener entre 3 y 30 caracteres',
          trigger: 'blur'
        }
      ]
    }
    const sendForm = (status) => {
      ProjectForm.value.validate((valid) => {
        if (valid && validateLanguages()) {
          convertLanguagesSelect()
          if (status === 'create') {
            store.dispatch('projects/createProject', formLocal.value)
          }
          if (status === 'change') {
            store.dispatch('projects/changeProject', formLocal.value)
          }
        } else {
          validateLanguages()
          ElNotification.error({
            title: 'Problems',
            message: 'El formulario esta incorrecto. Revise los errores.',
            position: 'bottom-right'
          })
        }
      })
    }

    watch(selectLanguages, (current) => {
      error.value = ''
      if (current.length === 0 || !current.includes(formLocal.value.mainLanguage)) {
        formLocal.value.mainLanguage = -1
      }
    })
    watch(() => props.externForm.value, (current) => {
      formLocal.value = modifyExternal(current)
      ProjectForm.value.resetFields()
    })
    onMounted(() => {
      init()
    })
    return {
      formLocal,
      selectLanguages,
      allLanguages,
      rules,
      error,
      sendForm,
      ProjectForm
    }
  }
}
</script>

<style lang="scss">
.grid2 {
  display:grid;
  grid-template-rows: repeat(3, auto);
}
.el-transfer-panel {
  text-align: center;

  .el-transfer-panel__header {
    text-align: left;
  }

  .el-transfer-panel__empty {
    text-align: left;
  }

  .el-transfer-panel__item {

    &.el-checkbox {

      .el-checkbox__label {
        display: inline-block;
        text-align: left;
      }
    }
  }
}
.transfer-error {
  height: fit-content;
  font-size: 0.9em;
  color: #F56C6C;
}
</style>
