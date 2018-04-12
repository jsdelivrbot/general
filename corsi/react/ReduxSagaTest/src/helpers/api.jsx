import axios from 'axios'

const axiosInstace = axios.create({
  baseUrl: 'https://randomuser.me/api',
  headers: { 'X-Custom-Header': 'foobar' }
})

class Api {
  static call (entrypoint, data = {}, params = {}, method = 'get') {
    console.log(axios)

    return axiosInstace.request({

      // `method` is the request method to be used when making the request
      method: method,

      // `url` is automatically prepend with baseUrl set during instanciate
      url: entrypoint,

      // `data` is the data to be sent as the request body
      // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
      data: data,

      // `params` are the URL parameters to be sent with the request
      // Must be a plain object or a URLSearchParams object
      params: params,

      // `headers` are custom headers to be sent
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then(function(response) {
      console.log(response)
    })
  }

  static get (entrypoint, data = {}, params = {}) {
    return Api.call(entrypoint, data, params, 'get')
  }

  static post (entrypoint, data = {}, params = {}) {
    return Api.call(entrypoint, data, params, 'post')
  }

  static patch (entrypoint, data = {}, params = {}) {
    return Api.call(entrypoint, data, params, 'patch')
  }

  static put (entrypoint, data = {}, params = {}) {
    return Api.call(entrypoint, data, params, 'put')
  }

  static delete (entrypoint, data = {}, params = {}) {
    return Api.call(entrypoint, data, params, 'delete')
  }

  static options (entrypoint, data = {}, params = {}) {
    return Api.call(entrypoint, data, params, 'options')
  }

  static head (entrypoint, data = {}, params = {}) {
    return Api.call(entrypoint, data, params, 'head')
  }
}

export default Api
