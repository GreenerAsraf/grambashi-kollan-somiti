import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalAmount: 0,
  userWithAllInfo: ''
}

export const BalanceSlice = createSlice({
  name: 'balanceSlice',
  initialState,
  reducers: {
    balanceReducer: (state) => state,
    userReducer: (state, action) => {
      state.userWithAllInfo = action.payload
    }
  }
})

export const { balanceReducer, userReducer } = BalanceSlice.actions

export default BalanceSlice.reducer
