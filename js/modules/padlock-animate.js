const padlockElement = document.getElementById("padlock")

const getInitialData = (steps, range, element) => {
  const start = element.getBoundingClientRect().top + scrollY - (innerHeight * 0.66)
  const end = start + range
  const unit = (end - start) / steps
  return {start, end, steps, unit}
}

const padlockData = getInitialData(72, 350, padlockElement)

const getCurrentStep = ({start, end, steps, unit}) => {
  let currentStep
  if(scrollY >= start && scrollY <= end) {
    currentStep =  Math.ceil((scrollY - start) / unit)
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

// Desencriptación  

const dataTextElement = document.getElementById("masked-data-text")
const keyTextElement = document.getElementById("masked-data-key")
const messageElement = document.getElementById("message")

const dataTextData = getInitialData(dataTextElement.innerText.length, 150, messageElement)
const keyTextData = getInitialData(keyTextElement.innerText.length, 150, messageElement)

const handleChangeTextWithScroll = (data, element, steps) => {
  const currentStep = getCurrentStep(data)
  const partialText = element.dataset.text.substring(0, currentStep)
  const partialDots = '·'.repeat(steps - currentStep)
  element.innerText = partialText + partialDots
}

export const securityPanelScroll = () => {
  addEventListener("scroll", () => {
    handleOpenPadlockWithScroll()
    handleChangeTextWithScroll(dataTextData, dataTextElement, dataTextElement.innerText.length)
    handleChangeTextWithScroll(keyTextData, keyTextElement, keyTextElement.innerText.length)
  })
}