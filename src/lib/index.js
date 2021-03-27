const getWinHeight = () => (
  window.innerHeight
  || window.innerHeight
  || (document.documentElement
    || document.body)
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
  window.pageYOffset
  || (document.documentElement
    || document.body.parentNode
    || document.body)
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

/* 중복되는 인자는 b쪽에 맞춰짐 */
export const mergeObject = (a, b) => (
  { ...a, ...b }
)

// https://stackoverflow.com/questions/5559425/isnullorwhitespace-in-javascript
export const isSpace = (text) => (
  text.replace(/\s/g, '').length < 1
)