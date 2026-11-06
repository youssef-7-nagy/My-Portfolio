import { configureStore, createSlice } from '@reduxjs/toolkit';

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    activeCategory: 'all',
    contactModalOpen: false,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    toggleContactModal: (state) => {
      state.contactModalOpen = !state.contactModalOpen;
    },
  },
});

export const { setActiveCategory, toggleContactModal } = portfolioSlice.actions;

export const store = configureStore({
  reducer: {
    portfolio: portfolioSlice.reducer,
  },
});
