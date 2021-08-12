import moment from 'moment'

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

export const beforeUpload = (file) => {
  const isImage = file.type === 'image/gif'
                  || file.type === 'image/png'
                  || file.type === 'image/jpeg'
                  || file.type === 'image/bmp'
                  || file.type === 'image/webp';
  if (!isImage) {
    message.error('이미지만 업로드 해주세요!');
    return false;
  }
  const isOver10MB = (10 * 1024 * 1024) < file.size;
  if (isOver10MB) {
    message.error('10MB 넘으면 안 돼요!');
    return false;
  }
  return true;
}

export const isPermittedBirthdate = (date) => {
  const max_birthdate = moment().subtract(120, 'years')
  const min_birthdate = moment()

  return date
    && date.isBefore(max_birthdate)
    && date.isAfter(min_birthdate)
}

export const isKoreanOnly = (name) => /[^가-힣\s]/.test(name)

export const isValidStudentNumber = (studentNumber) => /^(?!.*^[12][0-9]{3}\d{6}$)/.test(studentNumber)

export const isValidEmail = (email) => /^(?!.*^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/.test(email)

export const isValidPhoneNumber = (phoneNumber) => /^(?!.*^\d{3}[-]+\d{4}[-]+\d{4}$)/.test(phoneNumber)

export const isHyphenPosition = (phoneNumber) => (phoneNumber.length == 4 || phoneNumber.length == 9)