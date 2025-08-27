import express from 'express'
import { getAllAblum, getAllSongs, getAllSongsOfAlbum, getSingleSong } from './controller.js';

const router=express.Router();
router.get("/album/all",getAllAblum);
router.get("/songs/all",getAllSongs);
router.get("/album/:id",getAllSongsOfAlbum);
router.get("/song/:id",getSingleSong);

export default router;
