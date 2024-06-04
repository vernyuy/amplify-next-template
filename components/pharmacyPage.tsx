"use client"

import { signOut } from "aws-amplify/auth"
import { useRouter } from 'next/navigation'
import NavBar from '@/components/navbar'
import Link from 'next/link'
import FeatureCard from '@/components/featurCard'
import Footer from "@/components/footer"
import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import CardTwo from "./cardTwo"
import ImageCard from "./imageCard"

export default function PharmacyPage(){
    const client = generateClient<Schema>();
    const router = useRouter()
    const [pharmacies, setPharmacies]: any = useState([])

    useEffect(()=>{
        getAllPharmacies()
    }, [pharmacies])
    const getAllPharmacies = async () =>{
        try{
            const res = await client.models.Pharmacy.list();
            setPharmacies(res.data)
            console.log(pharmacies)
        }catch(err){
            console.log(err)
        }
    }
    const handleSignOut = async () => {
        await signOut()
        router.replace('/signin')
      }
    return(
        <div className='bg-blue-100/40 pt-4'>
            <div className='h-full w-full'>
                <div className='h-full w-full bg-blur sticky top-5 z-50'>
                    <div className='mx-auto bg-white/40 w-[85%] border shadow shadow-lg rounded-full'>
                        <NavBar/>
                    </div>
                </div>
                <div className='h-[70%]'>
                    
                    <div className=' my-auto sm:flex w-full px-4 sm:px-20 justify-between gap-4'>
                        <div className='mt-16 mx-auto'>
                            <div >
                                <h2 className='text-5xl font-bold my-6 sm:pl-4'>Discover Top Rated Pharmacies Near You</h2>
                                {/* <p className='leading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, ut saepe, et porro nobis, cupiditate culpa labore minus repellat quod quos deserunt aperiam mollitia eos facilis rerum recusandae veritatis ipsam!</p> */}
                            </div>
                            <div>
                                <button onClick={()=>handleSignOut()}>Sign Out</button>
                            </div>
                        </div>
                        <div className="sm:my-20 sm:px-20">
                            <p className="text-justify">
                            Whether you are seeking a specialist or a primary care physician, explore our directory to dicover the perfect match for your healthcare needs.
                            </p>
                            <div className='mt-20'>
                                <Link href='' className='text-white bg-black shadow shadow-lg border rounded-full px-8 py-3'>Explore</Link>
                            </div>
                        </div>
                    </div>
                    <div className='h-10 bg-gradient-to-b from-blue-100/10 to-white'></div>

                    <div className="bg-white px-4 sm:px-24 sm:flex gap-3 justify-between">
                        <ImageCard cardData={{title:"Health Care Providers", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,", url:"", image:"/pharm.png"}} />

                        <CardTwo cardData={{title:"Health Care Providers", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,", url:"", image:"/pharm.png"}}/>
                    </div>
                    <div className='h-screen w-screen bg-white pt-20'>
                        <div className='flex pb-12'>
                            <div className='mx-auto'>
                                <h1 className='text-3xl font-bold pb-2'>Near By Pharmacies</h1>
                                <div className='flex gap-1'>
                                    <div className='w-6 h-2 bg-blue-500 rounded-full'></div>
                                    <div className='w-6 h-2 bg-blue-500 rounded-full'></div>
                                    <div className='w-full h-2 bg-blue-500 rounded-full'></div>
                                </div>
                            </div>
                        </div>
                        <div className=' px-1 sm:px-24 pt-10 flex flex-wrap justify-evenly gap-3'>
                            {
                                pharmacies.map((pharm: any)=>{
                                    <FeatureCard key={pharm.id} cardData={{title:"Deligent Clinic", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,", url:"", image:"/pharm.png"}}/>
                                })
                            }
                                {/* <FeatureCard cardData={{title:"Deligent Clinic", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,", url:"", image:"/pharm.png"}}/>

                                <FeatureCard cardData={{title:"Solidarity Pharmacy", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,", url:"", image:"/first-aide.png"}}/>

                                <FeatureCard cardData={{title:"Amazing Pharmacy", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,", url:"", image:"/pharm.png"}}/> */}
                                {/* <FeatureCard/>
                                <FeatureCard/> */}
                            </div>
                    </div>
                        <Footer/>
                    <div>
                        
                    </div>
                </div>

{/* Chats button */}
                {/* <div className='fixed bottom-10 right-10 bg-blue-500 text-white rounded-full p-3 hover:cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 18.72C6.339 20.134 4.82 21 2 21c1-1 2.27-2.35 2.801-4.447C3.067 15.114 2 13.157 2 11c0-4.418 4.477-8 10-8c5.1 0 9.308 3.054 9.923 7"/><path d="M16 19.889c-3.314 0-6-1.99-6-4.445C10 12.99 12.686 11 16 11s6 1.99 6 4.444c0 1.199-.64 2.286-1.68 3.085c.317 1.165 1.08 1.915 1.68 2.471c-1.8 0-2.716-.544-3.792-1.422c-.684.2-1.428.31-2.208.31z"/></g></svg>
                            </div> */}

                            {/* ******************** */}
            </div>
            
        </div>
    )
}