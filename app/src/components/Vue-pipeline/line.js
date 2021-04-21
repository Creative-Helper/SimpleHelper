export class EdgeService {
  constructor (xStep, yStep) {
    this.xStep = xStep
    this.yStep = yStep
  }

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  drawEdge (start, end) {}

  drawVerticalEdge (start, end) {
    const radius = 14
    return `M ${start.x},${start.y + radius} L${start.x},${start.y + radius} ${end.x},${
      end.y - radius
    }`
  }

  drawHEdge (start, end) {
    if (end.x > start.x + this.xStep) {
      if (!start) {
        // console.log(start, end);
      }
      // let start = start.x + 10;
      const number = (end.x - start.x) / this.xStep

      const control1 = this.xStep / 2 + 40
      const control2 = this.xStep / 2 + 30

      let d = `M ${start.x + 10} ${start.y} \
              l 20 0\
             C ${start.x + control1},${start.y} \
              ${start.x + control2},${start.y + 30} \
               ${start.x + this.xStep},${start.y + 30}`
      if (number > 2) {
        d += `l ${this.xStep * (number - 2)} 0`
      }

      d += `C ${end.x - control2},${start.y + 30} \
          ${end.x - control1},${start.y} \
          ${end.x - 10 - 20},${end.y} \
          l 20 0`

      return d
    }
    return this.getStraightLinePath(start, end)
  }

  /**
   * 生成直线的指令
   * @param {*} start
   * @param {*} end
   */
  getStraightLinePath (start, end) {
    return `M ${start.x + 12},${start.y} L${start.x + 12},${start.y} ${
      end.x - 15
    },${end.y}`
  }

  static getDrawEdgeService (lineStyle, step) {
    switch (lineStyle) {
      case 'default':
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new DefaultStyleService(step.x, step.y)
      case 'bessel':
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new BesselStyleService(step.x, step.y)
      case 'line':
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new LineStyleService(step.x, step.y)
      default:
        break
    }
  }
}

class DefaultStyleService extends EdgeService {
  // eslint-disable-next-line no-useless-constructor
  constructor (xStep, yStep) {
    super(xStep, yStep)
  }

  drawEdge (start, end) {
    if (start.y === end.y) {
      return this.drawHEdge(start, end)
    }
    if (start.x === end.x) {
      return this.drawVerticalEdge(start, end)
    }
    const lb = 'c 0 12 12 12 12 12'
    const rb = 'c 12 0 12 -12 12 -12'
    const rt = 'c 12 0 12 12 12 12'
    const lt = 'c 0 -12 12 -12 12 -12'
    const midy = Math.abs(end.y - start.y)
    if (end.y > start.y) {
      // 左上到右下
      const firstCorner = end.x - start.x - 50
      return `M ${start.x + 10} ${start.y}\
                l ${20} 0\
                ${rt} \
                l 0 ${midy - 24} \
                ${lb} \
                l ${firstCorner - 20} 0
            `
    } else {
      const lastCorner = end.x - start.x - 50
      return `M ${start.x + 14} ${start.y}\
        l ${lastCorner - 20} 0\
        ${rb} \
        l 0 -${midy - 24} \
        ${lt} \
        l ${20} 0
        `
    }
  }
}

class BesselStyleService extends EdgeService {
  drawEdge (start, end) {
    if (start.y === end.y) {
      return this.drawHEdge(start, end)
    }
    if (start.x === end.x) {
      return this.drawVerticalEdge(start, end)
    }

    if (end.y > start.y) {
      return `M ${start.x + 12},${start.y}\
            C ${end.x},${start.y}\
            ${start.x + 50},${end.y}\
            ${end.x - 15},${end.y}
            `
    }
    return `M ${start.x},${start.y}\
            C ${end.x - 50},${start.y}\
            ${start.x},${end.y}\
            ${end.x - 12},${end.y}
            `
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LineStyleService extends EdgeService {
  drawEdge (start, end) {
    if (start.y === end.y) {
      return this.drawHEdge(start, end)
    }
    return this.getStraightLinePath(start, end)
  }
}
