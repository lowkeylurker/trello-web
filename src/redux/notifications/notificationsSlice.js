import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị của một Slice trong Redux
const initialState = {
  currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

// Khởi tạo một Slice trong kho lưu trữ - Redux Store
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,

  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },

    updateCurrentNofitications: (state, action) => {
      state.currentNotifications = action.payload
    },

    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      state.currentNotifications.unshift(incomingInvitation)
    }
  },

  // extraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload
      // Đoạn này đảo ngược lại mảng invitations nhận được, đơn giản là để hiển thị cái mới nhất lên đầu
      state.currentNotifications = Array.isArray(incomingInvitation) ? incomingInvitation.reverse() : []
    })

    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      // Cập nhật lại dữ liệu boardInvitation (bên trong nó sẽ có Status mới sau khi update)
      const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thi không thấy property actions đâu cả, vì những actions này đơn giản là được Redux tạo tự động theo tên của reducer.
export const {
  clearCurrentNotifications,
  updateCurrentNofitications,
  addNotification
} = notificationsSlice.actions

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho Redux Store ra sử dụng.
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

// File tên là notificationsSlice nhưng ta sẽ export một Reducer
// export default notificationsSlice.reducer
export const notificationsReducer = notificationsSlice.reducer