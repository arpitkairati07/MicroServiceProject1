import { useParams } from "react-router-dom";
import Layout from "../components/Layout"
import { useSongData } from "../context/SongContext"
import { useEffect } from "react";
import Loading from "../components/Loading";
import logo from "../assets/logo.png";
import dummyImage from "../assets/posterimage.jpg"
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useUserData } from "../context/UserContext";


const Album = () => {
  const {fetchAlbumSongs,albumSong,albumData,setIsPlaying,setSelectedSong,loading}=useSongData();
  const {isAuth,addToPlaylist} = useUserData();
  const params=useParams<{id:string}>();
  useEffect(()=>{
    if(params.id){
      fetchAlbumSongs(params.id)
    }
  },[params.id])
  return (
    <div>
      <Layout>
        {
          albumData && (
            <>
            {
              loading ? <Loading></Loading> : <>
              <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                {
                  albumData.thumbnail && (
                    <img src={albumData.thumbnail} alt="" className="w-48 rounded" />
                  )
                }
                <div className="flex flex-col">
                  <p>Playlist</p>
                  <h2 className="text-3xl font-bold mb-4 md:text-5xl">{albumData.title} PlayList</h2>
                  <h4>{albumData.description}</h4>
                  <p className="mt-1">
                    <img src={logo} alt="" className="inline-block w-6"/>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#A7A7A7]">
                <p>
                  <b className="mr-4">#</b>
                </p>
                <p className="hidden sm:block">Description</p>
                <p className="text-center">Actions</p>
              </div>
              <hr />
              {
                albumSong && albumSong.map((song,index)=>{
                  return <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#A7A7A7] hover:bg-[#FFFFFF2B] cursor-pointer" key={index}>
                    <p className="text-white">
                      <b className="mr-4 text-[#A7A7A7]">{index+1}</b>
                      <img src={song.thumbnail ? song.thumbnail : dummyImage} alt="" className="inline w-10 mr-5" />
                      {song.title}
                    </p>

                    <p className="text-[15px] hidden sm:block">{song.description.slice(0,30)}...</p>
                    <p className="flex justify-center items-center gap-5">
                      {isAuth && (<button className="text-[15px] text-center cursor-pointer" onClick={()=>addToPlaylist(song.id)}><FaBookmark></FaBookmark></button>)}
                      <button className="text-[15px] text-center cursor-pointer" onClick={()=>{
                        setSelectedSong(song.id);
                        setIsPlaying(true); 
                      }}><FaPlay></FaPlay></button>
                    </p>
                  </div>
                })
              }
              </>
            }
            </>
          )
        }
      </Layout>
    </div>
  )
}

export default Album
