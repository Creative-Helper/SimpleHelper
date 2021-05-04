<template>
  <div>
    <svg class="d3-tree-vi width-100-percent container-border" id="graphtree" />
  </div>
</template>
<script>
import * as d3 from 'd3'
import { ref, reactive, onMounted, watch } from 'vue'
export default {
  name: 'demo',
  props: {
    treeData: {
      type: Array,
      require: false,
      default: () => { return [] }
    }
  },
  setup (props) {
    const margin = ref(reactive({ top: 20, right: 90, bottom: 30, left: 90 }))
    const duration = ref(250)
    const clientWidth = ref(0)
    const width = ref(0)
    const dy = ref(0)
    const dx = ref(0)
    const data = ref(reactive({
      name: 'root',
      value: 1,
      children: []
    }))
    const reinitGraph = () => {
      const elementFather = document.getElementById('graphtree')
      if (elementFather.hasChildNodes()) {
        while (elementFather.firstChild) {
          elementFather.removeChild(elementFather.firstChild)
        }
      }
    }
    const init = () => {
      const root = d3.hierarchy(data.value)
      root.x0 = 0
      root.y0 = 0
      root.descendants().forEach((d, i) => {
        d.id = i
        d._children = d.children
        if (d.depth && d.data.name.length !== 4) d.children = null
      })
      clientWidth.value = document.body.clientWidth
      width.value = Math.floor(clientWidth.value * 0.6)
      dy.value = width.value / 4
      dx.value = 30
      const tree = d3.tree().nodeSize([dx.value, dy.value])
      const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
      const svg = d3
        .select('svg.d3-tree-vi')
        .attr('viewBox', [-margin.value.left, -margin.value.top, width.value, dx.value])
      const gLink = svg.append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)
      const gNode = svg.append('g')
        .attr('cursor', 'pointer')
        .attr('pointer-events', 'all')
      const zoomActions = ({ transform }) => {
        gNode.attr('transform', transform)
        gLink.attr('transform', transform)
      }
      const zoomHandler = d3.zoom().on('zoom', zoomActions).scaleExtent([1 / 2, 8])
      const update = (event, source) => {
        const nodes = root.descendants().reverse()
        const links = root.links()
        tree(root)
        let left = root
        let right = root
        root.eachBefore(node => {
          if (node.x < left.x) left = node
          if (node.x > right.x) right = node
        })
        const height = right.x - left.x + margin.value.top + margin.value.bottom
        const transition = svg.transition()
          .duration(duration.value)
          .attr('viewBox', [-margin.value.left, left.x - margin.value.top, width.value, height])
          .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'))
        const node = gNode.selectAll('g')
          .data(nodes, d => d.id)
        const nodeEnter = node.enter().append('g')
          .attr('transform', () => `translate(${source.y0},${source.x0})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .on('click', (event, d) => {
            d.children = d.children ? null : d._children
            update(event, d)
          })
        nodeEnter.append('circle')
          .attr('r', 8)
          .attr('fill', d => d._children ? '#008b8b' : '#8b0000')
          .attr('stroke-width', 2)
          .attr('stroke', '#000')
        nodeEnter.append('text')
          .attr('dy', '0.31em')
          .attr('x', d => d._children ? -14 : 14)
          .attr('text-anchor', d => d._children ? 'end' : 'start')
          .text(d => d.data.name)
          .clone(true).lower()
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 0)
          .attr('stroke', 'white')
        const nodeUpdate = node.merge(nodeEnter).transition(transition)
          .attr('transform', d => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1)
        const nodeExit = node.exit().transition(transition).remove()
          .attr('transform', () => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
        const link = gLink.selectAll('path')
          .data(links, d => d.target.id)
        const linkEnter = link.enter().append('path')
          .attr('d', () => {
            const o = { x: source.x0, y: source.y0 }
            return diagonal({ source: o, target: o })
          })
        link.merge(linkEnter).transition(transition)
          .attr('d', diagonal)
        link.exit().transition(transition).remove()
          .attr('d', () => {
            const o = { x: source.x, y: source.y }
            return diagonal({ source: o, target: o })
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
      reinitGraph()
      data.value.children = props.treeData
      init()
    }
    watch(() => props.treeData, current => {
      reinitGraph()
      data.value.children = current
      init()
    })
    onMounted(() => {
      reinitGraph()
      data.value.children = props.treeData
      init()
    })
    return { forceUpdate, data }
  }
}
</script>
<style scoped>
.width-100-percent {
  width: 100%;
  height: 100vh;
}
</style>
