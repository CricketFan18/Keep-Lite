import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  color: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",       // ← foreign key
    required: true,
  },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;