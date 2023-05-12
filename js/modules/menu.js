// Obtener elementos del DOM
const menuButton = document.getElementById("menu-button")
const mainHeader = document.getElementById("main-header")
const overlay = document.getElementById("main-overlay")

const activeClass = "is-active"

//Abrir el menú
const toggleMenu = () => mainHeader.classList.toggle(activeClass)

//Cerrar el menú cuando se pulsa fuera del menú
const closeMenu = () => mainHeader.classList.remove(activeClass)

//Cerrar el menú cuando el usuario a pulsado una de las opciones
const closeMenuWhenClickLink = (event) => {
  if(event.target.tagName === "A") {
    closeMenu()
  }
}

//Agregar o remover los listener dependiendo del tamaño de pantalla
const isTablet = matchMedia("(min-width: 734px)")

export const handleActiveMenu = () => {
  if (isTablet.matches) {
    menuButton.removeEventListener("click", toggleMenu)
    overlay.removeEventListener("click", closeMenu)
    mainHeader.removeEventListener("click", closeMenuWhenClickLink)
  } else {
    menuButton.addEventListener("click", toggleMenu)
    overlay.addEventListener("click", closeMenu)
    mainHeader.addEventListener("click", closeMenuWhenClickLink)

  }
}
