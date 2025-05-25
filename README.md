# Sign Language Dictionary

A full-stack web application for learning sign language through an interactive dictionary. Users can search, add, edit, and delete sign language words with their definitions, images, and videos.

## Features

- 🔍 **Search Functionality**
  - Real-time word search
  - Case-insensitive matching
  - Partial word matching
  - Clear feedback for no results

- 📝 **Word Management**
  - Add new sign language words
  - Edit existing words
  - Delete words
  - View word details

- 🎥 **Media Support**
  - Image display for sign language demonstrations
  - Video support (direct URLs and YouTube)
  - Responsive media containers
  - Fallback handling for failed media loads

- 🎨 **Modern UI/UX**
  - Clean, responsive design
  - Mobile-friendly interface
  - Loading states and error handling
  - Intuitive navigation

## Tech Stack

- **Frontend**
  - React.js
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - Axios for API requests

- **Backend**
  - Node.js with Express
  - MongoDB with Mongoose
  - RESTful API architecture

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sign-language-dictionary
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with your MongoDB connection string
   echo "MONGODB_URI=your_mongodb_connection_string" > .env
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Backend API: http://localhost:5001
   - Frontend: http://localhost:3000

## API Endpoints

- `GET /api/words` - Get all words
- `GET /api/words/:word` - Search for words
- `POST /api/words` - Add a new word
- `PUT /api/words/:id` - Update a word
- `DELETE /api/words/:id` - Delete a word

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 