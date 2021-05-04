import UUIDGenerate from './UUIDGenerate'

const addWeightToRelation = (vector, parent) => {
  return vector.map(item => {
    if (item.children && item.children.length > 0) {
      item.children = addWeightToRelation(item.children, item.id)
    }
    return {
      ...item,
      weight: 2,
      parent: parent
    }
  })
}

const relationNodeToGraph = (relation) => {
  const rootId = UUIDGenerate()
  const root = [
    {
      name: 'root',
      description: 'node root',
      id: rootId,
      weight: 2,
      children: addWeightToRelation(relation, rootId)
    }
  ]
  return root
}

export default relationNodeToGraph
