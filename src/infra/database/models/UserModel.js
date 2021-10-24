import mongoose from "mongoose";
import User from "domain/entities/User";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      default: "",
    },
    last_name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    photo_url: {
      type: String,
    },
    confirm_email_token: String,
    confirm_email_expiry: Date,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: {
      virtuals: true,
      retainKeyOrder: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.loadClass(User);

export default mongoose.model("User", userSchema);
