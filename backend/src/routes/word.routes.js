import express from 'express';
import {getWords,getAWord,addWord,updateWord,deleteWord} from '../controllers/word.controller.js';
const router = express.Router();


// Get all words
router.get('/', getWords);

// Get a single word
router.get('/:word', getAWord);

// Create a new word
router.post('/', addWord);

// Update a word
router.put('/:id', updateWord);

// Delete a word
router.delete('/:id', deleteWord);

export default router;