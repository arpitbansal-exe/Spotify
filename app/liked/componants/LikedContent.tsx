"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";

import {Song} from "@/types"
import {useUser} from "@/hooks/useUser";
import MediaItem from "@/app/componants/MediaItem";
import LikeButton from "@/app/componants/LikeButton";

interface LikedContentProps {
    songs: Song[];
    
}

const LikedContent:React.FC<LikedContentProps> = ({
    songs
}) => {
  const router = useRouter();
  const {isLoading,user}=useUser();
  useEffect(()=>{
    if(!isLoading && !user){
      router.replace("/");
    }
  },[isLoading,user,router])

  if(songs.length===0){
    return(
      <div className="
        flex 
        flex-col
        gap-y-2
        px-6
        text-neutral-400

      ">No liked Songs</div>
    )
  }

  return (
    <div className="
      flex 
      flex-col
      gap-y-2
      w-full
      p-6
    ">
      {songs.map((song)=>(
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
        <div className="flex-1">
          <MediaItem
            onClick={()=>{}}
            data={song}
          />
        </div>
        <LikeButton
          songId={song.id}
        />

        </div>
      ))}
    </div>
  )
}

export default LikedContent