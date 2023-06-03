const getInitialData = (steps, range, element) => {
  const start = element.getBoundingClientRect().top + scrollY - (innerHeight * 0.66)
  const end = start + range
  const unit = (end - start) / steps
  return { start, end, steps, unit }
}

const padlockElement = document.getElementById("padlock")
const dataTextElement = document.getElementById("masked-data-text")
const keyTextElement = document.getElementById("masked-data-key")
const messageElement = document.getElementById("message")
let padlockData, dataTextData, keyTextData

const setInitialData = () => {
  padlockData = getInitialData(72, 350, padlockElement)
  dataTextData = getInitialData(dataTextElement.innerText.length, 150, messageElement)
  keyTextData = getInitialData(keyTextElement.innerText.length, 150, messageElement)
}

setInitialData()
addEventListener("resize", setInitialData)

const getCurrentStep = ({ start, end, steps, unit }) => {
  let currentStep
  if (scrollY >= start && scrollY <= end) {
    currentStep = Math.ceil((scrollY - start) / unit)
  } else if (scrollY > end) {
    currentStep = steps
  } else if (scrollY < start) {
    currentStep = 0
  }
  return currentStep
}

const handleOpenPadlockWithScroll = () => {
  padlockElement.style.animationDelay = `-${getCurrentStep(padlockData)}s`
}

const handleChangeTextWithScroll = (data, element) => {
  const steps = element.innerText.length
  const currentStep = getCurrentStep(data)
  const partialText = element.dataset.text.substring(0, currentStep)
  const partialDots = '·'.repeat(steps - currentStep)
  element.innerText = partialText + partialDots
}

const functionsForScroll = () => {
  handleOpenPadlockWithScroll()
  handleChangeTextWithScroll(dataTextData, dataTextElement)
  handleChangeTextWithScroll(keyTextData, keyTextElement)
}

const securityObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    addEventListener("scroll", functionsForScroll)
  } else {
    removeEventListener("scroll", functionsForScroll)
  }
})

const panelSecurity = document.getElementById("feature-panel-security")

export const securityPanelScroll = () => {
  securityObserver.observe(panelSecurity)
}