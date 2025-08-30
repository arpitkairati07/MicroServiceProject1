import mongoose, { Schema, Model, Types } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    playlist: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=model.js.map