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
    const newVolume = parseFloat(e.target.value) / 100;
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
          {/* Left - Song Info */}
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
          </div>

          {/* Middle - Controls */}
          <div className="flex-1 flex flex-col items-center">
            {song.audio && (
              <audio
                ref={audioRef}
                src={song.audio}
                autoPlay={isPlaying}
                className="hidden"
              />
            )}

            {/* Progress Bar */}
            <div className="w-full flex justify-center mb-2">
              <input
                type="range"
                min={"0"}
                max={"100"}
                className="progress-bar w-[200px] md:w-[400px]"
                value={(progress / duration) * 100 || 0}
                onChange={durationChange}
              />
            </div>

            {/* Buttons (Centered) */}
            <div className="flex justify-center items-center gap-6">
              <span className="cursor-pointer" onClick={prevSong}>
                <GrChapterPrevious size={24} />
              </span>

              <button
                className="bg-white text-black rounded-full p-3 cursor-pointer"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>

              <span className="cursor-pointer" onClick={nextSong}>
                <GrChapterNext size={24} />
              </span>
            </div>
          </div>

          {/* Right - Volume */}
          <div className="flex items-center">
            <input
              type="range"
              className="w-16 md:w-32"
              min={"0"}
              max={"100"}
              step={"0.01"}
              value={volume * 100}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
