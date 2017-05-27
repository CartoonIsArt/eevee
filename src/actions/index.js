const SET_SUN = "SETSUN"
const TOGGLE_SUN = "TOGGLESUN"

const setSun = sun => ({type: SET_SUN, sun})
const toggleSun = () => ({type: TOGGLE_SUN, false})

export const sunrise = () => dispatch => {
  dispatch(setSun(true))
}
export const sundown = () => dispatch => {
  dispatch(setSun(false))
}
export const suntoggle = () => dispatch => {
  dispatch(toggleSun())
}
