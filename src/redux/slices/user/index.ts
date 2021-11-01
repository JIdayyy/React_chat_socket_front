import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  email: string;
}

const initialState: IUser = {
  id: "",
  name: "",
  email: "",
};

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => ({
      id: "",
      name: "",
      email: "",
    }),
  },
});

export const { login } = counterSlice.actions;

export default counterSlice.reducer;
