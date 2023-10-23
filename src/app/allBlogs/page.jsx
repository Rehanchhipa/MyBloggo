"use client";
import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  TextField,
  IconButton,
  Button,
  Modal,
  CardMedia,
} from "@mui/material";
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";
import loadingImg from '../Images/DoubleRing.gif'


import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch,useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { createBlogFetch } from "../reduxStore/createBlog";
import { dataNull } from "../reduxStore/createBlog";
import { dataNull1, deleteFetch } from "../reduxStore/deleteBlog";
import { updateFetch ,dataNull2} from "../reduxStore/updateBlog";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  discription: Yup.string().required("Description is required"),
  url: Yup.string().url("Enter a valid URL").required("URL is required"),
  id: Yup.string().required("id is required"),
});

const page = () => {

  const dispatch = useDispatch()
  const selectorLogin = useSelector((state)=>state.Login)
  const selectorallBlogs = useSelector((state)=>state.allBlogs)
  const selectorcreateBlogs = useSelector((state)=>state.createBlog)
  const selectorDeleteBlogs = useSelector((state)=>state.deleteBlog)
  const selectorupdateBlogs = useSelector((state)=>state.updateBlog)

  const route = useRouter()

  const [data, setData] = useState(selectorLogin.blogs? selectorLogin.blogs.slice().reverse() : [{title:'api data not found',discription:'please try re login your account'}])

  

  const [cardBlog, setCardBlog] = useState([])
  const [myCardBlog, setMyCardBlog] = useState([])

  const [userid, setuserId] = useState(null);
  const [title, setTitle] = useState(null)
  const [discription, setDiscription] = useState(null)
  const [url, seturl] = useState(null)
  const [cardId, setCardId] = useState(null)

  const [updateBtnActive, setUpdateBtnActive] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    
    if (selectorLogin.id === null){
        route.push('/')
      }
       setuserId(selectorLogin.id)
    }, [])

    useEffect(()=>{
      setLoading(selectorcreateBlogs.loading)
      if(selectorcreateBlogs.data != null){
        setData(selectorcreateBlogs.data.slice().reverse())
        dispatch(dataNull())
        setMyBlog(!myBlog)
      }
    },[selectorcreateBlogs])

    useEffect(()=>{
      setLoading(selectorDeleteBlogs.loading)
      if(selectorDeleteBlogs.data !=null){
        setData(selectorDeleteBlogs.data.slice().reverse())
        dispatch(dataNull1())
        setMyBlog(!myBlog)
      }
    },[selectorDeleteBlogs])

    useEffect(()=>{
      setLoading(selectorupdateBlogs.loading)
      if(selectorupdateBlogs.data != null){
        setData(selectorupdateBlogs.data.slice().reverse())
        dispatch(dataNull2())
        setMyBlog(!myBlog)
      }
    },[selectorupdateBlogs])




  // this is my blog page

  const [myBlog, setMyBlog] = useState(false);

  const handleMyBlog = () => {
    setMyBlog(!myBlog);

  };
  useEffect(()=>{

    if (myBlog === true) {
      let newblog = data.filter((v, i) => {
        return v.id === userid
      })
      setCardBlog(newblog)
      setMyCardBlog(newblog)
    }
      else{
        setCardBlog(data)
      }
  
  },[myBlog])


  // this is popop

  const [popop, setPopop] = useState(false);

  const handlePopop = () => {
    setPopop(!popop);
  };

  // this is logout

  const handleLogout = () => {
    setuserId(null)
    route.replace('/')
  }

  // this is modal

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    if (title !=null || discription != null || url != null || cardId != null){
      setTitle(null)
      setDiscription(null)
      seturl(null)
      setCardId(null)
      setUpdateBtnActive(false)
    }
  };

  // this is search blog

  const [search, setSearch] = useState("");

  useEffect((v, i) => {

    if (selectorLogin.blogs != null){

      if (myBlog === false) {
        let filter = data.filter((v, i) => {
          return v.title.toLowerCase().includes(search.toLowerCase())
        })
        setCardBlog(filter)
      }
      else {
        let filter = myCardBlog.filter((v,i)=> {
          return v.title.toLowerCase().includes(search.toLowerCase())
        })
        setCardBlog(filter)
      }
    }


  }, [search])

  const handleSearchchange = (e) => {
    setSearch(e.target.value)
  }

  //   this is submit  add blogs

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
    if(title != null || discription != null || url != null || cardId != null){
      dispatch(updateFetch({values,cardId}))
    } else {
      dispatch(createBlogFetch(values))
    }
    handleCloseModal()
  };

  // this is card delete

  const handleDeleteCard = (v) => {
    // console.log(v._id)
    dispatch(deleteFetch(v._id))
  }

  // this is card Edit

  const handleEditCard = (v) => {
    setTitle(v.title)
    setDiscription(v.discription)
    seturl(v.url)
    setCardId(v._id)
    setUpdateBtnActive(true)
    handleOpenModal()
  }

  // this is image error

  const handleImgError = ()=>{
    console.log('handle image error')
  }

  // this is image dailog viewer

  const [viewImage, setViewImage] = useState(null)
  const [fullImage, setFullImage] = useState(false)

  const handlefullImage = (v)=>{
    console.log(v.url)
    setViewImage(v.url)
    setFullImage(!fullImage)

  }


  return (
    <>
      <div className="blogPage pb-8 p-2 ">
        <div className="items-center sm:flex justify-around">
          <div className="relative " style={{ display: "inline" }}>
            <Button
              variant="contained"
              onClick={handlePopop}
              color="primary"
              sx={{ backgroundColor: "blue !important" }}
            >
              {myBlog ? 'My Profile' : 'all Blogs'}
            </Button>
            <div
              className="absolute bg-black bg-opacity-25 p-2 mt-1 rounded-2xl z-auto"
              onMouseLeave={handlePopop}
              style={!popop ? { display: "none" } : { display: "block", color: 'white',zIndex:10}}
            >
              <button className="w-full" onClick={handleMyBlog}>
                {myBlog ? 'all Blogs' : 'My Profile'}
              </button>
              <button className="w-full mt-2" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          {myBlog && (
            <Button
              variant="outlined"
              onClick={handleOpenModal}
              sx={{ ml: { xs: 4, sm: 0 }, display: "inline-flex", color: 'white' }}
            >
              Add Blog
            </Button>
          )}
          <div className="block">
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              onChange={(e) => handleSearchchange(e)}
              value={search}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <AiOutlineSearch />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="sm"
            />
          </div>
        </div>

        <div
          className="mt-4 w-11/12 md:w-8/12 lg:w-5/12 mx-auto scrol"
          style={{ overflow: "auto", scrollBehavior: "auto", height: '85vh' }}
        >
          {
            loading ? 
            <Image
            src={loadingImg}
            alt="loading image"
            className="dark:invert"
            width={150}
            height={150}
            priority
            style={{marginLeft:'auto',marginRight:'auto',marginTop:'30px'}}
          />
            :
            cardBlog.map((v, i) => {
              return (
                <div
                  key={i}
                  className=" mx-auto my-2 mr-4 relative flex flex-col rounded-xl bg-black bg-opacity-25 bg-clip-border text-gray-700 shadow-md"
                >
                  <div className="relative  h-auto overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <CardMedia
                      component="img"
                      alt="Image not found"
                      image={v.url}
                      onError={handleImgError}
                      onClick={()=>handlefullImage(v)}
                      className="myImg"
                      style={{
                        objectFit: "cover",
                        width: "full",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="p-6 text-white">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {v.title}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      {v.discription}
                      
                    </p>
                  </div>
                  {
                    myBlog ?
                    <div className="flex justify-around mt-2 mb-4">
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ backgroundColor: "red !important", width: '100px' }}
                          onClick={()=>handleDeleteCard(v)}
                        >
                          delete
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          onClick={()=>handleEditCard(v)}
                          sx={{ backgroundColor: "blue !important", width: '100px' }}
                        >
                          Edit
                        </Button>
                      </div>

                      :

                      ''
                  }
                </div>
              );
            })
          }
        </div>
      </div>




      <div>
        <Modal open={modal} onClose={handleCloseModal}>
          <div
            className="w-11/12 md:w-8/12"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div className="grid grid-cols-3 gap-4 ">
              <div className="col-auto"></div>
              <div className="col-auto text-center">
                <p>Add Blog</p>
              </div>
              <div className="col-auto text-end">
                {" "}
                <button>
                  <AiOutlineClose
                    className="text-red-500 cursor-pointer"
                    onClick={handleCloseModal}
                  />
                </button>
              </div>
            </div>

            <Formik
              initialValues={{
                title: title ? title : '',
                discription: discription ? discription : "",
                url: url ? url : "",
                id: userid,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <Field
                      label="Title"
                      type="text"
                      name="title"
                      id="title"
                      variant="standard"
                      fullWidth
                      as={TextField}
                      error={Boolean(errors.title && touched.title)}
                      helperText={<ErrorMessage name="title" />}
                    />
                  </div>

                  <div>
                    <Field
                      label="Discription"
                      type="text"
                      name="discription"
                      id="discription"
                      variant="standard"
                      fullWidth
                      as={TextField}
                      error={Boolean(errors.discription && touched.discription)}
                      helperText={<ErrorMessage name="discription" />}
                    />
                  </div>

                  <div>
                    <Field
                      label="URL"
                      type="text"
                      name="url"
                      id="url"
                      variant="standard"
                      fullWidth
                      as={TextField}
                      error={Boolean(errors.url && touched.url)}
                      helperText={<ErrorMessage name="url" />}
                    />
                  </div>

                  <div className="flex justify-around mt-8">
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ backgroundColor: "red !important" }}
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ backgroundColor: "blue !important" }}
                    >
                      {
                        updateBtnActive ? 
                        'update Blog'
                        :
                        'create Blog'
                      }
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </div>

      <div className='  w-screen h-screen bg-black bg-opacity-50 fixed py-10 top-0 myModal' style={fullImage ? { display: 'block' } : { display: 'none' }}>
        <AiOutlineClose className='close' onClick={handlefullImage} />
        <div className='flex justify-center'>

          <img src={viewImage} alt="image" srcSet={viewImage} className='modal-content' style={{ maxWidth: '90vw', maxHeight: '90vh', alignSelf: 'center' }} />
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default page;
