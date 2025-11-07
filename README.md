# Campus Connect

A personality matching app for students to find study partners, sports buddies, and friends on campus.

## Setup Instructions

### Backend (Flask API)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - **macOS/Linux:**
     ```bash
     source .venv/bin/activate
     ```
   - **Windows:**
     ```bash
     .venv\Scripts\activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the backend server:
   ```bash
   python app.py
   ```
   
   The backend will run on **http://localhost:5001**

### Frontend (React App)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   
   The frontend will run on **http://localhost:3000** and should open automatically in your browser.

## Features

- User registration and login
- Profile creation with tags and interests
- Personality-based matching algorithm
- Real-time chat using Firebase

## Tech Stack

- **Backend:** Flask, SQLAlchemy, SQLite
- **Frontend:** React, Tailwind CSS, Firebase (for chat)
- **Database:** SQLite (campus_connect.db)

## Notes

- The backend runs on port **5001** (not 5000)
- The frontend is configured to connect to `http://localhost:5001/api`
- Firebase is already configured for the chat feature



# Solace
