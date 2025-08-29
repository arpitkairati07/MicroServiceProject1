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
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    selectedSong: string | null;
    setSelectedSong: (id: string | null) => void;
    loading: boolean;
    albums: Album[];
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

    const fetchAlbums=useCallback(async()=>{
        try {
            const {data}=await axios.get<Album[]>(`${server}/api/v1/album/all`); 
            setAlbums(data);
        }
        catch (error) {
            console.log(error);
        }
    },[])

    useEffect(()=>{
        fetchSongs();
        fetchAlbums();
    },[])

    return <SongContext.Provider value={{ songs,setSelectedSong,selectedSong,isPlaying,setIsPlaying,loading,albums }}>{children}</SongContext.Provider>;
};

export const useSongContext = () => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error("useSongContext must be used within a SongProvider");
    }
    return context;
};