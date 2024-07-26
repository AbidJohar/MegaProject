import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: false,
    userData: null,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.posts.push(action.payload);
        },
        // updatePost: (state, action) => {
        //     const index = state.posts.findIndex(post => post.$id === action.payload);
        //     if (index !== -1) {
        //         state.posts[index] = action.payload;
        //     }
        // },
        clearPost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        },
    },
});

export const { createPost, clearPost } = postSlice.actions;
export default postSlice.reducer;
