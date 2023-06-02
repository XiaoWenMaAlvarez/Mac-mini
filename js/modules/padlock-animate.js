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

export const securityPanelScroll = () => {
  addEventListener("scroll", handleOpenPadlockWithScroll)
}

