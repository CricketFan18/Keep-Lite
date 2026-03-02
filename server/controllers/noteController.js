import Note from "../models/Notes.js";

export async function getNotes(req, res) {
  const userID = req.userID;
  //Get page from query, default to 1. Limit to 15 notes per request.
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;

  try {
    const result = await Note.find({ userID })
      .sort({ createdAt: -1 }) // Sort newest first
      .skip(skip)
      .limit(limit);
      
    const total = await Note.countDocuments({ userID });
    const hasMore = skip + result.length < total;

    res.status(200).json({ success: true, message: "Notes Fetched", result, hasMore });
  } catch (err) {
    res.status(400).json({ success: false, message: "Server Error", errorMsg: err });
  }
}

export async function createNote(req, res) {
  const userID = req.userID;
  const { title, content, color } = req.body;
  try {
    const newNote = await Note.create({
      title,
      content,
      color,
      userID
    });
    // FIXED: Now we actually return the new note so the frontend has the _id!
    res.status(201).json({ success: true, message: "Note Created", note: newNote });
  } catch (err) {
    res.status(400).json({ success: false, message: "Server Error", errorMsg: err });
  }
}

// ... updateNote and deleteNote stay exactly the same as your original code ...
export async function updateNote(req, res) {
  const { id } = req.params;
  const userID = req.userID;
  const { title, content, color } = req.body;

  try {
    const note = await Note.findOne({ _id: id, userID });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (color !== undefined) note.color = color;

    await note.save();
    res.status(200).json({ success: true, message: "Note Updated", note });
  } catch (err) {
    res.status(400).json({ success: false, message: "Server Error", errorMsg: err });
  }
}

export async function deleteNote(req, res) {
  const { id } = req.params;
  try {
    await Note.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Note Deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Server Error", errorMsg: err });
  }
}