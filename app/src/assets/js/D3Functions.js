import * as d3 from 'd3'

export const renoveGraph = (id) => {
  const elementFather = document.getElementById(id)
  if (elementFather.hasChildNodes()) {
    while (elementFather.firstChild) {
      elementFather.removeChild(elementFather.firstChild)
    }
  }
}

export const createRoot = (data) => {
  const root = d3.hierarchy(data)
  root.x0 = 0
  root.y0 = 0
  root.descendants().forEach((d, i) => {
    d.id = i
    d._children = d.children
    if (d.depth && d.data.name.length !== 4) d.children = null
  })
  return root
}

export const createText = (node) => {
  node.append('text')
    .attr('class', 'text-graph')
    .attr('dy', '0.31em')
    .attr('x', d => d._children ? -14 : 14)
    .attr('text-anchor', d => d._children ? 'end' : 'start')
    .text(d => d.data.name)
    .clone(true).lower()
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 0)
    .attr('stroke', 'white')
  return node
}

export const createCircle = (node) => {
  node.append('circle')
    .attr('r', 8)
    .attr('fill', d => d._children ? '#008b8b' : d.data.type === 'simple' ? '#f28585' : '#8b0000')
    .attr('stroke-width', 2)
    .attr('stroke', '#000')
  return node
}

export const createLink = (svg) => {
  return svg.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
}

export const createNode = (svg) => {
  return svg.append('g')
    .attr('cursor', 'pointer')
    .attr('pointer-events', 'all')
}
