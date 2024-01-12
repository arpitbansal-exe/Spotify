"use client"
import {Song} from "@/types"
import MediaItem from "@/app/componants/MediaItem";
import LikeButton from "@/app/componants/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
interface SearchContentProps {
    songs: Song[];
}

const SearchContent:React.FC<SearchContentProps> = ({
    songs
}) => {
    if(songs.length===0){
        return(
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-netural-400
                "
                >
                    No songs found.
            </div>
        )
    }
    const onPlay=useOnPlay(songs);
    return (
    <div className="flex flex-col gap-y-2 w-full px-6">
        {songs.map((item) => (
            <div
                key={item.id}
                className="flex items-center gap-x-4 w-full"
            >
                <div className="flex-1">
                    <MediaItem
                        onClick={(id:string) => {onPlay(id)}}
                        data={item}
                    />
                </div>
                <LikeButton
                    songId={item.id}
                />
            </div>
        ))}
    </div>
    )
}

export default SearchContent