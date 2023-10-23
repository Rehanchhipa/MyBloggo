import { configureStore } from "@reduxjs/toolkit";
import {Singin} from "./SinginLogin";
import  Login  from "./Login";
import createBlog from "./createBlog";
import deleteBlog from "./deleteBlog";
import updateBlog from "./updateBlog";


const store = configureStore({
    reducer:{
        Singin,
        Login,
        createBlog,
        deleteBlog,
        updateBlog
        
    }
})

export default store