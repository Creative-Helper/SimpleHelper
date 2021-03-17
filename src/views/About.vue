<template>
  <div>
    Creacion
    Objetivos
    Colaboradores
    url del proyecto en github.
    {{index}}
    <Link v-if="index==='bt3'" />
    <Objective v-if="index==='bt1'" />
    <Partners v-if="index==='bt2'" />
    <Social v-if="index==='bt4'" />
  </div>
</template>
<script>
import Link from '@/components/About/Link.vue'
import Objective from '@/components/About/Objective.vue'
import Partners from '@/components/About/Partners.vue'
import Social from '@/components/About/Social.vue'
export default {
  name: 'About',
  components: { Link, Objective, Partners, Social },
  props: {
    index: {
      type: String,
      require: false,
      default: ''
    }
  }
}
</script>
<style>

</style>
