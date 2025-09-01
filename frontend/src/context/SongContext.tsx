import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const server = "http://localhost:8000";

export interface Song {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    audio: string;
    album: string;
}

export interface Album {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
}

interface SongContextType {
    songs: Song[]; 
    song: Song | null; 
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    selectedSong: string | null;
    setSelectedSong: (id: string | null) => void;
    loading: boolean;
    albums: Album[];
    fetchSingleSong: (id: string) => Promise<void>;
    nextSong:()=>void;
    prevSong:()=>void;
    albumSong:Song[];
    albumData:Album | null;
    fetchAlbumSongs:(id:string)=>Promise<void>;
    fetchSongs:()=>Promise<void>;
    fetchAlbums:()=>Promise<void>;

}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
    children: React.ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const[loading,setLoading]=useState<boolean>(true);
    const[selectedSong,setSelectedSong]=useState<string|null>(null);
    const[isPlaying,setIsPlaying]=useState<boolean>(false);
    const[albums,setAlbums]=useState<Album[]>([]);

    // Fetch songs from the backend
    const fetchSongs=useCallback(async() =>{
        setLoading(true);
        try {
            const {data} =await axios.get<Song[]>(`${server}/api/v1/songs/all`);
            setSongs(data);
            if(data.length>0){
                setSelectedSong(data[0].id.toString());
                setIsPlaying(false);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    },[])

    const[song,setSong]=useState<Song|null>(null);
    // Fetch single song details when selectedSong changes 

    const fetchSingleSong=useCallback(async(id:string) =>{
        if(!selectedSong) return;
        try {
            const {data} =await axios.get<Song>(`${server}/api/v1/song/${selectedSong}`);
            setSong(data);
        } catch (error) {
            console.log(error);
        }
    },[selectedSong])    

    const fetchAlbums=useCallback(async()=>{
        setLoading(true);
        try {
            const {data}=await axios.get<Album[]>(`${server}/api/v1/album/all`); 
            setAlbums(data);
        }
        catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    },[])

    const[index,setIndex]=useState<number>(0);

    const nextSong=useCallback(()=>{
        if(index===songs.length-1){
            setIndex(0);
            setSelectedSong(songs[0].id.toString());
        }else{
            setIndex((prevIndex)=>prevIndex+1);
            setSelectedSong(songs[index+1]?.id.toString());
        }
    },[index,songs])


    const prevSong=useCallback(()=>{
        if(index>0){
            setIndex((prev)=>prev-1);
            setSelectedSong(songs[index-1]?.id.toString());
        }
    },[index,songs]) 

    const [albumSong, setAlbumSong] = useState<Song[]>([])
    const [albumData, setAlbumData] = useState<Album | null>(null)

    const fetchAlbumSongs = useCallback(async(id:string)=>{
        setLoading(true);
        try {
            const {data} = await axios.get<{songs:Song[];album:Album}>(`${server}/api/v1/album/${id}`)
            setAlbumData(data.album);
            setAlbumSong(data.songs);
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)

        }
    },[])
    
    
    useEffect(()=>{
        fetchSongs();
        fetchAlbums();
    },[])

    return <SongContext.Provider value={{ songs,setSelectedSong,selectedSong,isPlaying,setIsPlaying,loading,albums,fetchSingleSong,song,nextSong,prevSong,fetchAlbumSongs,albumData,albumSong,fetchAlbums,fetchSongs }}>{children}</SongContext.Provider>;
};

export const useSongData = () => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error("useSongContext must be used within a SongProvider");
    }
    return context;
};