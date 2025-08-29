import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout";
import SongCard from "../components/SongCard";
import { useSongData } from "../context/SongContext";

const Home = () => {
  const {albums,songs} = useSongData();
  return (
    <div>
      <Layout>
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Featued Chart</h1>
          <div className="flex overflow-auto">
            {
              albums.map((e,i)=>{
                return <AlbumCard key={i} image={e.thumbnail} name={e.title} desc={e.description} id={e.id}></AlbumCard>
              })
            }
          </div>
        </div>

         <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
          <div className="flex overflow-auto">
            {
              songs.map((e,i)=>{
                return <SongCard key={i} image={e.thumbnail} name={e.title} desc={e.description} id={e.id}></SongCard>
              })
            }
          </div>
        </div>
      </Layout>
    
    </div>
  )
}

export default Home;
