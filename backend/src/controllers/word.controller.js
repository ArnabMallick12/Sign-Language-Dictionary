import Word from '../models/word.model.js';

export const getWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching words', error });
  }
}

export const getAWord = async (req, res) => {
    const { query } = req.params;
    
    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }
    
    try {
        // Make the search case-insensitive and use regex for partial matches
        const words = await Word.find({
            $or: [
                { word: { $regex: new RegExp(query, 'i') } },
                { definition: { $regex: new RegExp(query, 'i') } }
            ]
        });
        
        res.status(200).json(words);
    } catch (error) {
        res.status(500).json({ message: 'Error searching words', error: error.message });
    }
}

export const addWord = async (req, res) => {
    const { word, definition, imageUrl, videoUrl } = req.body;
    
    if (!word || !definition) {
        return res.status(400).json({ message: 'Word and definition are required' });
    }
    
    try {
        const newWord = new Word({
             word, 
             definition, 
             imageUrl, 
             videoUrl 
            });

        await newWord.save();
        res.status(201).json(newWord);
    } catch (error) {
        res.status(500).json({ message: 'Error adding word', error });
    }
}

// Update a word
export const updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Word ID is required' });
    }

    const word = await Word.findById(id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    if (req.body.word) word.word = req.body.word;
    if (req.body.definition) word.definition = req.body.definition;
    if (req.body.imageUrl) word.imageUrl = req.body.imageUrl;
    if (req.body.videoUrl) word.videoUrl = req.body.videoUrl;

    const updatedWord = await word.save();
    res.json(updatedWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a word
export const deleteWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    await word.deleteOne();
    res.json({ message: 'Word deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};