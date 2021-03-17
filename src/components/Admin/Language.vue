<template>
  <div>
    <ul>
      <li>Crear Idiomas,</li>
      <li>eliminar del total del proyecto.</li>
      <li>Agregar o eliminar de forma masiva idiomas de proyectos.</li>
      <li>Crear traducciones Universales.</li>
      <li>Asociar recursos para correcion ortografica o gramatical</li>
    </ul>
    <language-list />
    <CreateLanguage />
  </div>
</template>

<script>
import languageList from '@/components/languages/languageList'
import CreateLanguage from '@/components/languages/CreateLanguage'
export default {
  name: 'Language',
  components: { languageList, CreateLanguage }
}
</script>

<style scoped lang="scss">

</style>
