import { createSlice } from "@reduxjs/toolkit";

const initialState = { auth: false, name: "" };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLinLout: (state, actions) => {
      state.auth = actions.payload;
      console.log(">>>>>>>>>>>>>>>>>",state.auth);
    },

    setName: (state, action) => {
      state.name = action.payload;
      console.log(">>>>>>>>>>>>>>>",state.name);
    
    },
  },
});

export const { authLinLout, setName } = authSlice.actions;
export default authSlice.reducer;
