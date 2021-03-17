<template>
  <el-menu
    :default-active="currentRoute.name"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item :index="route.name" v-for="route in getRoutes()" :key="route.name">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </el-menu-item>
    <el-menu-item index="language">
      <SwitchLanguage />
    </el-menu-item>
  </el-menu>
</template>

<script>
import { useRouter } from 'vue-router'
import SwitchLanguage from '@/components/general/SwitchLanguage.vue'
export default {
  name: 'navMenu',
  components: { SwitchLanguage },
  setup () {
    const { currentRoute, getRoutes, push } = useRouter()
    const handleSelect = (key) => {
      if (currentRoute.value.name !== key) {
        push({ name: key })
      }
    }
    return {
      currentRoute, getRoutes, handleSelect
    }
  }
}
</script>

<style scoped lang="scss">

</style>
