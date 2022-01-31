/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import { useForm } from "react-hook-form";


import OnboardingImage from '../images/onboarding-image.jpg';
import OnboardingDecoration from '../images/auth-decoration.png';
import axiosInstance from '../utils/axios';


function Onboarding04(props) {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const { register, watch, setError, clearErrors, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log("Submit", data);
    axiosInstance.put("/user/id", { shop: data })
      .then((res) => {
        console.log(res.data);
        history.push("/");

      })
      .catch((err) => {
        console.log(err.response);
      })
  };
  useEffect(() => {
    axiosInstance.get("/category/")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data?.results);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }, []);

  const slugWatcher = watch("slug");

  const isAvailable = () => {
    console.log("INside");
    axiosInstance.post("/shop/is-available/", { slug: slugWatcher })
      .then((response) => {
        clearErrors("slug")
        console.log(response);

      })
      .catch((error) => {
        setError("slug", {
          type: "server",
          message: error.response?.data?.results?.message
        })
        console.log(error.response);
      })
  }
  let timer = useRef(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      isAvailable()

    }, 500)


    console.log("Changed");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugWatcher]);

  return (
    <main className="bg-white">

      <div className="relative flex">

        {/* Content */}
        <div className="w-full md:w-1/2">

          <div className="min-h-screen h-full flex flex-col after:flex-1 md:pb-24">

            <div className="flex-1">

              {/* Header */}
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg>
                </Link>

              </div>

            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <p
                  className='inline-flex items-center justify-center h-10 w-10 rounded-md mb-5 cursor-pointer'
                  style={{ backgroundColor: "rgba(113,134,157,.1)" }}
                  onClick={() => { props.setStep(3) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className='back-icon' width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </p>
                <p className='mt-5 mb-2'>Shop info</p>
                <h1 className="text-2xl font-semibold mb-10" style={{ color: "#1e2022" }}>Create your shop information</h1>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name <span className="text-red-500"> *</span></label>
                      <input
                        {...register("name",
                          {
                            required: "Name is required",
                            maxLength: { value: 40, message: "Name should not be longer than 40 characters" }
                          })
                        }
                        id="name"
                        className={`form-input w-full ${errors.name ? ' focus:border-red-500 border-red-400 hover:border-red-500' : ""} `}
                        type="text"
                        placeholder='Dukaandar Brand' />
                      {errors.name &&
                        (<div className="text-xs mt-1 text-red-500">{errors.name?.message}</div>)}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-1`}
                        htmlFor="slug">Shop slug
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className='relative'>
                        <input
                          {...register("slug",
                            {
                              required: "Slug is required!",
                              minLength: { value: 3, message: "Slug must be at least 3" },
                              maxLength: { value: 30, message: "Slug can not be more than 30" },
                              pattern: { value: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, message: "not a valid slug" }
                            })
                          }
                          id="slug"
                          className={`form-input w-full ${errors.slug ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `}
                          style={{ paddingRight: "50%" }}
                          type="text"
                          placeholder='dukaandar-brand' />
                        <div className="absolute inset-0 left-auto flex items-center"
                        >
                          <span className=" text-gray-400 font-medium px-3">
                            dukaandar.com
                          </span>
                        </div>
                      </div>
                      {errors.slug &&
                        (<div className="text-xs mt-1 text-red-500">{errors.slug?.message}</div>)}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="country">Category <span className="text-red-500">*</span></label>
                      <select id="category" {...register("category",
                        {
                          required: "Please select category"
                        })}
                        className={`form-input w-full ${errors.category ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `}>
                        <option value={null}>Select category</option>
                        {categories && categories?.map((category) => (
                          <option value={category?._id}>{category?.name}</option>
                        ))}
                      </select>
                      {errors.category &&
                        (<div className="text-xs mt-1 text-red-500">{errors.category?.message}</div>)}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="role">Description </label>
                      <textarea
                        {...register("description")}
                        className={`form-input w-full ${errors.description ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `} ></textarea>
                      {errors.description &&
                        (<div className="text-xs mt-1 text-red-500">{errors.description?.message}</div>)}

                    </div>

                    <div>
                      <button type='submit' className="btn button-primary py-2 text-white block text-center w-full">
                        Complete</button>
                    </div>
                  </div>

                </form>


                {/* <div className="text-sm mt-5">
                  Already have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Sign in here</Link>
                </div> */}






              </div>
            </div>

          </div>

        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={OnboardingImage} width="760" height="1024" alt="Onboarding" />
          <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block" src={OnboardingDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
}

export default Onboarding04;