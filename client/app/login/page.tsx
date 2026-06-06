import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod/v3'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const page = () => {
   
  return (
   <div className="min-h-screen bg-gray-100 dark:bg-gray-200 flex justify-center items-center px-3 sm:px-4 py-4 sm:py-6">
      <div
        className="
          w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl dark:shadow-2xl
          bg-white rounded-2xl sm:rounded-3xl shadow-xl dark:bg-black/8
          flex flex-col md:grid md:grid-cols-2 
          overflow-hidden
        "
      >
        {/* LEFT SIDE — FORM (Top on mobile) */}
        <div className="flex flex-col justify-center px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-10">
          <img
            src="/logo.png"
            alt="logo"
            className="w-32 md:w-40 h-auto mb-3 sm:mb-4 md:mb-5 rounded-xl"
          />

          <h1 className="text-xl sm:text-2xl md:text-3xl text-primary font-semibold mb-1 sm:mb-2">
            Welcome to
          </h1>

          <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 md:mb-8">
            Palm Mind HR system
          </p>

          <div className="border w-full mb-4 sm:mb-5 md:mb-6 dark:border-black/10"></div>

        <LoginForm/>
        </div>

        {/* RIGHT SIDE — IMAGE (B}ottom on mobile, full image) */}
        <div className="w-full aspect-square sm:aspect-4/3 md:aspect-auto md:h-full overflow-hidden p-3 sm:p-3 hidden md:block">
          <img
            src="/hr.png"
            alt="login visual"
            className="w-full h-full object-contain sm:rounded-2xl "
          />
        </div>
      </div>
    </div>
  )
}

export default page


