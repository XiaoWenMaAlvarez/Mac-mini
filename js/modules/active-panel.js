const speedPanel = document.getElementById("feature-panel-speed")
const activeClass = "is-active"

const options = {
  threshold: 0.8,
  rootMargin: "64px"
}

const callBackForObserver = (entries) => {
  const panelInformation = entries[0]
  const panelElement = panelInformation.target
  if (!panelElement || panelElement.classList.contains(activeClass) || panelInformation.isIntersecting === false) {
    return
  }
  panelElement.classList.add(activeClass)
}

const PanelObserver = new IntersectionObserver(callBackForObserver, options)

export const activePanel = () => {
  PanelObserver.observe(speedPanel)
}

