import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';


export const singinFetch = createAsyncThunk('login', async(v)=>{
    try{
        let response = await axios.post('api/singin', v)
        return response.data
    } catch (error) {
        throw error
    }
})

const CreateSingin = createSlice({
    name:'login',
    initialState:{
        loading: false,
        data:null,
        message:null
    },
    reducers:{
        messageNull(state,action){
            state.message = null
        }
    },
    extraReducers:(builder)=>{

        builder
        .addCase(singinFetch.pending, (state,action)=>{
            console.log('pending', action)
            state.loading = true
        })
        .addCase(singinFetch.fulfilled, (state, action)=>{
            console.log('fulfilled', action)
            state.loading = false
            state.message = action.payload.message
            // state.message = null
            toast(action.payload.message)
            console.log(action.payload)

          
        })
        .addCase(singinFetch.rejected, (state, action)=>{

            console.log('error', action)
            state.loading = false
            state.message = action.error.message
            toast(action.error.message)
        })
    }
})

const Singin  =  CreateSingin.reducer

export const {messageNull} = CreateSingin.actions

export {Singin}


