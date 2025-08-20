import Note from "../models/Notes.js";

export async function getNotes(req, res) {
  const userID = req.userID;
  try {
    const result = await Note.find({ userID });
    res.status(200).json({ success: true, message: "Notes Fetched" ,result });
  } catch (err) {
    res
      .status(400)
      .json({ success: true, message: "Server Error", errorMsg: err });
  }
}

export async function createNote(req, res) {
  const userID = req.userID;
  const { title, content, color } = req.body;
  try {
    const result = await Note.create({
      title,
      content,
      color,
      userID
    });
    res.status(201).json({ success: true, message: "Note Created" });
  } catch (err) {
    res
      .status(400)
      .json({ success: true, message: "Server Error", errorMsg: err });
  }
}

export async function deleteNote(req, res) {
  const { id } = req.params;
  try {
    await Note.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Note Deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ success: true, message: "Server Error", errorMsg: err });
  }
}
