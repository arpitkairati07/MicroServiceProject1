import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.token;
        console.log('Token:', token);
        if (!token) {
            res.status(401).json({
                message: "Not Authorized"
            });
            return;
        }
        const { data } = await axios.get(`${process.env.User_Url}/api/v1/user/me`, {
            headers: { token }
        });
        req.user = data;
        next();
    }
    catch (error) {
        console.log('Auth error:', error);
        res.status(401).json({
            message: "Not Authorized in catch"
        });
    }
};
// Multer Setup
import multer from 'multer';
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file");
export default uploadFile;
//# sourceMappingURL=middleware.js.map