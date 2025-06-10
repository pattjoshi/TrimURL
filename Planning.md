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

- [] Test for URL shortening logic
- [] Test user authentication functions
- [] Setup coverage report

### ✅ Git Hooks (Husky)

- [x] Setup Husky pre-commit hook
- [x] Run lint / tests before commit
- [x] Prevent pushing broken or untested code

---

## 🔐 Authentication Features

- [] JWT-based session token system
- [] Secure password hashing with bcrypt
- [] Create Account full name , email + password, upload profile image
- [] Otp verification send to an email
- [] OTP screen
- [] After create show Deshboard not login page
- [] Login with email + password email
- [] Login with Google OAuth
- [] Forgot/reset password via email (OTP)

---

## 👤 User Profile

- [] Upload profile photo
- [] Edit user profile
- [] View own created URLs and stats

---

## 🔗 URL Shortener Features

- [] Input long URL → get short URL
- [] Auto-generate short code using `nanoid`
- [] Customige URL
- [] Store short & original URLs in DB
- [] Redirect short URL to original (open in new tab)
- [] Copy short URL to clipboard
- [] Generate and download QR code for short link

---

## 📊 Analytics Features

- [] Track number of clicks
- [] Track IP address
- [] Detect device type (mobile/desktop)
- [] Show geo-location (country/city) using IP
- [] Show list of clicks by device and location

---

## 🌟 Extra Feature Ideas

- [] Custom alias for short URLs (e.g. `/om`)
- [] Link Preview Analytics (Preview how the link will appear when shared on WhatsApp, Twitter, or Facebook.)
- [] Set expiration date for links
- [] Dashboard with charts (using Chart.js or Recharts)
- [] Password-protected links

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
