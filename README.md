# Campus Connect

A platform for students to connect with each other based on shared interests and personality traits.

## Features

- User authentication (register/login)
- Profile creation and management
- Matchmaking based on interests and tags
- Real-time chat functionality
- Responsive design for all devices

## Tech Stack

- **Frontend**: React.js
- **Backend**: Python (Flask)
- **Database**: PostgreSQL (Production), SQLite (Development)
- **Deployment**: Render.com

## Prerequisites

- Node.js 14+ and npm
- Python 3.8+
- Git
- Render.com account

## Local Development

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the development server:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## Deployment

### 1. Deploy Backend to Render

1. **Create a new Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Web Service**
   - Name: `campus-connect-backend`
   - Region: Choose the one closest to your users
   - Branch: `main`
   - Build Command: `./build.sh`
   - Start Command: `gunicorn wsgi:app`
   - Plan: Free (or paid for production)

3. **Set Environment Variables**
   - `PYTHON_VERSION`: `3.9.0`
   - `DATABASE_URL`: `postgresql://[user]:[password]@[host]:[port]/[database]` (from your PostgreSQL database)
   - `SECRET_KEY`: Generate with `python -c 'import secrets; print(secrets.token_hex())'`
   - `FRONTEND_URL`: `https://your-frontend-url.onrender.com` (update after deploying frontend)

### 2. Set Up PostgreSQL Database

1. In Render Dashboard, click "New +" → "PostgreSQL"
2. Configure:
   - Name: `campus-connect-db`
   - Database: `campus_connect`
   - User: `campus_connect_user`
   - Plan: Free
3. Copy the connection string and update `DATABASE_URL` in your backend service

### 3. Deploy Frontend to Render

1. **Create a new Static Site**
   - In Render Dashboard, click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Static Site**
   - Name: `campus-connect-frontend`
   - Branch: `main`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
   - Add environment variable:
     - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com/api`

3. **Update Backend CORS**
   - After frontend is deployed, update `FRONTEND_URL` in your backend service
   - Restart the backend service

## Environment Variables

### Backend (`.env`)
```
DATABASE_URL=postgresql://user:password@host:port/database
SECRET_KEY=your-secret-key
FRONTEND_URL=https://your-frontend-url.onrender.com
```

### Frontend (`.env`)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Troubleshooting

- **Database Connection Issues**: Verify `DATABASE_URL` is correct and the database is running
- **CORS Errors**: Ensure `FRONTEND_URL` matches your frontend URL exactly
- **Build Failures**: Check the build logs in the Render dashboard
- **Environment Variables**: Make sure all required variables are set in both frontend and backend

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
