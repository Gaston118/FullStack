
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null, // El valor inicial puede ser null o cualquier otro valor predeterminado.
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
