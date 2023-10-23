import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';


export const deleteFetch = createAsyncThunk('delete', async (v)=>{

    let add = v
    try{
        let response = await axios.delete(`api/deleteBlog/${add}`)
        return response.data
    }
    catch (error){
        throw error
    }
})

const deleteBlog = createSlice({
    name:'delete',
    initialState:{
        data:null,
        loading:null
    },
    reducers:{
        dataNull1(state, action){
            state.data = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(deleteFetch.pending, (state, action)=>{
            console.log('pendding', action)
            state.loading = true
        })
        .addCase(deleteFetch.fulfilled, (state, action)=>{
            console.log('fulfilled', action)
            toast(action.payload.message)
            state.data = action.payload.data
            state.loading = false
        })
        .addCase(deleteFetch.rejected, (state, action)=>{
            console.log('rejected', action)
            toast(action.error.message)
            state.loading = false
        })
    }

})

export default deleteBlog.reducer
export const {dataNull1} = deleteBlog.actions