

// import { signOut } from "aws-amplify/auth"
// import { useRouter } from 'next/navigation'
import NavBar from '@/components/navbar'
import Link from 'next/link'
import FeatureCard from '@/components/featurCard'
import Footer from "@/components/footer"
import HomePage from '@/components/homePage'
// import { useEffect } from 'react'
// import { generateClient } from 'aws-amplify/data';
// import { type Schema } from '@/amplify/data/resource';
// import HomePage from "@/components/homePage"
// import { Interactions } from '@aws-amplify/interactions';

export default function Home(){
    // const client = generateClient<Schema>();
    // const router = useRouter()

    // const userInput = "Book hotel";

    // Provide a bot name and user input
    // const response = async()=>{
    //    const res =  await Interactions.send({
    //         botName: "HotelBooking",
    //         message: userInput
    //     });

    //     console.log(res.message)
    // }

    // Log chatbot response
    // console.log(response.message);
    // useEffect(()=>{
    //     list()
    //     // response()
    //     // if(!localStorage.getItem('user')){
    //     //     router.replace('/signin')
    //     // }
    // })
    // const list = async () =>{
    //     const res = await client.models.Pharmacy.list();
    //     console.log(res)
    // }
    // const handleSignOut = async () => {
    //     await signOut()
    //     router.replace('/signin')
    //   }
    return(
        <div>
            
                <script
                    type="text/javascript"
                    src="/script.js"
                ></script>
            <HomePage/>
            
        </div>
    )
}