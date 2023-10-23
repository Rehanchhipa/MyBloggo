"use client";
import React, { useEffect, useState, memo, useMemo } from "react";
import {CardMedia} from  '@mui/material'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";

import { ToastContainer, toast } from 'react-toastify';

import loadingImg from '../Images/DoubleRing.gif'

import { useDispatch, useSelector } from "react-redux";

import { singinFetch } from "../reduxStore/SinginLogin";
import { loginFetch } from "../reduxStore/Login";
import { messageNull } from "../reduxStore/SinginLogin";
import { messageLoginNull } from "../reduxStore/Login";

import Image from "next/image";
import { useRouter } from "next/navigation";


const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

const LoginPage = () => {

  const dispatch = useDispatch()
  const selectorSingin = useSelector((state)=> state.Singin)
  const selectorLogin = useSelector((state)=>state.Login)

  const route = useRouter()

  const [loading ,setLoading] = useState(false)

  useEffect(()=>{

    if (selectorLogin.message === 'successfully login'){
      route.push('/allBlogs')
      dispatch(messageLoginNull())
    }
  },[selectorLogin])

  useEffect(()=>{
    setLoading(selectorSingin.loading)
    if (selectorSingin.message === 'successfully'){
      setSinginPage(false)
      dispatch(messageNull())
    }
  },[selectorSingin])


    // this is submit login

    const handleSubmit = (values) => {
        dispatch(loginFetch(values))
    }

      // this is singin page state 

  const [singinPage, setSinginPage] = useState(false);

  const handlePageSingin = () => {
    setSinginPage(!singinPage);
  };


    
  return (
    <>
    <div className="login-page bg-cover ">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      <div className="col-span-2 text-center">
        <div className="mt-40 mb-10">
          <span className="bg-white p-2 text-2xl">
            {" "}
            Share Your Thought...!
          </span>
          <div className="mt-4">
            <span className="bg-black p-2 text-white text-3xl">
              {" "}
              WITH BLOGGO
            </span>
          </div>
        </div>
      </div>
      <div className=" text-center col-auto login-div px-4 bg-white h-screen">
        <p className="text-2xl my-4 font-bold">{singinPage ? 'Singin' : 'Login' }</p>
        {
          !loading ? 
        !singinPage ? (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      variant="standard"
                      autoComplete=""
                      error={Boolean(errors.email && touched.email)}
                      helperText={<ErrorMessage name="email" />}
                      className=""
                      sx={{mt:4}}
                    />
                  </div>

                  <div>
                    <Field
                      as={TextField}
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="standard"
                      autoComplete="current-password"
                      error={Boolean(errors.password && touched.password)}
                      helperText={<ErrorMessage name="password" />}
                      className=""
                      sx={{mt:4}}
                    />
                  </div>

                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="bg-blue-600"
                      sx={{mt:4}}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <Singin handlePageSingin={handlePageSingin} />
        )
        :
      <Image
                src={loadingImg}
                alt="Loading image"
                className="dark:invert"
                width={150}
                height={150}
                priority
                style={{marginLeft:'auto',marginRight:'auto',marginTop:'20px'}}
              />
      }
        <button
          className="text-blue-500 underline mt-3 text-sm"
          onClick={() => handlePageSingin(true)}
          
        >
          go to Singin
        </button>
      </div>
    </div>
  </div>
  <ToastContainer />
</>
  )
}




const Singin = () => {

  const dispatch = useDispatch()
  const selector = useSelector((state)=> state.Singin)

  useEffect(()=>{

    console.log(selector)

  },[dispatch,selector])

  
    const initialValues = {
      email: "",
      password: "",
    };
  
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
  
    const handleSubmit = (values) => {
        console.log(values)
        dispatch(singinFetch(values))
    }
  
    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  autoComplete=""
                  error={Boolean(errors.email && touched.email)}
                  helperText={<ErrorMessage name="email" />}
                  className=""
                  sx={{mt:4}}

                />
              </div>
  
              <div>
                <Field
                  as={TextField}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="standard"
                  autoComplete="current-password"
                  error={Boolean(errors.password && touched.password)}
                  helperText={<ErrorMessage name="password" />}
                  className=""
                  sx={{mt:4}}

                />
              </div>
  
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mt-8 bg-blue-600"
                  sx={{mt:4}}
                  >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  };

export default memo(LoginPage)
