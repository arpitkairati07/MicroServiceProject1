import { useNavigate } from "react-router-dom"
import PlayListCard from "./PlayListCard";

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">

        <div className="flex items-center gap-3 pl-8 cursor-pointer" onClick={() => navigate("/")}>
            <img src="./home.png" alt="" className="w-6"/>
            <p className="font-bold">Home</p>
        </div>

          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img src="./search.png" alt="" className="w-6"/>
            <p className="font-bold">Search</p>
        </div>

      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="./stack.png" alt="" className="w-8" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img src="./arrow.png" alt="" className="w-8"/>
             <img src="./plus.png" alt="" className="w-8"/>
          </div>
        </div>
        <div onClick={()=>navigate("/playlist")}>
          <PlayListCard></PlayListCard>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
