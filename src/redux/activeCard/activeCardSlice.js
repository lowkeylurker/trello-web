import { createSlice } from '@reduxjs/toolkit'

// Khởi tạo giá trị của một Slice trong Redux
const initialState = {
  currentActiveCard: null
}

// Khởi tạo một Slice trong kho lưu trữ - Redux Store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,

  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },

    updateCurrentActiveCard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gắn nó ra một biến có nghĩa hơn
      const card = action.payload

      // Xử lý dữ liệu nếu cần thiết
      // ...

      // Update dữ liệu của currentActiveCard
      state.currentActiveCard = card
    }
  },

  // extraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: () => {}
})

// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thi không thấy property actions đâu cả, vì những actions này đơn giản là được Redux tạo tự động theo tên của reducer.
export const { clearCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho Redux Store ra sử dụng.
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

// File tên là activeCardSlice nhưng ta sẽ export một Reducer
// export default activeBoardSlice.reducer
export const activeCardReducer = activeCardSlice.reducer