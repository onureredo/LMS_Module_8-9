import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  coverImage: String,
});

const Book = mongoose.model('Book', bookSchema);
