# 🏥 MediGuide – Smart Healthcare Navigation System

MediGuide is a web-based healthcare navigation system that helps users identify the appropriate medical specialist based on their symptoms and find nearby hospitals. The application provides symptom-based recommendations, hospital details, Google Maps navigation, search history, favorites, and user authentication.

---

## 📌 Features

- 🔍 Search hospitals based on symptoms
- 👨‍⚕️ Recommended specialist for each symptom
- 🏥 Nearby hospital recommendations
- 📍 Google Maps navigation to hospitals
- ⭐ Hospital ratings and details
- ❤️ Save favorite hospitals
- 🕒 Search history
- 🌙 Light/Dark mode
- 🔐 User Login & Signup using Firebase Authentication
- ☁️ Firebase Firestore database integration
- 📱 Responsive design for desktop and mobile

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Firebase Authentication
- Firebase Firestore

### Hosting
- Render
- GitHub

---

## 📂 Project Structure

```
mediguide/
│
├── index.html
├── login.html
├── signup.html
├── style.css
├── script.js
├── firebase.js
├── login.js
├── signup.js
├── symptoms.js
├── hospitals.json
├── assets/
│   ├── images
│   └── icons
└── README.md
```

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/balagopal-reddi/mediguide.git
```

### 2. Open the Project

Open the project folder in Visual Studio Code.

### 3. Start Live Server

Install the Live Server extension and run:

```
Go Live
```

The application will open at:

```
http://127.0.0.1:5500/
```

---

## 🔥 Firebase Setup

Create a Firebase project and enable:

- Authentication
- Firestore Database

Replace the Firebase configuration inside:

```
firebase.js
```

Example:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

---

## 📊 Firestore Collections

### hospital

| Field | Type |
|-------|------|
| name | String |
| address | String |
| city | String |
| state | String |
| specialty | String |
| rating | Number |
| phone | String |
| emergency | Boolean |
| maplink | String |

---

### symptoms

| Field | Type |
|-------|------|
| name | String |
| description | String |
| specialty | String |
| precautions | String |
| possible diseases | String |
| severity | String |
| icon | String |

---

## ✨ Main Functionalities

- Symptom-based hospital search
- Specialist recommendation
- Hospital details popup
- Google Maps navigation
- Hospital filtering
- Favorites
- Search history
- Dark mode
- Authentication

---

## 📸 Screenshots

Add screenshots here.

Example:

```
screenshots/home.png

screenshots/search.png

screenshots/details.png

screenshots/login.png
```

---

## 🌐 Live Demo

**Render**

[https://mediguide-44a3.onrender.com](https://mediguide-44a3.onrender.com)

## 💻 GitHub Repository

[https://github.com/balagopal-reddi/mediguide](https://github.com/balagopal-reddi/mediguide)

## 🔮 Future Enhancements

- GPS-based nearby hospital detection
- Mobile application
- AI chatbot for health assistance
- Multilingual support
- Online appointment booking
- Doctor availability status
- Medicine recommendations
- Emergency ambulance tracking
- Email notifications
- Role-based Admin Panel

---

## 👨‍💻 Developer

**Jartha Balagopal Reddi**

B.Tech – Information Technology

Vishnu Institute of Technology, Bhimavaram

GitHub

https://github.com/balagopal-reddi

---

## 📄 License

This project is developed for educational and academic purposes.

© 2026 Jartha Balagopal Reddi. All Rights Reserved.
