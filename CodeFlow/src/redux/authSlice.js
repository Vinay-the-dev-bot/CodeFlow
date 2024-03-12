import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("name");
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
console.log("UUSERjdjdf", user);
const initialState = { auth: token ? true : false, name: name, user };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLinLout: (state, actions) => {
      state.auth = actions.payload;
      console.log(">>>>>>>>>>>>>>>>>", state.auth);
    },

    setName: (state, action) => {
      state.name = action.payload;
      console.log(">>>>>>>>>>>>>>>", state.name);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(">>>>>>>>>>>>>>>", state.name);
    },
  },
});

export const { authLinLout, setName, setUser } = authSlice.actions;
export default authSlice.reducer;
