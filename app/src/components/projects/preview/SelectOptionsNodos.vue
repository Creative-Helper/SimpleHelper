<template>
<el-select v-model="option">
<el-option
v-for="item in optionsElement" :key="item.id"
:value="item.id"
:label="item.title"
>

</el-option>
</el-select>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import deepClone from '../../../assets/js/deepClone'
import UUIDGenerate from '@/assets/js/UUIDGenerate'
export default {
  name: 'SelectOptionsNodos',
  props: {
    elements: {
      type: Array,
      require: false,
      default: () => { return [] }
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const option = ref(0)
    const optionsElement = ref(reactive(deepClone(props.elements)))
    option.value = UUIDGenerate()
    optionsElement.value.unshift({
      id: option.value,
      title: 'seleccione'
    })
    watch(() => props.elements, current => {
      optionsElement.value = reactive(deepClone(current))
      option.value = UUIDGenerate()
      optionsElement.value.unshift({
        id: option.value,
        title: 'seleccione'
      })
    })
    watch(() => option.value, current => {
      emit('change', current)
    })
    return {
      option,
      optionsElement
    }
  }
}
</script>

<style scoped>

</style>
