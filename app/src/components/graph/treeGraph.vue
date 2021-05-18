<template>
  <div id="content-graphtree">
    <svg class="d3-tree-vi width-100-percent container-border" id="graphtree" />
  </div>
</template>
<script>
import * as d3 from 'd3'
import { ref, reactive, watch } from 'vue'
import { renoveGraph, createRoot, createText, createCircle, createLink, createNode } from '@/assets/js/D3Functions'

export default {
  name: 'treeGraph',
  props: {
    treeData: {
      type: Array,
      require: false,
      default: () => { return [] }
    }
  },
  setup (props) {
    const margin = ref(reactive({ top: 100, right: 90, bottom: 30, left: 90 }))
    const duration = ref(250)
    const clientWidth = ref(0)
    const width = ref(0)
    const dy = ref(0)
    const dx = ref(30)
    const data = ref(reactive({
      name: 'root',
      value: 1,
      children: []
    }))
    const init = () => {
      renoveGraph('graphtree')
      const root = createRoot(data.value)
      const elementHtml = document.getElementById('content-graphtree')
      clientWidth.value = elementHtml.offsetWidth || 1600
      width.value = Math.floor(clientWidth.value * 0.5)
      dy.value = width.value / 4
      const tree = d3.tree().nodeSize([dx.value, dy.value])
      const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
      const svg = d3
        .select('svg.d3-tree-vi')
        .attr('viewBox', [-margin.value.left, -margin.value.top, width.value, dx.value])
      const gLink = createLink(svg)
      const gNode = createNode(svg)
      const zoomActions = ({ transform }) => {
        gNode.attr('transform', transform)
        gLink.attr('transform', transform)
      }
      const zoomHandler = d3.zoom().on('zoom', zoomActions).scaleExtent([1 / 2, 2])
      const update = (event, source) => {
        if (event) {
          console.log('mirando: ', event.target.nodeName)
        }
        console.log('event: ', event)
        const nodes = root.descendants().reverse()
        const links = root.links()
        tree(root)
        let left = root
        let right = root
        root.eachBefore(node => {
          if (node.x < left.x) left = node
          if (node.x > right.x) right = node
        })
        let height = right.x - left.x - margin.value.top + margin.value.bottom
        if (height < 30) height = 30
        const transition = svg.transition()
          .duration(duration.value)
          .attr('viewBox', [-margin.value.left, margin.value.top, width.value, height])
          .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'))
        const node = gNode.selectAll('g')
          .data(nodes, d => d.id)
        let nodeEnter = node.enter().append('g')
          .attr('transform', () => `translate(${source.y0},${source.x0})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .on('click', (event, d) => {
            d.children = d.children ? null : d._children
            update(event, d)
          })
        nodeEnter = createCircle(nodeEnter)
        nodeEnter = createText(nodeEnter)
        node.merge(nodeEnter).transition(transition)
          .attr('transform', d => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1)
        node.exit().transition(transition).remove()
          .attr('transform', () => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)

        const link = gLink.selectAll('path')
          .data(links, d => d.target.id)
        const linkEnter = link.enter().append('path')
          .attr('d', () => {
            const o = {
              x: source.x0,
              y: source.y0
            }
            return diagonal({
              source: o,
              target: o
            })
          })
        link.merge(linkEnter).transition(transition)
          .attr('d', diagonal)
        link.exit().transition(transition).remove()
          .attr('d', () => {
            const o = {
              x: source.x,
              y: source.y
            }
            return diagonal({
              source: o,
              target: o
            })
          })
        root.eachBefore(d => {
          d.x0 = d.x
          d.y0 = d.y
        })
      }
      svg.call(zoomHandler).on('dblclick.zoom', null)
      zoomHandler(svg)
      update(null, root)
    }
    const forceUpdate = () => {
      data.value.children = props.treeData
      init()
    }
    watch(() => props.treeData, () => {
      forceUpdate()
    })

    return { forceUpdate, data }
  }
}
</script>
<style>
.width-100-percent {
  width: 100%;
  height: 100vh;
}
.text-graph {
  font-size: 12px;
}
#content-graphtree, #graphtree {
  width:100%;
}
</style>
