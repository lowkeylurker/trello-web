import axios from 'axios'
import { toast } from 'react-toastify'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { interceptorLoadingElements } from '~/utils/formatters'

let authorizedAxiosInstance = axios.create()
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
authorizedAxiosInstance.defaults.withCredentials = true

/**
 * Không thể import { store } from '~/redux/store' theo cách thông thường ở đây
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như file authorizedAxios hiện tại.
 * Hiểu đơn giản: khi ứng dụng bắt đầu chạy, code chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
 */
let axiosReduxStore
export const injectStore = mainStore => axiosReduxStore = mainStore

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true)

    return config
  },
  (error) => { return Promise.reject(error) }
)

// Khởi tạo 1 Promise cho việc gọi API refresh_token
// Mục đích tạo Promise này để khi nào gọi API refresh_token xong thì mới retry lại các API bị lỗi trước đó.
let refreshTokenPromise = null

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    return response
  },
  (error) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    /**
     * Quan trọng: Xử lí Refresh Token tự động
     */
    // TH1: Nếu như nhận mã 401 từ BE, gọi API đăng xuất
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }

    // TH2: Nếu như nhận mã 410 từ BE, gọi API refresh_token để làm mới lại accessToken
    // Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
    const originalRequests = error.config
    if (error.response?.status === 410 && originalRequests) {
      // Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi API refresh_token đồng thời gán vào refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            // Đồng thời lưu ý là accessToken cũng đã được update lại ở Cookie rồi
            return data?.accessToken
          })
          .catch((_error) => {
            // Nếu nhận bất kì lỗi nào từ refresh token thì logout luôn
            axiosReduxStore.dispatch(logoutUserAPI(false))

            // Tránh việc gọi API logout 2 lần (interceptor bắt cả logout API của TH1)
            return Promise.reject(_error)
          })
          .finally(() => {
            // Dù API refresh_token có thành công hay lỗi thì vẫn luôn gán lại refreshTokenPromise về null như ban đầu
            refreshTokenPromise = null
          })
      }

      // Cuối cùng mới return refreshTokenPromise trong trường hợp success ở đây
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        /**
         * Bước 1: Đối với trường hợp nếu dự án cần lưu accessToken vào localStorage hoặc đâu đó thì sẽ viết thêm code ở đây.
         * Hiện tại ở đây không cần bước 1 này vì ta đã đưa accessToken vào cookie (xử lí bên BE) sau khi API refresh_token được gọi thành công.
         */

        /**
         * Bước 2: Return lại axios instance của chúng ta kết hợp với originalRequest đề gọi lại những API ban đầu bị lỗi
        */
        return authorizedAxiosInstance(originalRequests)
      })
    }

    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance