<template>
  <el-tooltip placement="left-start">
    <template #content>
      <span class="message">Title: <span class="remark">{{ data.title }}</span></span><br>
      <span class="message">Descripcion: <span class="remark">{{ data.description }}</span></span>
    </template>
    <div class="custom-tree-node">
                  <span :class="data.type">
                    {{ data.title }}
                    <i class="el-icon-circle-plus-outline" v-if="data.type==='simple'"></i>
                    <i class="el-icon-circle-check" v-else></i>
                  </span>
                </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'treeItem',
  props: {
    data: {
      type: Object,
      require: false,
      default: () => {
        return {
          title: '',
          description: '',
          type: ''
        }
      }
    }
  }
}
</script>

<style>
.custom-tree-node {
  /* flex: 1;
  display: flex; */
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
  padding-right: 8px;
}

.simple {
  color: darkcyan;
}

.close {
  color: darkred;
}

.remark {
  font-weight: bold;
}

.message {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* letter-spacing: .1em; */
}

.el-tree-node__content {
  min-height: 40px;
  /* border: 1px solid #000000;
  display: flex;
  align-items: center; */
}
</style>
