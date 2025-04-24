# Blog Application

A full-stack blog app built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can authenticate, create, read, update, and delete blog posts, and interact with content via comments.

---

## Features
- **User Authentication**: JWT-based signup and login.
- **Blog Management**: Create, edit, view, and delete posts.
- **Commenting**: Add and delete comments.
- **Responsive UI**: Works seamlessly on desktop and mobile.
- **Dockerized**: Easy deployment with Docker.

---

## Tech Stack
- **Frontend**: React, Material-UI, React Router
- **Backend**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB (local or Dockerized)

---

## Prerequisites
- **Node.js** (v18+)
- **Docker** (optional)
- **MongoDB** (local or Docker)

---

## Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/blog-application.git
   cd blog-application
   ```

2. **Configure Environment Variables**
   In `server/.env`, add:
   ```env
   ACCESS_SECRET_KEY=your_access_secret_key
   REFRESH_SECRET_KEY=your_refresh_secret_key
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   ```

3. **Install Dependencies**
   - Backend: `cd server && npm install`
   - Frontend: `cd client && npm install`

---

## Running the Application

### Using Docker (Recommended)
Run everything with Docker:
```bash
docker-compose up --build
```
Access the app:
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:8000`
- **Mongo Express**: `http://localhost:8081`

### Without Docker
- **Start Backend**: `cd server && npm start`
- **Start Frontend**: `cd client && npm run dev`

---

## API Endpoints
- **POST /signup**: User signup
- **POST /login**: User login
- **POST /create**: Create a post
- **GET /posts**: Get all posts
- **POST /comment/new**: Add a comment

---

## License
MIT License. See the [LICENSE](LICENSE) file for more info.
```

This version is more concise while retaining the essential information for setting up and running the application. It provides a quick overview, installation steps, and usage instructions without overwhelming the reader with too much detail.
