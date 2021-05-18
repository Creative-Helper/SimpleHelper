import { boxShape, classDefine, nodeClassRelation } from './mermaidStyles'
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
const classConnectChildren = (project) => {
  let responseClassChildren = ''
  if (Array.isArray(project)) {
    project.forEach(item => {
      responseClassChildren += nodeClassRelation(item.id, item.type) + ';'
      if (item.children && item.children.length > 0) {
        responseClassChildren += classConnectChildren(item.children)
      }
    })
  } else {
    if (project.id && project.type) {
      responseClassChildren = nodeClassRelation(project.id, project.type)
    }
  }
  return responseClassChildren
}

const classConnect = (project) => {
  const defineClassNoChildren = classDefine('simple', 'fill:#40fbff,color:#008b8b,stroke:#008b8b,stroke-width:2px;')
  const defineClassChildren = classDefine('close', 'fill:#bbf,color:#8b0000,stroke:#8b0000,stroke-width:2px;')
  let responseClass = ''
  project.forEach(item => {
    responseClass += nodeClassRelation(item.id, item.type) + ';'
    if (item.children && item.children.length > 0) {
      responseClass += classConnectChildren(item.children)
    }
  })
  return defineClassChildren + defineClassNoChildren + responseClass
}

const projectToGraph = (project) => {
  const firstParent = { id: 0, title: 'root' }
  return 'graph LR;' + descendToGraph(firstParent, project) + classConnect(project)
}

export default projectToGraph
