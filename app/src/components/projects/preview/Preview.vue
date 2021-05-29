<template>
  <div>
<div id="superior">
  Idioma y logo github
</div>
    <div class="principal-grid">
      <div class="item-grid">
        <SelectOptionsNodos :elements="nodos" />
      </div>
      <div class="item-grid">
        lado derecho
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import deepClone from '../../../assets/js/deepClone'
import SelectOptionsNodos from './SelectOptionsNodos'
export default {
  name: 'Preview',
  components: { SelectOptionsNodos },
  props: {
    project: {
      type: Object,
      default: () => { return {} },
      require: false
    },
    nodos: {
      type: Array,
      default: () => { return [] },
      require: false
    }
  },
  setup (props) {
    let localProject = reactive(deepClone(props.project))
    watch(() => props.project, current => {
      localProject = reactive(deepClone(current))
    })
    return {
      localProject
    }
  }
}
</script>

<style scoped lang="scss">
.principal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width:100%;
  height: 100%;
  grid-column-gap: 20px;
  .item-grid {
    padding: 10px;
    border: 1px solid #000;
  }
}
</style>
<!--
    visualizacion del proyecto segun plantillas predeterminadas sin crear proyecto definitvo
    lista de plantillas
    eliminar posibles plantillas del proyecto / agregar
-->
