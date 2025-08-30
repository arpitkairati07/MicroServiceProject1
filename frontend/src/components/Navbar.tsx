import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import leftArrow from  '../assets/left_arrow.png';
import rightArrow from '../assets/right_arrow.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth,logoutUser } = useUserData();

  const logoutUserHandler = () =>{
    logoutUser();
  }
  return (
    <>
      <div className="w=full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            src={leftArrow}
            alt=" Left Arrow"
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />

          <img
            src={rightArrow}
            alt=" Left Arrow"
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            onClick={() => navigate(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black cursor-pointer text px-4 py-1 text-[15px] rounded-full hidden md:block ">
            Explore Prenium
          </p>

          <p className="bg-white text-black text px-4 py-1 cursor-pointer text-[15px] rounded-full hidden md:block ">
            Install App
          </p>

          {isAuth ? (
            <p onClick={logoutUserHandler} className="bg-white text-black px-4 py-1 text-[15px] cursor-pointer rounded-full">
              LogOut
            </p>
          ) : (
            <p onClick={()=>navigate("/login")} className="bg-white text-black px-4 py-1 text-[15px] cursor-pointer rounded-full">
              LogIn
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Music
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Podcasts
        </p>
        <p
          className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer md:hidden"
          onClick={() => navigate("/playlist")}
        >
          Playlist
        </p>
      </div>
    </>
  );
};

export default Navbar;
