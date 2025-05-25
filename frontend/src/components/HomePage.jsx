import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords, searchWord, setSearchTerm, clearError } from '../store/slices/wordsSlice';
import WordCard from './WordCard';

function HomePage() {
  const dispatch = useDispatch();
  const { items: words, status, error, searchTerm } = useSelector((state) => state.words);

  useEffect(() => {
    dispatch(fetchWords());
    dispatch(clearError());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchWord(searchTerm));
    } else {
      dispatch(fetchWords());
    }
  };

  return (
    <div className="flex-1 h-full w-full">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Sign Language Dictionary</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Search for sign language words and learn their meanings through images and videos.
          </p>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>

        {status === 'loading' && (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-black"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}
        
        {error && (
          <div className="w-full bg-red-100 border-l-4 border-red-400 p-4 rounded-lg mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {status !== 'loading' && words.length === 0 && !error && (
          <div className="w-full text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">No words found</h3>
            <p className="mt-1 text-sm text-gray-500 px-4">
              {searchTerm ? `No results found for "${searchTerm}". Try a different search term.` : 'No words in the dictionary yet.'}
            </p>
          </div>
        )}

        {words.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {words.map((word) => (
              <WordCard
                key={word._id}
                _id={word._id}
                word={word.word}
                definition={word.definition}
                imageUrl={word.imageUrl}
                videoUrl={word.videoUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
