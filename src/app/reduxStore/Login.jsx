import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const loginFetch = createAsyncThunk('login', async (v)=>{
    try{
        let response = await axios.post('api/login', v)
        return response.data
    } catch (error){
        throw error
    }
})

const login = createSlice({
    name:'login',
    initialState:{
        data:null,
        message:null,
        loading:null,
        id:null,
        blogs:null
    },
    reducers:{
        messageLoginNull(state,action){
            state.message = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginFetch.pending, (state, action)=>{
            console.log('pending', action)
            state.loading = true
        })
        .addCase(loginFetch.fulfilled, (state, action)=>{
            console.log('fulfilled', action)
            state.loading = false
            state.message = action.payload.message

            if (action.payload.data != null){
                state.id = action.payload.data._id
                state.blogs = action.payload.blogs
                console.log(action.payload)
            }


        })
        .addCase(loginFetch.rejected, (state, action)=>{
            console.log('error', action)
            state.loading = false

        })
    }
})

export default login.reducer

export const {messageLoginNull} = login.actions
