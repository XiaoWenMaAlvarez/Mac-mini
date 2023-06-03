// Obtengo la sección de pestañas que es donde ocurre
// toda la lógica
const tabSection = document.getElementById("tabs-section")

// Recibe un selector CSS
// Retorna una lista de los elementos HTML que encuentra
const getArrayElements = (selector) => {
  return Array.from(tabSection.querySelectorAll(selector))
}

// Obtengo las descripciones, pestañas e imágenes
const panels = getArrayElements(".panel")
const tabs = getArrayElements(".tab")
const images = getArrayElements(".image-panel")

// Recibe una lista de elementos HTML y un índice
// A todos los elementos les quita la clase "is-active"
// Al elemento que corresponde el índice le agrega "is active".
const changeActiveClass = (elements, index) => {
  elements.map((element) => {
    element.classList.remove("is-active")
  })

  elements[index].classList.add("is-active")
}

// Se activa cuando el usuario hace click
// Si el elemento que recibió el click es una pestaña
// Se muestra el contenido de dicha pestaña
const switchContent = (event) => {
  const element = event.target
  if (!element.classList.contains("tab")) {
    return
  }
  //Obtengo el índice del elemento target
  const index = tabs.indexOf(element)
  //Muestro los nuevos contenidos
  changeActiveClass(tabs, index)
  changeActiveClass(images, index)
  changeActiveClass(panels, index)
  
}

//Localizo la sección de las pestañas y se agrego un Listener
const tabsContainer = document.getElementById("tabs-container")

export const handleActiveTabs = () => {
  tabsContainer.addEventListener("click", switchContent)
}