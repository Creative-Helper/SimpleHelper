export const noshape = (node) => node

export const boxShape = (node, text) => `${node}[${text}]`

export const boxShapeRound = (node, text) => `${node}(${text})`

export const subroutinesShape = (node, text) => `${node}[[${text}]]`

export const cylindricalShape = (node, text) => `${node}[(${text})]`

export const circleShape = (node, text) => `${node}((${text}))`

export const asymmetricShape = (node, text) => `${node}>${text}]`

export const rhombusShape = (node, text) => `${node}{${text}}`

export const hexagonShape = (node, text) => `${node}{{${text}}}`

export const parallelogramShape = (node, text) => `${node}[/${text}/]`

export const parallelogramShapeAlt = (node, text) => `${node}[\\${text}\\]`

export const trapezoidShape = (node, text) => `${node}[/${text}\\]`

export const trapezoidShapeAlt = (node, text) => `${node}[\\${text}/]`

export const styleShape = (node, text, callback) => callback(node, text)

export const classDefine = (name, style) => `classDef ${name} ${style}`

export const nodeClassRelation = (nodeName, className) => `class ${nodeName} ${className}`
