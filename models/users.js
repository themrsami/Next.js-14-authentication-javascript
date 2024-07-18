import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: "user" },
    },
    {
        timestamps: true,
    }
);


const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
