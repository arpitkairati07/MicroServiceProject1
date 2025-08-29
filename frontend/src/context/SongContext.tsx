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

    useEffect(()=>{
        fetchSongs();
    },[])

    return <SongContext.Provider value={{ songs }}>{children}</SongContext.Provider>;
};

export const useSongContext = () => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error("useSongContext must be used within a SongProvider");
    }
    return context;
};