import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import homeImage from '../assets/home.png';
import searchImage from '../assets/search.png';
import stackImage from '../assets/stack.png'
import arrow from '../assets/arrow.png';
import plusIcon from '../assets/plus.png';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={homeImage} alt="HomeImage" className="w-6" />
          <p className="font-bold">Home</p>
        </div>

        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img src={searchImage} alt="SearchImage" className="w-6" />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={stackImage} alt="stackImage" className="w-8" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={arrow} alt="" className="w-8" />
            <img src={plusIcon} alt="plusIcon" className="w-8" />
          </div>
        </div>
        <div onClick={() => navigate("/playlist")}>
          <PlayListCard></PlayListCard>
        </div>
        <div className="p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcast to follow</h1>

          <p className="font-light">We'll keep you update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4">
            Browse Podcast
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
