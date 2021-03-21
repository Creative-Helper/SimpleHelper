<template>
  <div class="lateral">
    <ul>
      <li v-for="item in optionsMenu" :key="item.index" class="close"  :id="item.index" @click.stop="selectOption(item.index)">
        {{item.index}} - {{item.name}} <i v-if="item.children" class="el-icon-caret-bottom" @click="changeStatus(item.index)"></i>
        <ul v-if="item.children" >
          <li v-for="element in item.children" :key="element.index" class="close"  :id="element.index" @click.stop="selectOption(element.index)">
            {{element.index}} - {{element.name}} <i v-if="element.children" class="el-icon-caret-bottom" @click="changeStatus(element.index)"></i>
            <ul v-if="element.children" >
              <li v-for="nodo in element.children" :key="nodo.index" class="close"  :id="nodo.index" @click.stop="selectOption(nodo.index)">
                {{nodo.index}} - {{nodo.name}} <i v-if="nodo.children" class="el-icon-caret-bottom" @click="changeStatus(nodo.index)"></i>
                <ul v-if="nodo.children" >
                  <li v-for="step in nodo.children" :key="step.index" class="close" :id="step.index" @click.stop="selectOption(step.index)">
                    {{step.index}} - {{step.name}} <i v-if="step.children" class="el-icon-caret-bottom" @click="changeStatus(step.index)"></i>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <infoColores />
  </div>
</template>
<script>
import home from '@/components/general/lateral/home.json'
import admin from '@/components/general/lateral/admin.json'
import project from '@/components/general/lateral/project.json'
import about from '@/components/general/lateral/about.json'
import infoColores from '@/components/general/infoColores'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'lateralMenu',
  components: { infoColores },
  emits: ['index'],
  setup (props, context) {
    const homeMenu = home
    const adminMenu = admin
    const projectMenu = project
    const aboutMenu = about
    const { currentRoute } = useRouter()
    const changeStatus = (ev) => {
      const element = document.getElementById(ev)
      const children = element.children
      if (element) {
        if (element.classList.contains('open')) {
          element.classList.remove('open')
          element.classList.add('close')
          children.forEach(item => {
            if (item.classList) {
              if (item.classList.contains('el-icon-caret-top')) {
                item.classList.add('el-icon-caret-bottom')
                item.classList.remove('el-icon-caret-top')
              }
            }
          })
        } else {
          element.classList.remove('close')
          element.classList.add('open')
          children.forEach(item => {
            if (item.classList) {
              if (item.classList.contains('el-icon-caret-bottom')) {
                item.classList.remove('el-icon-caret-bottom')
                item.classList.add('el-icon-caret-top')
              }
            }
          })
        }
      }
    }
    const selectOption = (item) => {
      context.emit('index', item)
    }
    const optionsMenu = computed(() => {
      switch (currentRoute.value.name) {
        case 'Home':
          return homeMenu.path
        case 'About':
          return aboutMenu.path
        case 'Admin':
          return adminMenu.path
        case 'Projects':
          return projectMenu.path
        default:
          return homeMenu.path
      }
    })
    const active = 'none'
    const handleSelect = () => {
      console.log('')
    }
    return {
      optionsMenu, active, handleSelect, changeStatus, selectOption
    }
  }
}
</script>

<style scoped lang="scss">

</style>
