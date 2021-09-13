import moment from 'moment'
import 'moment/locale/ko'

const getWinHeight = () => (
  window.innerHeight
  || (document.documentElement || document.body).clientHeight
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
  const winHeight = getWinHeight()
  const docHeight = getDocHeight()
  const scrollTop = getScrollTop()
  const trackLength = docHeight - winHeight
  const pctScrolled = Math.floor((scrollTop / trackLength) * 100)

  return pctScrolled > 80
}

/* 중복되는 인자는 b쪽에 맞춰짐 */
// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export const mergeObject = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} });
        mergeObject(target[key], source[key]);
      }
      else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeObject(target, ...sources);
}

// https://stackoverflow.com/questions/5559425/isnullorwhitespace-in-javascript
export const isSpace = (text) => (
  text.replace(/\s/g, '').length < 1
)

export const isPermittedBirthdate = (date) => {
  const max_birthdate = moment().subtract(120, 'years')
  const min_birthdate = moment()

  return date
    && date.isBefore(max_birthdate)
    && date.isAfter(min_birthdate)
}

export const isHyphenPosition = (phoneNumber) => (phoneNumber.length == 4 || phoneNumber.length == 9)

export const isKoreanOnly = (name) => /[^가-힣\s]/.test(name)

export const isValidEmail = (email) => /^(?!.*^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/.test(email)

export const isValidPhoneNumber = (phoneNumber) => /^(?!.*^\d{3}[-]+\d{4}[-]+\d{4}$)/.test(phoneNumber)

export const isValidPhoneNumberOnTyping = (phoneNumber) => /(?![0-9-]{0,13}$)/.test(phoneNumber)

export const isValidStudentNumber = (studentNumber) => /^(?!.*^[12][0-9]{3}\d{6}$)/.test(studentNumber)

export const getDate2WeeksAgo = () => moment().subtract(2, 'weeks').format('YYYY-MM-DD')

const day3 = 3 * 24 * 60 * 60 * 1000
const year1 = 365 * 24 * 60 * 60 * 1000

export const printTime = (time) => {
  const now = moment()
  const past = moment(time)

  if (now - past < day3) { // 최근 3일
    return past.locale('ko').fromNow()
  } if (now - past < year1) { // 최근1년
    return past.locale('ko').format('MMMM DD일 a h시 mm분')
  }
  return past.locale('ko').format('MMMM DD일 a h시 mm분')
}

export const isRegularMember = (account) => {
  if (account.role === 'superuser')     return true
  if (account.role === 'manager')       return true
  if (account.role === 'board manager') return true
  if (account.role === 'regular')       return true
  return false
}

export const isEmptyObject = (param) => {
  return Object.keys(param).length === 0 && param.constructor === Object;
}