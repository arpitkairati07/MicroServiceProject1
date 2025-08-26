import axios from 'axios';
import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from "express";


dotenv.config();

interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}

interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuthenticated = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.headers.token as string;
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
    } catch (error) {
        console.log('Auth error:', error);
        res.status(401).json({
            message: "Not Authorized in catch"
        });
    }
};

// Multer Setup

import multer from 'multer';

const storage=multer.memoryStorage();

const uploadFile=multer({storage}).single("file");

export default uploadFile;