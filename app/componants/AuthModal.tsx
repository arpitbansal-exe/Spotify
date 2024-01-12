"use client"
import {useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import {Auth} from "@supabase/auth-ui-react" 
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useEffect } from "react"

import useAuthModel from "@/hooks/useAuthModal"
import Model from "./Modal"



const AuthModel=()=>{
    const supabaseClient= useSupabaseClient()
    const router=useRouter()
    const {session}=useSessionContext()
    const {onClose,isOpen} =useAuthModel();

    useEffect(()=>{
        if(session){
            router.refresh();
            onClose();
        }
    },[session,router,onClose])


    const onChange=(open:boolean)=>{
        if(!open){
            onClose()
        }
    }

    return(
        <Model
            title="Welcome Back"
            description="Please login to your account"
            isOpen={isOpen}
            onChange={onChange}
            >
        <Auth
            theme="dark"
            magicLink={true}
            providers={['google','github']}
            supabaseClient={supabaseClient}
            appearance={{
                theme:ThemeSupa,
                variables:{
                    default:{
                        colors:{
                            brand:'#404040',
                            brandAccent:'#22c55e',
                        }
                    }
                }
            }}
        />
        </Model>
    )
}
export default AuthModel;