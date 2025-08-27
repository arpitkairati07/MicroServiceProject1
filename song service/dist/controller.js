import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";
// Get all Albums
export const getAllAblum = TryCatch(async (req, res) => {
    let albums;
    albums = await sql `SELECT * FROM albums`;
    res.json(albums);
});
// Get all Songs
export const getAllSongs = TryCatch(async (req, res) => {
    let songs;
    songs = await sql `SELECT * FROM songs`;
    res.json(songs);
});
// Get all songs of a particular album
export const getAllSongsOfAlbum = TryCatch(async (req, res) => {
    const { id } = req.params;
    let album, songs;
    album = await sql `SELECT * FROM albums WHERE id=${id}`;
    if (album.length === 0) {
        return res.status(404).json({ message: "Album not found" });
    }
    songs = await sql `SELECT * FROM songs WHERE album_id=${id}`;
    const response = { songs, album: album[0] };
    res.json(response);
});
// Get single song by id
export const getSingleSong = TryCatch(async (req, res) => {
    const song = await sql `SELECT * FROM songs WHERE id=${req.params.id}`;
    if (song.length === 0) {
        return res.status(404).json({ message: "Song not found" });
    }
    res.json(song[0]);
});
//# sourceMappingURL=controller.js.map