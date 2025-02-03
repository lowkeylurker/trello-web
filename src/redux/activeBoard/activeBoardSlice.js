import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'

// Khởi tạo giá trị của một Slice trong Redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)

// Khởi tạo một Slice trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,

  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gắn nó ra một biến có nghĩa hơn
      const board = action.payload

      // Xử lý dữ liệu nếu cần thiết
      // ...

      // Update dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    }
  },

  // extraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    // Thường chỉ bắt trường hợp gọi API thành công (fullfilled) thì mới cập nhật dữ liệu, còn nếu thất bại thì lỗi sẽ được bắt ở axios interceptor
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data khi gọi API
      let board = action.payload

      // Xử lý dữ liệu nếu cần thiết

      // Sắp xếp thứ tự các column luôn trước khi đưa dữ liệu xuống các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        // Xử lý vấn đề kéo thả vào column rỗng khi F5 trang web
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp thứ tự các column luôn trước khi đưa dữ liệu xuống các component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      // Update dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thi không thấy property actions đâu cả, vì những actions này đơn giản là được Redux tạo tự động theo tên của reducer.
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho Redux Store ra sử dụng.
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// File tên là activeBoardSlice nhưng ta sẽ export một Reducer
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer