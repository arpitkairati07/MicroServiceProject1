import { useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    prevSong,
    nextSong,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) /100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  useEffect(() => {
    if (selectedSong) {
      fetchSingleSong(selectedSong);
    }
  }, [selectedSong, fetchSingleSong]);

  return (
    <div>
      {song && (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
          <div className="gap-4 items-center lg:flex">
            <img
              src={song.thumbnail ? song.thumbnail : "/image.png"}
              alt=""
              className="w-12"
            />
            <div className="hidden md:block">
              <p>{song.title}</p>
              <p>{song.description?.slice(0, 30)}...</p>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto">
              {song.audio && (
                <audio
                  ref={audioRef}
                  src={song.audio}
                  autoPlay={isPlaying}
               
                  className="w-96"
                />
              )}
              <div className="w-full flex items-center font-thin text-green-400">
                <input type="range" min={"0"} max={"100"} className="progress-bar w-[120px] md:w-[300px]" value={(progress/duration)*100 || 0} onChange={durationChange}/>
              </div>

              <div className="flex justify-center items-center gap-4">
                <span className="cursor-pointer" onClick={prevSong}><GrChapterPrevious></GrChapterPrevious></span>

                <button className="bg-white text-black rounded-full p-2 cursor-pointer" onClick={handlePlayPause}>{isPlaying ? <FaPause></FaPause>:<FaPlay></FaPlay>}</button>

                <span className="cursor-pointer" onClick={nextSong}><GrChapterNext></GrChapterNext></span>

              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input type="range" className="w-16 md:w-32 min" min={"0"} max={"100"} step={"0.01"} value={volume*100} onChange={handleVolumeChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
