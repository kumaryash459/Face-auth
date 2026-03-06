# Face Authentication System

A full-stack **Face Authentication Web Application** that allows users to **register using their face** and later **log in using real-time facial verification with liveness detection**.

The system ensures that only **registered users with a real face (not photos)** can access the dashboard.

---

# Features

* Face Registration with multiple angles
* Real-time face login
* Liveness detection (head movement / blink)
* Secure face verification using DeepFace
* React frontend with webcam access
* Flask backend API
* Dataset storage for registered users
* Protected dashboard access

---

# Tech Stack

Frontend

* React (Vite)
* JavaScript
* WebRTC (Webcam)

Backend

* Python
* Flask
* OpenCV
* DeepFace

AI / ML

* FaceNet model (via DeepFace)

---

# Project Structure

```
Face-Authentication/
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── Backend/
│   ├── app.py
│   ├── dataset/
│   │   └── (registered users images)
│   └── temp/
│       └── login.jpg
│
└── README.md
```

---

# How the System Works

1. User opens the website.
2. User chooses **Signup or Login**.

### Signup Flow

1. User captures **6–7 face images from different angles**.
2. Images are sent to the backend.
3. Backend saves images in the **dataset folder**.
4. User is registered and redirected to the dashboard.

### Login Flow

1. User opens webcam.
2. System performs **liveness detection** (head movement).
3. If liveness is verified:
4. Face is compared with stored images using **DeepFace**.
5. If matched → user enters dashboard.

---

# Requirements

Make sure you have:

* Python **3.9 – 3.11**
* Node.js **18+**
* npm or yarn
* Webcam

---

# Backend Setup (Flask + AI)

### Step 1 — Go to backend folder

```
cd Backend
```

### Step 2 — Install dependencies

```
pip install flask
pip install flask-cors
pip install deepface
pip install opencv-python
pip install numpy
pip install mtcnn
```

### Step 3 — Run the backend server

```
python app.py
```

Server will start at:

```
http://localhost:5000
```

---

# Frontend Setup (React)

### Step 1 — Go to frontend folder

```
cd Frontend
```

### Step 2 — Install packages

```
npm install
```

### Step 3 — Start the React app

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# How to Use the System

### Register

1. Open the website
2. Click **Signup**
3. Capture **6–7 images**
4. Click **Register**
5. You will be redirected to the dashboard

---

### Login

1. Click **Login**
2. Allow webcam access
3. Move head or blink to pass liveness check
4. System verifies face
5. If matched → Dashboard access

---

# Security Implemented

* Liveness detection (prevents photo attacks)
* Face similarity threshold
* Multiple angle face dataset
* Server-side verification
* Restricted dashboard access

---

# Future Improvements

Possible improvements:

* Store **face embeddings instead of images**
* Add **JWT authentication**
* Use **MediaPipe for blink detection**
* Deploy backend with **Docker**
* Deploy frontend on **Vercel**
* Use **MongoDB to store users**

---

# Author

**Kumar Yash**

Engineering Student
Full Stack + AI Developer
