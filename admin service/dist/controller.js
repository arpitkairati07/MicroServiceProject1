import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql } from "./config/db.js";
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
//# sourceMappingURL=controller.js.map