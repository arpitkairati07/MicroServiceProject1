import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql } from "./config/db.js";
import { get } from "http";
export const addAlbum = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            message: "Only Admins can add Album"
        });
        return;
    }
    const { title, description } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            message: "File is required"
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        return res.status(500).json({
            message: "Something went wrong"
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, { folder: "album" });
    const result = await sql `
        INSERT INTO albums (title, description, thumbnail) VALUES(${title}, ${description}, ${cloud.secure_url}) RETURNING *;
        `;
    res.json({
        message: "Album added successfully",
        album: result[0],
    });
});
// ADD SONGS
export const addSongs = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            message: "Only Admins can add Album"
        });
        return;
    }
    const { title, description, album } = req.body;
    const isAlbum = await sql `SELECT * FROM albums WHERE id=${album}`;
    if (isAlbum.length === 0) {
        return res.status(400).json({
            message: "No album with this id exists"
        });
        return;
    }
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            message: "File is required"
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        return res.status(500).json({
            message: "Something went wrong"
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, { folder: "songs", resource_type: "video" });
    const result = await sql `
        INSERT INTO songs (title, description, audio, album_id) VALUES(${title}, ${description}, ${cloud.secure_url}, ${album}) RETURNING *;
        `;
    res.json({
        message: "Song added successfully",
        song: result[0],
    });
});
// For the Thumbnail
export const addThumbnail = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            message: "Only Admins can add Album"
        });
        return;
    }
    const song = await sql `SELECT * FROM songs WHERE id=${req.params.id}`;
    if (song.length === 0) {
        return res.status(400).json({
            message: "No song with this id exists"
        });
        return;
    }
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            message: "File is required"
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        return res.status(500).json({
            message: "Something went wrong"
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, { folder: "songs" });
    const result = await sql `UPDATE songs SET thumbnail=${cloud.secure_url} WHERE id=${req.params.id} RETURNING *;`;
    res.json({
        message: "Thumbnail added successfully",
        song: result[0],
    });
});
// Delete Album
export const deleteAlbum = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            message: "Only Admins can delete Album"
        });
        return;
    }
    const { id } = req.params;
    const isAlbum = await sql `SELECT * FROM albums WHERE id=${id}`;
    if (isAlbum.length === 0) {
        return res.status(400).json({
            message: "No album with this id exists"
        });
        return;
    }
    await sql `DELETE FROM songs WHERE album_id=${id};`;
    await sql `DELETE FROM albums WHERE id=${id};`;
    res.json({
        message: "Album and its songs deleted successfully"
    });
});
//# sourceMappingURL=controller.js.map