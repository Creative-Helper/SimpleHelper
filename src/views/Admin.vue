<template>
  <div>
    <ul v-if="index==='5'">
      <li>Admin</li>
      <li>Lista proyectos creados</li>
        <li>Idiomas</li>
        <li>Claves de Apis (traduccion)</li>
        <li>eliminar proyectos.</li>
        <li>Eliminar creaciones completas o previews</li>
        <li>Analisis de proyectos.</li>
        <li>configurar .gitignore para que futuras actualizaciones no afecten las configuraciones.</li>
        <li>eliminar plantillas del listado.</li>
      <li>LOGS</li>
    </ul>
    <div v-if="index === '2'">
      <h2>Lenguajes de ambito universal.</h2>
    <language-list  />
      </div>
  </div>
</template>

<script>
import languageList from '@/components/languages/languageList'

export default {
  name: 'Admin',
  components: { languageList },
  props: {
    index: {
      type: String,
      require: false,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
