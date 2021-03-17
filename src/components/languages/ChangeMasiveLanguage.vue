<template>
  <div class="createlng">
    <el-button type="text" @click="dialogVisible = true">{{t('languages.change')}}</el-button>
    <modal :visible="dialogVisible" title="Cambio masivo de lenguajes" >
    <div v-for="(lang, index) in internaList" :key="lang.name">
      <el-form label-position="left" label-width="300px" :model="lang" :rules="rules" ref="LanguageForm"
               v-if="(index + 1) === indexGeneral">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="lang.name"></el-input>
        </el-form-item>
        <el-form-item label="Caracteres identificadores (2 caracteres)" prop="short">
          <el-input type="text" v-model="lang.short"></el-input>
        </el-form-item>
      </el-form>
    </div>
      <div>
        <el-button type="primary" @click="dialogVisible=false" class="espaciado">Cerrar</el-button>
      </div>
    <el-pagination
      @current-change="currentChange"
      layout="prev, pager, next"
      :page-size="1"
      :current-page="indexGeneral"
      :total="internaList.length">
    </el-pagination>
    </modal>
  </div>
</template>
<script>
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import deepClone from '@/assets/js/deepClone'
import modal from '@/components/modal'
export default {
  name: 'ChangeMassiveLanguage',
  components: { modal },
  props: {
    listLanguages: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    const { t } = useI18n()
    const internaList = ref(deepClone(props.listLanguages))
    const indexGeneral = ref(1)
    const dialogVisible = ref(false)
    const currentChange = (newValue) => { indexGeneral.value = newValue }
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
    watchEffect(() => {
      internaList.value = deepClone(props.listLanguages)
    })
    return {
      internaList,
      indexGeneral,
      rules,
      dialogVisible,
      currentChange,
      t
    }
  }
}
</script>
