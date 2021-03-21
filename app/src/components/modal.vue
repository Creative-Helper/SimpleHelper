<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    :width="width">
    <slot />
  </el-dialog>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  name: 'modal',
  props: {
    title: {
      type: String,
      require: false,
      default: 'title'
    },
    visible: {
      type: Boolean,
      require: false,
      default: false
    },
    width: {
      type: String,
      require: false,
      default: '50%'
    }
  },
  setup (props) {
    const dialogVisible = ref(props.visible)
    watchEffect(() => {
      dialogVisible.value = props.visible
    })
    return {
      dialogVisible
    }
  }
}
</script>

<style lang="scss">
.el-dialog__header {
  text-align: center;
}
</style>
