import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'

let authorizedAxiosInstance = axios.create()
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true)

    return config
  },
  (error) => { return Promise.reject(error) }
)

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    return response
  },
  (error) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message)
    }
  }
)

export default authorizedAxiosInstance