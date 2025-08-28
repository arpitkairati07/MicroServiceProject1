
import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";
import { redisClient } from "./index.js";


// Get all Albums
export const getAllAblum = TryCatch(async (req, res) => {
    let albums;
    const CACHE_EXPIRY=1800; // 30 minutes

    if(redisClient.isReady){
        albums=await redisClient.get("albums");
    }
    if(albums){
        console.log("Data from Redis Cache");
        return res.json(JSON.parse(albums));
    }else{
        console.log("Data from Postgres");
        albums = await sql`SELECT * FROM albums`;
        if(redisClient.isReady){
            await redisClient.setEx("albums",CACHE_EXPIRY,JSON.stringify(albums));
        }
    }

    albums = await sql`SELECT * FROM albums`;
    res.json(albums);
});

// Get all Songs

export const getAllSongs = TryCatch(async (req, res) => {
    let songs;
    const CACHE_EXPIRY=1800; // 30 minutes

    if(redisClient.isReady){
        songs=await redisClient.get("songs");
    }

    if(songs){
        console.log("Data from Redis Cache");
        return res.json(JSON.parse(songs)); // as songs is string from redis
    }else{
        console.log("Data from Postgres");
        songs = await sql`SELECT * FROM songs`;
        if(redisClient.isReady){
            await redisClient.setEx("songs",CACHE_EXPIRY,JSON.stringify(songs));
        }   
    }


    songs = await sql`SELECT * FROM songs`;
    res.json(songs);
});

// Get all songs of a particular album

export const getAllSongsOfAlbum = TryCatch(async (req, res) => {
    const {id}=req.params;

    const CACHE_EXPIRY=1800; // 30 minutes
    if(redisClient.isReady){
        const cacheData=await redisClient.get(`album_songs_${id}`);
        if(cacheData){
            console.log("Data from Redis Cache");
            return res.json(JSON.parse(cacheData));
        }
    }


    let album,songs;
    album = await sql`SELECT * FROM albums WHERE id=${id}`;
    if(album.length===0){
        return res.status(404).json({message:"Album not found"});
    }

    songs = await sql`SELECT * FROM songs WHERE album_id=${id}`;
    const response = {songs,album:album[0]};
    if(redisClient.isReady){
        await redisClient.setEx(`album_songs_${id}`,CACHE_EXPIRY,JSON.stringify(response));
    }
    console.log("Data from Postgres");
    res.json(response);
});

// Get single song by id
export const getSingleSong = TryCatch(async (req, res) => {
    const song= await sql`SELECT * FROM songs WHERE id=${req.params.id}`;
    if(song.length===0){
        return res.status(404).json({message:"Song not found"});
    }
    res.json(song[0]);
});