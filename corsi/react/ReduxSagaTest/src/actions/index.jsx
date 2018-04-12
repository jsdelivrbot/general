const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

/**
 * This method will map action with all saga statement
 * in an object with associated statement
 * ex: base = USER
 * {
 *    REQUEST: REQUEST_USER,
 *    SUCCESS: SUCCESS_USER,
 *    FAILURE: FAILURE_USER
 * }
 *
 * @param {string} base string with the action name
 */

/*
function createRequestTypes (base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const USER = createRequestTypes('USER')

function action (type, payload = {}) {
  return {type, ...payload}
}

export const user = {
  request: login => action(USER[REQUEST], {login}),
  success: (login, response) => action(USER[SUCCESS], {login, response}),
  failure: (login, error) => action(USER[FAILURE], {login, error})
} */

export const REQUEST_API_DATA = "REQUEST_API_DATA"
export const RECEIVE_API_DATA = "RECEIVE_API_DATA"

export const requestApiData = () => ({ type: REQUEST_API_DATA })
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data })
