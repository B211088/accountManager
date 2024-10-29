import mongoose from "mongoose";

const schema = new mongoose.Schema({
  idTiktok: {
    type: String,
    required: true,
  },
  accountGoogle: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
  pertain: {
    type: Number,
  },
});

export const AccountsModel = mongoose.model("accounts", schema);
