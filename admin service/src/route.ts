import { addAlbum, addSongs, addThumbnail } from './controller.js';
import uploadFile, {  isAuthenticated } from './middleware.js';
import express from 'express'

const router = express.Router();
router.post("/album/new",isAuthenticated,uploadFile, addAlbum);
router.post("/songs/new",isAuthenticated,uploadFile, addSongs);
router.post("/songs/:id",isAuthenticated,uploadFile, addThumbnail);

export default router; 