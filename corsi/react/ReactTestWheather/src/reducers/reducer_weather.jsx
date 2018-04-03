import { FETCH_WEATHER } from '../actions/index'

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      // return state.concat([action.payload.data])
      return [ action.payload.data, ...state ] // do not use .push (because we must create a new state array, do not manipulate the original state)
  }

  return state
}
