<template>
  <div>
    <create-nodo-simple />
    <hr />
    <create-nodo-close />
  </div>
</template>

<script>
import CreateNodoSimple from '@/components/nodos/CreateNodoSimple'
import CreateNodoClose from '@/components/nodos/CreateNodoClose'
export default {
  name: 'Nodos',
  components: {
    CreateNodoSimple, CreateNodoClose
  }
}
</script>

<style scoped lang="scss">

</style>
