import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OTPInput, { ResendOTP } from 'otp-input-react';

import OnboardingImage from '../images/onboarding-image.jpg';
import OnboardingDecoration from '../images/auth-decoration.png';
import axiosInstance from '../utils/axios';

function Onboarding02(props) {
  const phone = localStorage.getItem("PHONE")
  const [error, setError] = useState(false);
  const [erMsg, setErMsg] = useState(null);
  const [OTP, setOTP] = useState("");
  const renderTime = () => React.Fragment;
  const renderButton = (buttonProps) => {
    return (
      <>
        Didn't receive the OTP?
        <button {...buttonProps} className="font-medium text-indigo-500 hover:text-indigo-600">
          Resend {buttonProps.remainingTime !== 0 && `(${buttonProps.remainingTime})`}
        </button>
      </>
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (OTP.length === 6) {
      setError(false);
      axiosInstance.post("/verify-otp",
        {
          phone: localStorage.getItem("PHONE"),
          otp: OTP
        }).then(response => {
          if (response.data?.results?.user?.isActive) {

            props.setStep(3);
          } else {
            setError(true);
            setErMsg("Try again");
          }

        }).catch(err => {
          setError(true);
          setErMsg(err.response.data?.results?.message);
          console.log(err.response);
        })
    } else {
      setErMsg("Please enter 6 digits OTP");
      setError(true);
    }
  }
  const resendOTP = () => {


  }
  return (
    <main className="bg-white">

      <div className="relative flex">

        {/* Content */}
        <div className="w-full md:w-1/2">

          <div className="min-h-screen h-full flex flex-col after:flex-1">

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
                  className='inline-flex items-center justify-center h-10 w-10 rounded-md mb-3 cursor-pointer'
                  style={{ backgroundColor: "rgba(113,134,157,.1)" }}
                  onClick={() => { props.setStep(1) }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className='back-icon' width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </p>
                <p className='my-5'>Verification</p>
                <h1 className="text-2xl font-semibold mb-2" style={{ color: "#1e2022" }}>We sent you an SMS code</h1>
                <p>On number : <a className='text-indigo-500 hover:text-indigo-600 ' href={`tel:+880${phone}`}>+880{phone}</a></p>
                {/* Form */}
                <form className='mt-8' onSubmit={onSubmit}>
                  <div className="space-y-3 mb-5">
                    <OTPInput className="otp-box flex-wrap gap-y-3"
                      value={OTP}
                      onChange={(e) => {
                        setOTP(e);
                        setError(false);
                        setErMsg(null)
                      }}
                      inputClassName={error ? "focus:ring-red-300 border-red-500 focus:border-red-500" : ""}

                      inputStyles={{ width: "2.7rem", height: "2.7rem" }}
                      OTPLength="6"
                      otpType="alphanumeric"
                      autoFocus />

                  </div>
                  {erMsg &&
                    (<div className="text-xs mt-1 text-red-500">{erMsg}</div>)}


                  <div className='mt-7'>
                    <button type='submit' className="btn button-primary py-2 text-white block text-center w-full">Next Step -&gt;</button>
                  </div>
                </form>


                <div className="text-sm mt-5">
                  <ResendOTP
                    maxTime={5}
                    onResendClick={resendOTP}
                    renderButton={renderButton}
                    renderTime={renderTime}
                  />
                  {/* Didn't receive the OTP? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Resend</Link> */}
                </div>

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

export default Onboarding02;