import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("USER")? JSON.parse(localStorage.getItem("USER")):"",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("USER", JSON.stringify(state.currentUser));
   
      
    },
    removeUser: (state, action) => {
  
      state.currentUser = "";
      localStorage.removeItem("USER");
    },
    updateUser:(state,action)=>{
      state.currentUser = action.payload;
      localStorage.setItem("USER", JSON.stringify(state.currentUser));

    }
  },
});

export const {setUser, removeUser,updateUser} = userSlice.actions;
export default userSlice.reducer;