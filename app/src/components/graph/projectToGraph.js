import { boxShape } from './mermaidStyles'
import mermaidConnect from './mermaidConnect'

const arrowConnect = mermaidConnect()

const descendToGraph = (parent, elements) => {
  let stringReturn = ''
  if (elements) {
    if (Array.isArray(elements)) {
      elements.forEach(item => {
        stringReturn += descendToGraph(parent, item)
      })
    } else {
      if (elements.children) {
        stringReturn += descendToGraph(elements, elements.children)
      }
      stringReturn += boxShape(parent.id, parent.title) + arrowConnect + boxShape(elements.id, elements.title) + ';'
    }
  }
  return stringReturn
}

const projectToGraph = (project) => {
  const firstParent = { id: 0, title: 'root' }
  return 'graph LR;' + descendToGraph(firstParent, project)
}

export default projectToGraph
