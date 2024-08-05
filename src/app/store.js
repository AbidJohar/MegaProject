import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "../features/auth/authSlicer";
import postSlice from "../features/post/postSlicer";

  const store = configureStore({
    reducer:{
      auth : authSlice,
      post : postSlice,
      // can add more slices
    }
});

export default store;
 