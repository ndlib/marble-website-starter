import typy from 'typy'
import { STATUS_LOGGED_IN } from 'store/actions/loginActions'

const isBrowser = typeof window !== `undefined`

export const isLoggedIn = (loginReducer) => {
  if (!isBrowser) return false
  return (loginReducer.status === STATUS_LOGGED_IN)
}

export const ownsPage = (loginReducer, userId) => {
  console.log(loginReducer, userId)
  return isLoggedIn(loginReducer) && typy(loginReducer, 'user.portfolioUserId').safeString === userId
}

// TODO REMOVE :::
export const userIdFromClaims = (claims) => {
  if (claims.sub && claims.iss) {
    return `${claims.sub}.${btoa(claims.iss)}`
  }
  return null
}
