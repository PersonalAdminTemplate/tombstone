import cookie from 'js-cookie'
const currentAuth = cookie.get('userInfo')
  ? JSON.parse(cookie.get('userInfo'))
  : {}
export { currentAuth }

export function getCurrentAuthority() {
  const roleId = cookie.get('roleId')
  const currentAuth = roleId === '1' ? ['admin'] : ['user']
  return currentAuth
}

export function check(authority) {
  const current = getCurrentAuthority()
  return current.some(item => authority.includes(item))
}

export function isLogin() {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}
