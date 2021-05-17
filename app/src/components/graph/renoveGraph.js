const renoveGraph = (id) => {
  const elementFather = document.getElementById(id)
  if (elementFather.hasChildNodes()) {
    while (elementFather.firstChild) {
      elementFather.removeChild(elementFather.firstChild)
    }
  }
}

export default renoveGraph
