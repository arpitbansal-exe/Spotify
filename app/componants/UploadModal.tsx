"use client"
import { useForm ,FieldValues, SubmitHandler, set} from "react-hook-form"
import { useState } from "react"
import toast from "react-hot-toast"
import uniqid from "uniqid"
import { useRouter } from "next/navigation"

import {useUser} from "@/hooks/useUser"
import Input from "./Input"
import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import Button from "./Button"
import {useSupabaseClient} from "@supabase/auth-helpers-react"

const UploadModal = () => {
    const[isLoading,setIsLoading]=useState(false)
    const uploadModal=useUploadModal();
    const {user}=useUser();
    const subpabseClient=useSupabaseClient();
    const router=useRouter();


    const {
        register,
        handleSubmit,
        reset
    } =useForm<FieldValues>({
        defaultValues:{
            author:'',
            title:'',
            song:'null',
            image:'null'
        }
    })

    const onChange=(open:boolean)=>{
        if(!open){
            reset();
            uploadModal.onClose();

        }
    }
    const onSubmit:SubmitHandler<FieldValues>= async(values)=>{
        //Upload to sb
        try {
            setIsLoading(true)
            const imageFile=values.image?.[0];
            const songFile=values.song?.[0];
            if(!imageFile || !songFile ||!user){
                toast.error("Missing fields")
                return;
            }
            const uniqueID=uniqid();
            //Uplad Songs
            const{
                data:songData,
                error:songError
            }=await subpabseClient
                .storage
                .from("songs")
                .upload(`song-${values.title}-${uniqueID}.mp3`,songFile,{
                    cacheControl:"3600",
                    upsert:false

                });
            if(songError){
                setIsLoading(false)
                return toast.error("Failed to upload song")
            }
            //Upload Image
            const{
                data:imageData,
                error:imageError
            }=await subpabseClient
                .storage
                .from("images")
                .upload(`image-${values.title}-${uniqueID}.mp3`,imageFile,{
                    cacheControl:"3600",
                    upsert:false
                });
            if(imageError){
                setIsLoading(false)
                return toast.error("Failed to upload image")
            }
            const {
                error:supabaseError
            }= await subpabseClient
                .from('songs')
                .insert({
                    user_id:user.id,
                    title:values.title,
                    author:values.author,
                    image_path:imageData.path,
                    song_path:songData.path
                })
            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }
            router.refresh();
            setIsLoading(false);
            toast.success("Song Created!");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Failed to upload song")
        }
        finally{
            setIsLoading(false)
        }
    }
  return (
    <Modal 
        title="Add a Song"
        description="Upload a mp3 file"
        isOpen={uploadModal.isOpen}
        onChange={onChange}
        >
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
        >
        <Input 
            id="title"
            disabled={isLoading}
            {...register("title",{required:true})}
            placeholder="Song Title"
        />
        <Input 
            id="author"
            disabled={isLoading}
            {...register("author",{required:true})}
            placeholder="Author"
        />
        <div>
            <div className="pb-1">Select a file name</div>
            <Input 
            id="song"
            type="file"
            accept="audio/mp3"
            disabled={isLoading}
            {...register("song",{required:true})}
        />
        </div>
        <div>
            <div className="pb-1">Select an image</div>
            <Input 
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image",{required:true})}
        />
        </div>
        <Button
            disabled={isLoading}
            type="submit"
        >
            Create
        </Button>

        </form>
    </Modal>
  )
}

export default UploadModal