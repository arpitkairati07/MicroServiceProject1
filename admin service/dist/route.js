import { addAlbum } from './controller.js';
import uploadFile, { isAuthenticated } from './middleware.js';
import express from 'express';
const router = express.Router();
router.post("/album/new", isAuthenticated, uploadFile, addAlbum);
export default router;
//# sourceMappingURL=route.js.map