# 🎙️ Assistica Backend

**Assistica Backend** is the server-side application for **Assistica**, a voice-enabled virtual assistant.  
It manages **user authentication**, **assistant configuration**, and **AI command processing**.  

Built with **Node.js**, **Express**, and **MongoDB**.

---

## 🌐 Base URL

- **Deployed Backend URL:** `https://assistica-backend.onrender.com`  
- This URL is used by the frontend for API communication.

---

## 📂 Project Structure & Explanation
## 📂 Project Structure

```text
Assistica_Backend/
├── Config/        # Configuration files for database, JWT, Cloudinary setup
├── Controllers/   # Functions to handle API logic and responses
├── Models/        # MongoDB schemas using Mongoose
├── Routes/        # Route definitions connecting endpoints to controllers
├── middleware/    # Custom middleware (authentication, file upload, etc.)
├── .env           # Environment variables (DB, JWT secret, Cloudinary URL)
├── server.js      # Entry point of the application
└── package.json   # Project metadata and dependencies


**Explanation:**
- **Config/**: Contains setup files like database connection, JWT generation, and Cloudinary upload configuration.  
- **Controllers/**: Implements the business logic for authentication, user management, and assistant commands.  
- **Models/**: Defines the MongoDB schemas (e.g., `User`).  
- **Routes/**: Maps HTTP endpoints to controller functions.  
- **middleware/**: Handles authentication, file uploads, and other reusable middleware functions.  
- **.env**: Stores sensitive information like database URI, JWT secret, and Cloudinary URL.  
- **server.js**: Starts the server and connects all routes and middleware.

---

## 🔑 APIs & Purpose

### 1. Authentication APIs

These endpoints handle **user registration, login, and logout**, securing the app using JWT in `httpOnly` cookies.

#### 🔹 Sign Up
- **Endpoint:** `POST /api/auth/signup`  
- **Purpose:** Create a new user account.  
- **Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
- **Response:** User object with JWT in cookie.  
- **Errors:** Email already exists, password too short.  

#### 🔹 Login  
- **Endpoint:** `POST /api/auth/login`  
- **Purpose:** Authenticate user & return JWT.  
- **Request body:** 
```json
{
"email": "john@example.com",
"password": "password123"
}
- **Response:** User object with JWT in cookie.  
- **Errors:** Email not found, invalid password.  

#### 🔹 Logout  
- **Endpoint:** `POST /api/auth/logout`  
- **Purpose:** Clear JWT cookie & end session.  
- **Response:**  
```json
{
"message": "Logout successful!"
}


---

### **2. User Management APIs**  

#### 🔹 Get Current User  
- **Endpoint:** `GET /api/user/me`  
- **Purpose:** Fetch authenticated user info.  
- **Response example:**
```json
{
"_id": "userId",
"name": "John Doe",
"email": "john@example.com",
"assistantName": "Gemini",
"assistantImage": "https://example.com/image.png",
"history": []
}
- **Error:** User not found.  

#### 🔹 Update Assistant  
- **Endpoint:** `PUT /api/user/assistant`  
- **Purpose:** Update assistant’s name or image.  
- **Request body (JSON):**
```json
{
"assistantName": "Gemini",
"imageUrl": "https://example.com/image.png"
}

- **Response:** Updated user object (without password).  
- **Error:** Update failed.  

---

### **3. Assistant Command API**  
#### 🔹 Ask to Assistant  
- **Endpoint:** `POST /api/user/ask`  
- **Purpose:** Send a command to AI assistant.  
- **Request body:**  
- **Response example:**  
```json
{
"type": "get-date",
"userInput": "What's the current date?",
"response": "current date is 2025-08-18"
}


**Supported Command Types:**  
- Date & Time: `get-date`, `get-time`, `get-day`, `get-month`  
- Social Media: `youtube-search`, `youtube-play`, `instagram-open`, `facebook-open`  
- Tools: `calculator-open`, `weather-show`  
- General Queries: `general`  

- **Error:** Returns a friendly fallback message if command not understood.  

---

---

## 🚀 Tech Stack  

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT (`httpOnly` cookies)  
- **File Management:** Cloudinary  
- **Deployment:** Render  

---

