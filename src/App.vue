<template>
  <Default>
    <template v-slot:header>
      <nav-menu />
    </template>
    <template v-slot:main>
      <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
          <component :is="Component" :index="index" />
        </transition>
      </router-view>
    </template>
    <template v-slot:lateral>
      <lateral-menu @index="updateNav"/>
    </template>
    <template v-slot:footer>
      Pie
    </template>
  </Default>
</template>

<script lang="ts">
import Default from '@/layouts/Default.vue'
import navMenu from '@/components/general/navMenu.vue'
import lateralMenu from '@/components/general/lateralMenu.vue'
import { ref } from 'vue'

export default {
  components: { Default, navMenu, lateralMenu },
  setup () {
    const index = ref('')
    const updateNav = (value: string) => { index.value = value }
    return {
      updateNav, index
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
