/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import {
  Link
} from 'react-router-dom';
import { useForm } from "react-hook-form";

import divisions from './utility/data/states';
import districts from './utility/data/districts';

import OnboardingImage from '../images/onboarding-image.jpg';
import OnboardingDecoration from '../images/auth-decoration.png';
import axiosInstance from '../utils/axios';


function Onboarding03(props) {
  const { register, watch, getValues, handleSubmit, formState: { errors } } = useForm();
  const [isPassShown, setIsPassShown] = useState(false);
  const [isCPassShown, setIsCPassShown] = useState(false);
  const [state, setState] = useState(0);


  const onSubmit = data => {
    console.log("Submit", data);
    const reqBody = {
      fullname: data?.fullname,
      password: data.password,
      email: data?.email,
      address: {
        country: data?.country,
        state: data?.state,
        city: data?.city,
        street: data?.street,
        zipcode: data?.zipcode,


      }
    }
    axiosInstance.put("/user/id", reqBody)
      .then((res) => {
        console.log(res.data);
        props.setStep(4);
      })
      .catch((err) => {
        console.log(err.response);
      })
  };

  const stateCh = watch("state");
  useEffect(() => {
    setState(stateCh);

  }, [stateCh]);

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
                  onClick={() => { props.setStep(2) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className='back-icon' width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </p>
                <p className='mt-5 mb-2'>Information</p>
                <h1 className="text-2xl font-semibold mb-10" style={{ color: "#1e2022" }}>Provide your correct information</h1>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="fullname">Full Name </label>
                      <input
                        {...register("fullname")}
                        id='fullname'
                        className="form-input w-full"
                        type="text" autoFocus />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address </label>
                      <input
                        {...register("email",
                          {
                            pattern: { value: /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,15}$/, message: "Email is not valid" },
                          })
                        } id="email"
                        className={`form-input w-full ${errors.email ? ' focus:border-red-500 border-red-400 hover:border-red-500' : ""} `} type="email" />
                      {errors.email &&
                        (<div className="text-xs mt-1 text-red-500">{errors.email?.message}</div>)}
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${errors.password ? " text-red-500" : ""}`}
                        htmlFor="password">Password
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className='relative'>
                        <input
                          {...register("password",
                            {
                              required: "Password is required!",
                              minLength: { value: 6, message: "Password must be at least 6" },
                              maxLength: { value: 30, message: "Password can not be more than 30" },
                            })
                          }
                          id="password"
                          className={`form-input w-full pr-10 ${errors.password ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `}
                          type={isPassShown ? "text" : "password"} />
                        <div className="absolute inset-0 left-auto flex items-center cursor-pointer"
                          onClick={() => { setIsPassShown(!isPassShown) }}>
                          <span className="text-sm text-gray-400 font-medium px-3">
                            {isPassShown ?
                              (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="3" y1="3" x2="21" y2="21" />
                                <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                                <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                              </svg>) :
                              (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                              </svg>)
                            }
                          </span>
                        </div>
                      </div>
                      {errors.password &&
                        (<div className="text-xs mt-1 text-red-500">{errors.password?.message}</div>)}
                    </div>
                    <div>

                      <label
                        className={`block text-sm font-medium mb-1 ${errors.cpassword ? " text-red-500" : ""}`}
                        htmlFor="cpassword">Cofirm password <span className="text-red-500">*</span>
                      </label>
                      <div className='relative'>
                        <input
                          {...register("cpassword",
                            {
                              required: "Confirm password is required!",
                              validate: {
                                passwordEqual: value => (value === getValues().password) || "Two password doesn't match",
                              }
                            })
                          }
                          id="cpassword"
                          className={`form-input w-full ${errors.cpassword ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `}
                          type={isCPassShown ? "text" : "password"} />
                        <div className="absolute inset-0 left-auto flex items-center cursor-pointer"
                          onClick={() => { setIsCPassShown(!isCPassShown) }}>
                          <span className="text-sm text-gray-400 font-medium px-3">
                            {isCPassShown ?
                              (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="3" y1="3" x2="21" y2="21" />
                                <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                                <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                              </svg>) :
                              (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                              </svg>)
                            }
                          </span>
                        </div>
                      </div>
                      {errors.cpassword &&
                        (<div className="text-xs mt-1 text-red-500">{errors.cpassword?.message}</div>)}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country <span className="text-red-500">*</span></label>
                        <select id="country" {...register("country",
                          {
                            required: "Please select country"
                          })}
                          className={`form-input w-full ${errors.country ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `}>
                          <option value="Bangladesh">Bangladesh</option>
                        </select>
                        {errors.country &&
                          (<div className="text-xs mt-1 text-red-500">{errors.country?.message}</div>)}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="state">State <span className="text-red-500">*</span></label>
                        <select

                          {...register("state",
                            {
                              required: "Please select state",
                              validate: (e) => e != 0 || "Please select state"
                            })}
                          id="state"
                          className={`form-input w-full ${errors.state ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `}>
                          <option value={0}>Select state</option>
                          {divisions?.map(division => (<option key={division.id} value={division.id}>{division.name}</option>))}
                        </select>
                        {errors.state &&
                          (<div className="text-xs mt-1 text-red-500">{errors.state?.message}</div>)}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">


                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="city">City <span className="text-red-500">*</span></label>
                        <select id="city"
                          {...register("city",
                            {
                              required: "Please select city",
                              validate: (e) => e != 0 || "Please select city"

                            })}
                          className={`form-input w-full ${errors.city ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `}
                          disabled={state == 0}>
                          <option value={0}>Select city</option>
                          {districts?.map(district => district.division_id == state ? (<option key={district.id} value={district.name}>{district.name}</option>) : null)}
                        </select>
                        {errors.city &&
                          (<div className="text-xs mt-1 text-red-500">{errors.city?.message}</div>)}
                      </div>
                      <div>
                        <label htmlFor="zipcode" className="block text-sm font-medium mb-1">ZIP code</label>
                        <input
                          {...register("zipcode")}
                          type="text" id='zipcode'
                          className="form-input w-full" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="role">Street Address <span className="text-red-500">*</span></label>
                      <input
                        {...register("street",
                          {
                            required: "Please enter your street address"
                          })} type="text"
                        className={`form-input w-full ${errors.street ? ' focus:border-red-500 border-red-300 hover:border-red-500' : ""} `} />
                      {errors.street &&
                        (<div className="text-xs mt-1 text-red-500">{errors.street?.message}</div>)}

                    </div>



                    <div>
                      <button type='submit' className="btn button-primary py-2 text-white block text-center w-full">Next Step -&gt;</button>
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

export default Onboarding03;