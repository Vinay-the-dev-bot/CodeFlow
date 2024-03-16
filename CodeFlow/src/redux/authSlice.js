import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("name");
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const initialState = { auth: token ? true : false, name: name, user };
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLinLout: (state, actions) => {
      state.auth = actions.payload;
    },

    setName: (state, action) => {
      state.name = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    qstnSolved: (state, action) => {
      console.log(action.payload);
      state.user.solved_questions = [
        ...state.user.solved_questions,
        action.payload,
      ];
    },
  },
});

export const { authLinLout, setName, setUser, qstnSolved } = authSlice.actions;
export default authSlice.reducer;
