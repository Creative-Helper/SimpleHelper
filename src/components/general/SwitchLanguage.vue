<template>
  <div>
    <el-select v-model="$i18n.locale" placeholder="Select">
      <el-option
        v-for="item in availableLocales"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'
export default {
  name: 'SwitchLanguage',
  setup () {
    const { locale, availableLocales } = useI18n()
    const { currentRoute } = useRouter()
    const router = useRouter()
    watchEffect(() => {
      router.push({ name: currentRoute.value.name })
    })

    return {
      locale, availableLocales
    }
  }
}
</script>

<style scoped lang="scss">

</style>
// i18n.global.locale = 'en'
