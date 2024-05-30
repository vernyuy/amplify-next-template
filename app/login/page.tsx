"use client"

import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { signUp } from "aws-amplify/auth"

export default function Login(){
    const [isLoading, setIsLoading] = useState(false)
    // const { isSignUpComplete, userId, nextStep } = await signUp({
    //     username: "hello@mycompany.com",
    //     password: "hunter2",
    //     options: {
    //       userAttributes: {
    //         email: "hello@mycompany.com",
    //         phone_number: "+15555555555" // E.164 number convention
    //       },
    //     }
    //   });

   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)
        const username = formData.get("username")?.toString()!
        const email = formData.get("email")?.toString()!
        const phone_number = formData.get("phone_number")?.toString()!
        const password = formData.get("password")?.toString()!
        const res = await signUp({
            username: email,
            password: password,
            options: {
              userAttributes: {
                email: email,
                phone_number: phone_number,
              }
            }
          })
          console.log(res)
      }


    return(
        <div className='w-screen h-screen'>
            <div className='flex justify-between  w-full h-full'>
                <div className='hidden sm:flex sm:text-xl sm:bg-blue-400/10 sm:mx-auto sm:my-auto sm:w-full sm:h-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
                        <path fill="currentColor" fill-rule="evenodd" d="M1.923.25h5.308a3.288 3.288 0 0 1 0 6.577h-.642l2.374 2.226l2.584-2.583a.75.75 0 1 1 1.06 1.06l-2.549 2.55l2.532 2.373a.75.75 0 0 1-1.026 1.094L8.997 11.14l-2.39 2.39a.75.75 0 0 1-1.06-1.06l2.355-2.356l-3.506-3.287H2.673v5.25a.75.75 0 0 1-1.5 0V1a.75.75 0 0 1 .75-.75m5.308 5.077H2.673V1.75h4.558a1.788 1.788 0 1 1 0 3.577" clip-rule="evenodd"/>
                    </svg>
                    <Image
                        src="/m-pres.svg"
                        alt="Picture of the author"
                        width={50}
                        height={50}
                        layout="responsive"
                        objectFit="fit"
                    />
                </div>
                <div className='bg-bl mx-auto my-auto flex w-full h-full'>
                    <div className='w-[80%] md:w-[60%] sm:w-[70%] mx-auto my-auto'>
                        <div>
                            <h2 className='text-2xl my-4'>Create user account</h2>
                        </div>
                    <form onSubmit={onSubmit}>
                        <div className='flex flex-col w-full mb-2'>
                            <label>Name</label>
                            <input type="text" name="username" className='h-9 border rounded-lg px-4 w-full'/>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Email</label>
                            <input type="text" name="email" className='h-9 border rounded-lg px-4 w-full'/>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Password</label>
                            <input type="text" name="password" className='h-9 w-full border rounded-lg px-4'/>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Confirm Password</label>
                            <input type="text" name="confirmPassword" className='h-9 w-full border rounded-lg px-4'/>
                        </div>
                        {
                            isLoading
                            ?<button disabled className='w-full flex justify-center gap-2 mt-4 bg-blue-300 text-white h-9 rounded-lg' >
                            <p className='my-auto'>Loading...</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='my-auto'>
                                <circle cx="12" cy="12" r="0" fill="currentColor">
                                    <animate id="svgSpinnersPulseMultiple0" fill="freeze" attributeName="r" begin="0;svgSpinnersPulseMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/>
                                    <animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulseMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/>
                                </circle>
                                <circle cx="12" cy="12" r="0" fill="currentColor">
                                    <animate id="svgSpinnersPulseMultiple1" fill="freeze" attributeName="r" begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/>
                                    <animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/>
                                </circle>
                                <circle cx="12" cy="12" r="0" fill="currentColor">
                                    <animate id="svgSpinnersPulseMultiple2" fill="freeze" attributeName="r" begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/>
                                    <animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/>
                                </circle>
                            </svg>
                        </button>
                        :<button type="submit" className='w-full flex justify-center gap-2 mt-4 bg-blue-500 text-white h-9 rounded-lg' >
                        <p className='my-auto'>Register</p>
                    </button>
                        }
                        
            
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}