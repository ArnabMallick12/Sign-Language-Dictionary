import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios';

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async () => {
    const response = await axiosInstance.get('/words');
    return response.data;
  }
);

export const searchWord = createAsyncThunk(
  'words/searchWord',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/words/search/${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search words');
    }
  }
);

export const addWord = createAsyncThunk(
  'words/addWord',
  async (wordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/words', wordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add word');
    }
  }
);

export const updateWord = createAsyncThunk(
  'words/updateWord',
  async ({ id, wordData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/words/${id}`, wordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update word');
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/words/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete word');
    }
  }
);

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchWord.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchWord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(searchWord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to search words';
      })
      .addCase(addWord.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addWord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add word';
      })
      .addCase(updateWord.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateWord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update word';
      })
      .addCase(deleteWord.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete word';
      });
  },
});

export const { setSearchTerm, clearError } = wordsSlice.actions;
export default wordsSlice.reducer; 