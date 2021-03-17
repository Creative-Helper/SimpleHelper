<template>
  <el-container>
    <el-header v-if="header" class="el-header-no-padding">
      <slot name="header" />
    </el-header>
    <el-container>
      <el-aside :width="width" v-if="lateral && route !== 'Home'">
        <slot name="lateral" />
      </el-aside>
      <el-container>
        <el-main v-if="main">
          <slot name="main" />
        </el-main>
      </el-container>
    </el-container>
    <el-container>
      <el-footer v-if="footer">
        <slot name="footer" />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'Default',
  props: {
    header: {
      type: Boolean,
      require: false,
      default: true
    },
    lateral: {
      type: Boolean,
      require: false,
      default: true
    },
    main: {
      type: Boolean,
      require: false,
      default: true
    },
    footer: {
      type: Boolean,
      require: false,
      default: true
    },
    width: {
      type: String,
      require: false,
      default: '200px'
    }
  },
  setup () {
    const { currentRoute } = useRouter()
    const route = computed(() => currentRoute.value.name)
    return {
      route
    }
  }
}
</script>

<style scoped lang="scss">

</style>
