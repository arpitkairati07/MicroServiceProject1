import type React from "react"
import { FaPlay } from "react-icons/fa"
import { FaBookBookmark } from "react-icons/fa6"

interface SongCardProps {
    image:string,
    name:string,
    desc:string,
    id:string
}

const SongCard:React.FC<SongCardProps> = ({image,name,desc,id}) => {
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <div className="relative group">
            <img src={image ? image : "./image.png"} alt={name} className="mr-1 w-[160px] rounded"/>
            <div className="flex gap-2">
                <button className="absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"><FaPlay></FaPlay></button>

                <button className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"><FaBookBookmark></FaBookBookmark></button>
            </div>
        </div>
      <p className="font-bold mt-2 mb-1 ">
        {name}
      </p>
      <p className="text-slate-200 text-sm">{desc.slice(0,20)}...</p>
    </div>
  )
}

export default SongCard
