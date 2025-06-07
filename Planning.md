# 🔗 Advanced MERN URL Shortener - Planning Document

## 📌 Project Description

A full-featured URL shortener where users can create, manage, and track short links. Includes authentication, profile management, QR code, and analytics (IP, device, click count).

---

## 🧰 Tech Stack

### 🖥️ Frontend

- React.js + Vite
- ShadCN UI
- Context API
- Axios
- React Router DOM

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- nanoid (for unique short codes)
- bcryptjs / JWT (for auth)
- nanoid (short and unique url)
- Google OAuth 2.0
- User-Agent Parser (device detection)
- geoip-lite (IP location detection)
- qrcode (QR code generation)

### 🧪 Tools & Utilities

- Postman
- dotenv
- CORS
- Git & GitHub
- VS Code
- el lint

## 🧪 Testing & Dev Tools

### ✅ Testing (Jest)

- [x] Unit tests for backend routes (using Jest + Supertest)
- [x] Test for URL shortening logic
- [x] Test user authentication functions
- [x] Setup coverage report

### ✅ Git Hooks (Husky)

- [x] Setup Husky pre-commit hook
- [x] Run lint / tests before commit
- [x] Prevent pushing broken or untested code

---

## 🔐 Authentication Features

- [x] Register with email + password
- [x] Login with email + password
- [x] Login with Google OAuth
- [x] Forgot/reset password via email
- [x] JWT-based session token system
- [x] Secure password hashing with bcrypt

---

## 👤 User Profile

- [x] Upload profile photo
- [x] Edit user profile
- [x] View own created URLs and stats

---

## 🔗 URL Shortener Features

- [x] Input long URL → get short URL
- [x] Auto-generate short code using `nanoid`
- [x] Customige URL
- [x] Store short & original URLs in DB
- [x] Redirect short URL to original (open in new tab)
- [x] Copy short URL to clipboard
- [x] Generate and download QR code for short link

---

## 📊 Analytics Features

- [x] Track number of clicks
- [x] Track IP address
- [x] Detect device type (mobile/desktop)
- [x] Show geo-location (country/city) using IP
- [x] Show list of clicks by device and location

---

## 🌟 Extra Feature Ideas

- [x] Custom alias for short URLs (e.g. `/om`)
- [x] Link Preview Analytics (Preview how the link will appear when shared on WhatsApp, Twitter, or Facebook.)
- [x] Set expiration date for links
- [x] Dashboard with charts (using Chart.js or Recharts)
- [x] Password-protected links

---

## 📂 Folder Structure

```plaintext
mern-url-shortener/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   └── App.jsx
```
