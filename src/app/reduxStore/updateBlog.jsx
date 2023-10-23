import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';


export const updateFetch = createAsyncThunk('updateBlog', async (v)=>{
    let id = v.cardId
    let value = v.values
    try{
        let response = await axios.put(`api/${id}`, value)
        return response.data
    }
    catch (error){
        throw error
    }
})

const updateBlog = createSlice({
    name:'updateBlog',
    initialState:{
        data:null,
        loading:null,
    },
    reducers:{
        dataNull2(state, action){
            state.data = null
        },
     
    },
    extraReducers: (builder)=>{
        builder
        .addCase(updateFetch.pending, (state, action)=>{
            console.log('pending', action)
            state.loading = true
        })
        .addCase(updateFetch.fulfilled, (state, action)=>{
            console.log('fulfilled', action)
            state.loading = false
            state.data = action.payload.data
            toast(action.payload.message)

        })
        .addCase(updateFetch.rejected, (state, action)=>{
            console.log('rejected', action)
            state.loading = false
            toast(action.error.message)

        })
    }
})

export default updateBlog.reducer

export const {dataNull2} = updateBlog.actions
