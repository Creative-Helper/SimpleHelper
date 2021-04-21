/* eslint-disable no-console */

// const data = require('./data.js')
import { EdgeService } from './line'

class Pipeline {
  /**
   *
   * @param {Array} nodes
   * @param {Number} startX
   * @param {*} startY
   * @param {*} xStep
   * @param {*} yStep
   * @param {*} lineStyle 线型，目前支持三种线型： default(默认)，line(直线)，bessel(贝塞尔曲线)
   */
  constructor (nodes, startX, startY, xStep, yStep, lineStyle = 'default') {
    this.nodes = nodes
    this.startX = startX
    this.startY = startY
    this.xStep = xStep
    this.yStep = yStep
    this.positionList = new Set()
    this.solvedList = []
    this.lineStyle = lineStyle
    this.sortedList = this.topologicalSorting()
    this.matrix = [] // 存放各个顶点的相对坐标
    for (let i = 0; i < nodes.length; i++) {
      this.matrix[i] = []
    }
    this.width = 0
    this.height = 0
    // console.log(nodes)
  }

  /**
   * 判断当前的图是否是一棵树
   */
  isTree () {
    const set = new Set()
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].next) {
        if (this.nodes[i].next.some((it) => set.has(it.index))) {
          return false
        }
        this.nodes[i].next.forEach((it) => set.add(it.index))
      }
    }
    return true
  }

  /**
   * 计算一个树要占的宽度
   * @param {*} index
   */
  getWidthOfTree (index) {
    const node = this.nodes[index]
    if (!node.next || node.next.length === 0) {
      return 1
    }

    let width = 0
    for (let i = 0; i < node.next.length; i++) {
      width += this.getWidthOfTree(node.next[i].index)
    }
    return width
  }

  /**
   * 为树分配节点的位置
   * @param {*} index
   * @param {*} x
   * @param {*} y
   */
  assignNodeForTree (index, x, y) {
    this.matrix[y][x] = index
    const node = this.nodes[index]
    if (!node.next || node.next.length === 0) {
      return
    }

    const xx = x + 1
    let yy = y

    for (let i = 0; i < node.next.length; i++) {
      const width = this.getWidthOfTree(node.next[i].index)
      this.assignNodeForTree(node.next[i].index, xx, yy)
      yy += width
    }
  }

  getLines () {
    const list = []
    const drawService = EdgeService.getDrawEdgeService(this.lineStyle, {
      x: this.xStep,
      y: this.yStep
    })
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      if (!node.next) {
        continue
      }
      for (let j = 0; j < node.next.length; j++) {
        const edge = node.next[j]
        const child = this.nodes[edge.index]
        list.push({
          path: drawService.drawEdge(node, child),
          weight: edge.weight
        })
      }
    }
    list.sort((a, b) => a.weight - b.weight)
    return list
  }

  getPositionInMatrix (index) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] === index) {
          return [i, j]
        }
      }
    }
    return []
  }

  /**
   * 计算每个点的坐标
   */
  calculateAllPosition () {
    if (this.isTree()) {
      this.assignNodeForTree(0, 0, 0)
    } else {
      this.assignNodeForGraph()
    }
    this.calCoordinateForMatrix()
  }

  /**
   * 为图的每个节点计算坐标位置
   */
  assignNodeForGraph () {
    // 查找最长的路径，并为其分配坐标
    const list = this.findLongestWay(0)
    list.forEach((it, index) => {
      this.matrix[0][index] = it
      this.solvedList[it] = true
    })

    for (let i = 0; i < this.sortedList.length; i++) {
      const sIndex = this.sortedList[i]
      if (!this.solvedList[sIndex]) {
        const fatherIndex = this.findSolvedFather(sIndex)
        console.log('fatherIndex: ', fatherIndex)
        const [y, x] = this.getPositionInMatrix(fatherIndex) // 找到父节点在矩阵中的坐标
        const list = this.findLongestWay(sIndex)
        let startX = x + 1

        let startY = y
        while (this.matrix[startY][startX]) {
          startY++
        }
        // starty-=1;
        list.forEach((it) => {
          this.matrix[startY][startX++] = it
          this.solvedList[it] = true
        })
      }
    }
  }

  calCoordinateForMatrix () {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        const index = this.matrix[i][j]
        if (index !== undefined) {
          this.nodes[index].x = this.startX + this.xStep * j
          this.nodes[index].y = this.startY + this.yStep * i
          this.width = Math.max(this.width, this.nodes[index].x + this.startX)
          this.height = Math.max(
            this.height,
            this.nodes[index].y + this.startY
          )
        }
      }
    }
  }

  /**
   * 优化节点的位置,使其在x轴上左右居中,线的处理上还有bug
   */
  optimize () {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      if (node.y === this.startY) {
        continue
      }
      const parents = this.findParents(i)
      const children = this.findChildren(i)
      const startX = Math.max(...parents.map((item) => this.nodes[item].x))
      const endX = Math.min(...children.map((item) => this.nodes[item].x))
      node.x = (startX + endX) / 2
      this.nodes[i] = node
    }
  }

  /**
   * 图的拓扑排序
   */
  topologicalSorting () {
    const visited = []
    const result = []
    for (let i = 0; i < this.nodes.length; i++) {
      if (visited[i] === true) {
        continue
      }
      const list = this.findParents(i)
      if (list.length === 0 || list.every((it) => visited[it] === true)) {
        visited[i] = true
        result.push(i)
        i = 0
      }
    }
    return result
  }

  /**
   * 判断是否有环
   * 如果有环，返回true
   */
  hasCircle () {
    const list = this.topologicalSorting()
    return list.length < this.nodes.length
  }

  /**
   * 往前找到第一个解决的父节点
   * @param {*} index
   */
  findSolvedFather (index) {
    const list = this.findParents(index)
    if (list.length === 0) {
      return null
    }
    // list.forEach(item => this.solvedList[item] ? item : this.findSolvedFather(item))
    return this.solvedList[list[0]] ? list[0] : this.findSolvedFather(list[0])
  }

  /**
   * 查找某个顶点的父顶点
   * @param {*} index
   */
  findParents (index) {
    const arr = []
    for (let i = 0; i < this.nodes.length; i++) {
      if (
        this.nodes[i].next &&
        this.nodes[i].next.some((it) => it.index === index)
      ) {
        arr.push(i)
      }
    }
    return arr
  }

  findChildren (index) {
    if (!this.nodes[index].next) {
      return []
    }
    return this.nodes[index].next.map((it) => it.index)
  }

  /**
   * 查找从第{index}个节点开始的最长路径，返回经过的未被计算位置的节点,
   * @param {*} index
   */
  findLongestWay (index) {
    const children = this.findChildren(index)
    if (children.length === 0) {
      return [index]
    }
    let arr = []
    let maxLength = 0
    for (let i = 0; i < children.length; i++) {
      if (this.solvedList[children[i]]) {
        continue
      }
      const list = this.findLongestWay(children[i])
      if (list.length > maxLength) {
        maxLength = list.length
        arr = list.slice()
      }
    }
    return [index].concat(arr)
  }

  /**
   * 从第{index}个节点出发，深度优先搜索图
   * @param {*} index
   */
  dfs (index) {
    const queue = []
    const visited = []
    const result = []
    visited[index] = true
    queue.push(index)

    while (queue.length > 0) {
      const first = queue.pop()
      visited[first] = true
      result.push(first)
      const children = this.findChildren(first)
      for (let i = 0; i < children.length; i++) {
        const j = children[i]
        if (!visited[j]) {
          queue.push(j)
          visited[j] = true
        }
      }
    }
    return result
  }
}

export { Pipeline }
