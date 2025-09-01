import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { useSongData } from "../context/SongContext";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const server = "http://localhost:7000";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  const { albums, songs, fetchAlbums, fetchSongs } = useSongData();

  // Album states
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [albumDescription, setAlbumDescription] = useState<string>("");

  // Song states
  const [songTitle, setSongTitle] = useState<string>("");
  const [songDescription, setSongDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");

  // File + Loading
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // ADD ALBUM
  const addAlbumHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("title", albumTitle);
    formData.append("description", albumDescription);
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/v1/album/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchAlbums();
      setAlbumTitle("");
      setAlbumDescription("");
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setBtnLoading(false);
    }
  };

  // ADD SONG
  const addSongHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("title", songTitle);
    formData.append("description", songDescription);
    formData.append("file", file);
    formData.append("album", album);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/v1/songs/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchSongs();
      setSongTitle("");
      setSongDescription("");
      setFile(null);
      setAlbum("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setBtnLoading(false);
    }
  };

  // ADD THUMBNAIL
  const addThumbnailHandler = async (id: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/v1/songs/${id}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchSongs();
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setBtnLoading(false);
    }
  };

  // For Deletion
  const deleteAlbum= async(id:string)=>{
    if(confirm("Are you sure you want to delete this album?")){
      setBtnLoading(true);
      try {
        const {data} = await axios.delete(`${server}/api/v1/album/${id}`,{
          headers:{
            token:localStorage.getItem("token"),
          }
        }
        );
        toast.success(data.message);
        fetchSongs()
        fetchAlbums()
        setBtnLoading(false)
      } catch (error:any) {
         toast.error(error.response?.data?.message || "An error occurred");
        setBtnLoading(false)
      }
    }
  }



    const deleteSong= async(id:string)=>{
    if(confirm("Are you sure you want to delete this song?")){
      setBtnLoading(true);
      try {
        const {data} = await axios.delete(`${server}/api/v1/song/${id}`,{
          headers:{
            token:localStorage.getItem("token"),
          }
        }
        );
        toast.success(data.message);
        fetchSongs()
        setBtnLoading(false)
      } catch (error:any) {
         toast.error(error.response?.data?.message || "An error occurred");
        setBtnLoading(false)
      }
    }
  }

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link
        to={"/"}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Go to Home Page
      </Link>

      {/* ADD ALBUM */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
      <form
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4"
        onSubmit={addAlbumHandler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          value={albumDescription}
          onChange={(e) => setAlbumDescription(e.target.value)}
          required
        />

        <input
          type="file"
          className="auth-input"
          accept="image/*"
          onChange={fileChangeHandler}
          required
        />

        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnLoading}
        >
          {btnLoading ? "Please Wait..." : "Add"}
        </button>
      </form>

      {/* ADD SONG */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Song</h2>
      <form
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4"
        onSubmit={addSongHandler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          value={songDescription}
          onChange={(e) => setSongDescription(e.target.value)}
          required
        />

        <input
          type="file"
          className="auth-input"
          accept="audio/*"
          onChange={fileChangeHandler}
          required
        />

        <select
          className="auth-input"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        >
          <option value="">Choose Album</option>
          {albums?.map((e: any, i: number) => (
            <option value={e.id} key={i}>
              {e.title}
            </option>
          ))}
        </select>

        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnLoading}
        >
          {btnLoading ? "Please Wait..." : "Add"}
        </button>
      </form>

      {/* ALBUMS */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Albums</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {albums?.map((e, i) => (
            <div className="bg-[#181818] rounded-lg shadow-md p-4" key={i}>
              {e.thumbnail ? (
                <img src={e.thumbnail} className="mr-1 w-52 h-52" alt="" />
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <input type="file" onChange={fileChangeHandler} />
                  <button
                    className="auth-btn"
                    style={{ width: "200px" }}
                    disabled={btnLoading}
                    onClick={() => addThumbnailHandler(e.id)}
                  >
                    {btnLoading ? "Please Wait..." : "Add Thumbnail"}
                  </button>
                </div>
              )}

              <h4 className="text-lg font-bold">{e.title.slice(0, 30)}...</h4>
              <h4 className="text-lg font-bold">
                {e.description.slice(0, 20)}..
              </h4>
              <button
                disabled={btnLoading}
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={()=>deleteAlbum(e.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SONGS */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {songs?.map((e, i) => (
            <div className="bg-[#181818] rounded-lg shadow-md p-4" key={i}>
              <img src={e.thumbnail} className="mr-1 w-52 h-52" alt="" />
              <h4 className="text-lg font-bold">{e.title.slice(0, 30)}...</h4>
              <h4 className="text-lg font-bold">
                {e.description.slice(0, 20)}..
              </h4>
              <button
                disabled={btnLoading}
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={()=>deleteSong(e.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
