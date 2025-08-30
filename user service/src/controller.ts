import TryCatch from "./TryCatch.js";
import type { AuthenticatedRequest } from "./middleware.js";
import { User } from "./model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET || "default_secret", 
    {
      expiresIn: "7d",
    }
  );


  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  res.status(201).json({
    message: "User registered successfully",
    user: userResponse,
    token,
  });
});



export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User doesn't exist",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "7d" }
  );
    
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  res.status(200).json({
    message: "User logged in successfully",
    user: userResponse,
    token,
  });
});


export const myProfile = TryCatch(async(req:AuthenticatedRequest,res)=>{
    const user=req.user;

    res.json(user);
})


export const addToPlaylist = TryCatch(async (req: AuthenticatedRequest, res) => {
  const userId = req.user?._id?.toString();

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  const songId = req.params.id;

  if (!songId) {
    return res.status(400).json({ message: "Song ID is required" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "No user with this id" });
  }

  if (user.playlist.includes(songId)) {

    user.playlist = user.playlist.filter((id) => id.toString() !== songId);
    await user.save();

    return res.status(200).json({
      message: "Song removed from playlist",
      playlist: user.playlist,
    });
  } else {
    user.playlist.push(songId);
    await user.save();

    return res.status(200).json({
      message: "Song added to playlist",
      playlist: user.playlist,
    });
  }
});
