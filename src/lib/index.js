const getWinHeight = () => (
  window.innerHeight ||
  window.innerHeight ||
  (document.documentElement ||
    document.body)
    .clientHeight
)

const getDocHeight = () => {
  const D = window.top.document
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight,
  )
}

const getScrollTop = () => (
  window.pageYOffset ||
  (document.documentElement ||
    document.body.parentNode ||
    document.body)
    .scrollTop
)

export const isAlmostScrolled = () => {
  const winheight = getWinHeight()
  const docheight = getDocHeight()
  const scrollTop = getScrollTop()
  const trackLength = docheight - winheight
  const pctScrolled = Math.floor((scrollTop / trackLength) * 100)

  return pctScrolled > 60
}

export default isAlmostScrolled()