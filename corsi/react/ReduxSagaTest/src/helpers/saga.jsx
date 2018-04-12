import 'regenerator-runtime/runtime'
import { delay } from 'redux-saga'
import { take, put, call, fork, select, all, takeEvery } from 'redux-saga/effects'
import Api from './api'
import { REQUEST_API_DATA, receiveApiData } from "../actions";

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
/*
function * fetchEntity (entity, apiFn, id, url) {
  console.log('entrato getchEntity')
  yield put(entity.request(id))
  const {response, error} = yield call(apiFn, url || id)
  if (response) {
    yield put(entity.success(id, response))
  } else {
    yield put(entity.failure(id, error))
  }
}

// yeah! we can also bind Generators
export const fetchUser = fetchEntity.bind(null, user, Api.get) */

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function * getApiData (action, data = {}) {
  try {
    // do api call
    const data = yield call(Api.get, '', data)
    yield put(receiveApiData(data))
  } catch (e) {
    console.log(e)
  }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function * rootSaga () {
  yield takeEvery(REQUEST_API_DATA, getApiData)
}
