/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// BASE COMPONENTS
import VuePipeline from './Pipeline.vue'

/**************************************************************************
 * ENVIRONMENT CONFIGURATIONS
 ***************************************************************************/

/*
function install(Vue, options) {
  if (install.installed) {
    return
  } else {
    install.installed = true
  }

  // Declare the component
  Vue.component("vue-pipeline", VuePipeline)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// To auto-install when vue is found

let GlobalVue = null

if (typeof window !== "undefined") {
  GlobalVue = window.Vue
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

// Default export is library as a whole, registered via Vue.use()
export default plugin */

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install: (app, options) => {
    app.component('vue-pipeline', VuePipeline)
  }
}
