<template>
  <el-form label-width="180px" :model="form" :rules="rules" ref="ProjectForm">
    <el-form-item label="Nombre" prop="name" required>
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Titulo" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="Descripcion">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="Enlace del proyecto">
      <el-input v-model="form.link"></el-input>
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
          <el-radio v-model="form.mainLanguage" :label="allLanguages[lang].key" v-for="lang in selectLanguages" :key="allLanguages[lang].key">{{allLanguages[lang].label}}</el-radio>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="sendForm">Enviar</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import UUIDGenerate from '@/assets/js/UUIDGenerate'
import { ElNotification } from 'element-plus'

export default {
  name: 'FormCrudProject',
  props: {
    status: {
      type: String,
      require: false,
      default: 'create',
      validation: (value) => ['create', 'delete', 'change'].includes(value)
    }
  },
  setup () {
    const store = useStore()
    const init = () => {
      store.dispatch('language/Init')
      store.dispatch('projects/Init')
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
    const form = reactive({
      id: UUIDGenerate(),
      name: '',
      title: '',
      description: '',
      languages: [
        {
          short: 'en'
        }
      ],
      mainLanguage: -1, // radio button
      link: '',
      linkPosition: 0 // radio button depende del link.
    })
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
      if (form.mainLanguage === -1) {
        if (selectLanguages.value.length === 1) {
          form.mainLanguage = allLanguages.value[selectLanguages.value[0]].key
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
      form.languages = []
      selectLanguages.value.forEach(item => {
        form.languages.push({
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
          max: 20,
          message: 'El titulo debe tener entre 3 y 20 caracteres',
          trigger: 'blur'
        }
      ]
    }
    const sendForm = () => {
      ProjectForm.value.validate((valid) => {
        if (valid && validateLanguages()) {
          convertLanguagesSelect()
          store.dispatch('projects/createProject', form)
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
      if (current.length === 0 || !current.includes(form.mainLanguage)) {
        form.mainLanguage = -1
      }
    })
    onMounted(() => {
      init()
    })
    return {
      form,
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
