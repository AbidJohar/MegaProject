import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "../features/auth/authSlicer";

  const store = configureStore({
    reducer:{
      auth : authSlice,
      // can add more slices
    }
});

export default store;
 