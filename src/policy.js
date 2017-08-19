import moment from 'moment'

const day3 = 3 * 24 * 60 * 60 * 1000
const year1 = 365 * 24 * 60 * 60 * 1000

export const printTime = (time) => {
  const now = moment()
  const past = moment(time)
  return now - past < day3 ?  // 최근 3일
    past.locale('ko').fromNow() :
    now - past < year1 ? // 최근 1년
    past.locale('ko').format('MMMM DD일 a h시 mm분') :
    past.locale('ko').format('MMMM DD일 a h시 mm분') // 1년 초과 됨
}
