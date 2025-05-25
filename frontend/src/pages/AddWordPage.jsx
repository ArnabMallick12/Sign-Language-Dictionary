import React from 'react';
import AddWordForm from '../components/AddWordForm';

function AddWordPage() {
  return (
    <div className="flex-1 h-full w-full">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Add New Word</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Add a new sign language word to the dictionary. Include an image or video to help others learn the sign.
          </p>
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <AddWordForm />
        </div>
      </div>
    </div>
  );
}

export default AddWordPage;
