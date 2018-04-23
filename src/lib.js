/* 중복되는 인자는 b쪽에 맞춰짐 */
export const mergeObject = (a, b) => (
  Object.assign({}, a, b)
)
export default mergeObject()
