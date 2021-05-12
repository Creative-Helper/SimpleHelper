const mermaidConnect = (type = 'normal', arrow = 'simple', size = 'normal', text = null) => {
  const localType = ['normal', 'dottes', 'tick'].includes(type.toLowerCase()) ? type.toLowerCase() : 'normal'
  const localArrow = ['simple', 'multiple', ''].includes(arrow.toLowerCase()) ? arrow.toLowerCase() : 'simple'
  const localSize = ['normal', 'large', 'extra-large'].includes(size.toLowerCase()) ? size.toLowerCase() : 'normal'
  let arrowStyle = ''
  switch (localType) {
    case 'normal':
      arrowStyle = '-'
      break
    case 'dottes':
      arrowStyle = '.'
      break
    case 'tick':
      arrowStyle = '='
      break
    default:
      arrowStyle = '-'
  }
  let arrowResult = arrowStyle
  if (text) {
    if (localType === 'tick') {
      arrowResult += text + arrowStyle
    } else {
      arrowResult = '-' + arrowResult + text + arrowResult + '-'
    }
  }
  if (localSize !== 'normal') {
    let sizeRepeat = 0
    if (localSize === 'large') {
      sizeRepeat = 2
    } else {
      sizeRepeat = 3
    }
    if (localType === 'tick') {
      arrowResult = '='.repeat(sizeRepeat) + arrowResult + '='.repeat(sizeRepeat)
    } else {
      arrowResult = '-'.repeat(sizeRepeat) + arrowResult + '-'.repeat(sizeRepeat)
    }
  } else {
    if (localType === 'tick') {
      arrowResult = '=' + arrowResult + '='
    } else {
      arrowResult = '-' + arrowResult + '-'
    }
  }
  if (localArrow) {
    if (localArrow === 'simple') {
      arrowResult += '>'
    } else {
      arrowResult = '<' + arrowResult + '>'
    }
  }
  return arrowResult
}

export default mermaidConnect
