import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteWord } from '../store/slices/wordsSlice';
import EditWordModal from './EditWordModal';

const WordCard = ({ word, definition, imageUrl, videoUrl, _id }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteWord(_id)).unwrap();
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Failed to delete word:', error);
    }
  };

  const isYouTubeVideo = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  const videoId = isYouTubeVideo ? videoUrl.split('v=')[1]?.split('&')[0] : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-900">{word}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
              title="Edit word"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
              title="Delete word"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{definition}</p>
        
        {imageUrl && !imageError && (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt={`Sign for ${word}`}
              className="w-full h-48 object-contain rounded-lg"
              onError={handleImageError}
            />
          </div>
        )}

        {videoUrl && !videoError && (
          <div className="mb-4">
            {isYouTubeVideo ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Video for ${word}`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                src={videoUrl}
                controls
                className="w-full h-64 object-cover rounded-lg"
                title={`Video for ${word}`}
                onError={handleVideoError}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {imageError && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Image could not be loaded. Please check the URL.
                </p>
              </div>
            </div>
          </div>
        )}

        {videoError && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Video could not be loaded. Please check the URL.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditWordModal
          word={{ _id, word, definition, imageUrl, videoUrl }}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Delete Word</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{word}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

WordCard.propTypes = {
  _id: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
};

export default WordCard;
