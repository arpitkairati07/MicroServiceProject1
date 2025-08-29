import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <>
        <div className="w=full flex justify-between items-center font-semibold">
      <div className="flex items-center gap-2">
        <img src="./left_arrow.png" alt=" Left Arrow" className="w-8 bg-black p-2 rounded-2xl cursor-pointer" onClick={()=>navigate(-1)}/>

        <img src="./right_arrow.png" alt=" Left Arrow" className="w-8 bg-black p-2 rounded-2xl cursor-pointer" onClick={()=>navigate(+1)}/>
      </div>
      <div className="flex items-center gap-4">
        <p className="bg-white text-black cursor-pointer text px-4 py-1 text-[15px] rounded-full hidden md:block ">Explore Prenium</p>

        <p className="bg-white text-black text px-4 py-1 cursor-pointer text-[15px] rounded-full hidden md:block ">Install App</p>

        <p className="bg-white text-black text px-4 py-1 text-[15px] cursor-pointer rounded-full">LogOut</p>
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4">
      <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
      <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">Music</p>
      <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">Podcasts</p>
      <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer md:hidden" onClick={()=>navigate("/playlist")}>Playlist</p>
    </div>
    </>
  )
}

export default Navbar
