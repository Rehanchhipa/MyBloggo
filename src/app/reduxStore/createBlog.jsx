import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const createBlogFetch = createAsyncThunk('createBlog', async (v)=>{
    try{
        let response = await axios.post('api/createBlog', v)
        return response.data
    }
    catch (error) {
        throw error
    }
})

const createBlog = createSlice({
    name:'createBlog',
    initialState:{
        data:null,
        loading:null
    },
    reducers:{
        dataNull(state, action){
            state.data = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createBlogFetch.pending, (state, action)=>{
            console.log('pending', action)
            state.loading = true
        })
        .addCase(createBlogFetch.fulfilled, (state, action)=>{
            console.log('fulfilled', action)
            toast(action.payload.message)
            state.data = action.payload.data
            state.loading = false
        })
        .addCase(createBlogFetch.rejected, (state, action)=>{
            console.log('rejected', action)
            toast(action.error.message)
            state.loading = false
        })
    }
})

export default createBlog.reducer
export const {dataNull} = createBlog.actions