import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  word: String,
  definition: String,
  imageUrl: String,
  videoUrl: String
});

const Word = mongoose.model('Word', WordSchema);
export default Word;
