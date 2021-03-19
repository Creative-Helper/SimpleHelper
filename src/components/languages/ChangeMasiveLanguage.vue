<template>
  <div class="createlng">
    <el-button type="text" @click="dialogVisible = true">{{ t('languages.change') }}</el-button>
    <modal :visible="dialogVisible" title="Cambio masivo de lenguajes">
      <div v-for="(lang, index) in internaList" :key="lang.name">
        <el-form label-position="left" label-width="300px" :model="lang" :rules="rules" ref="LanguageForm"
                 v-if="(index + 1) === indexGeneral">
          <el-form-item label="Nombre" prop="name">
            <el-input type="text" v-model="lang.name"></el-input>
          </el-form-item>
          <el-form-item label="Caracteres identificadores (2 caracteres)" prop="short">
            <el-input type="text" v-model="lang.short"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="recovery(lang)">Recovery</el-button>
          </el-form-item>
          <el-form-item>
            <div class="content-image-language" v-if="lang.type==='image'">
              <img :src="lang.image" :alt="lang.name"/>
            </div>
            <div class="content-image-language" v-html="lang.image" v-if="lang.type==='text'"/>
            <uploadGeneral v-model:filename="lang.file" ref="uploadForm"/>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="dialogVisible=false" class="espaciado">
        Cancelar
      </el-button>
      <el-button type="danger" @click="changeLang" class="espaciado">
        Eliminar
      </el-button>
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
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import deepClone from '@/assets/js/deepClone'
import modal from '@/components/modal'
import uploadGeneral from '@/components/uploadGeneral'

export default {
  name: 'ChangeMassiveLanguage',
  components: { modal, uploadGeneral },
  emits: ['operation'],
  props: {
    listLanguages: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    }
  },
  setup (props, context) {
    const { t } = useI18n()
    const store = useStore()
    const internaList = ref(deepClone(props.listLanguages).map(item => {
      return {
        ...item,
        old: item.short,
        file: null
      }
    }))
    const indexGeneral = ref(1)
    const dialogVisible = ref(false)
    const currentChange = (newValue) => {
      indexGeneral.value = newValue
    }
    const recovery = (elemento) => {
      internaList.value = internaList.value.filter(item => item.short !== elemento.short)
    }
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
    const changeLang = () => {
      internaList.value.forEach(item => {
        const oldL = deepClone(item)
        oldL.short = oldL.old
        store.dispatch('language/modifyLanguage',
          {
            oldL: deepClone(oldL),
            newL: deepClone(item)
          })
      })
      internaList.value = []
      dialogVisible.value = false
      context.emit('operation')
    }
    watch(() => props.listLanguages, (selection) => {
      internaList.value = deepClone(selection).map(item => {
        return {
          ...item,
          old: item.short,
          file: null
        }
      })
    })
    return {
      internaList,
      recovery,
      changeLang,
      indexGeneral,
      rules,
      dialogVisible,
      currentChange,
      t
    }
  }
}
</script>
