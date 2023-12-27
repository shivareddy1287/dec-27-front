import { createSlice } from "@reduxjs/toolkit";

const activeMenuSlice = createSlice({
  name: "Navigation",
  initialState: { menu: "activeMenu", showSideBar: true },
  reducers: {
    setActiveMenu: (state, action) => {
      return { ...state, menu: action.payload };
    },
    setShowSideBar: (state, action) => {
      return { ...state, showSideBar: action.payload };
    },
  },
});

export const { setActiveMenu, setShowSideBar } = activeMenuSlice.actions;
export default activeMenuSlice.reducer;
