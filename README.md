# DevPortfolio Backend — MERN Stack API

## 📁 Folder Structure

```
backend/
├── server.js            ← Express app entry point
├── package.json         ← Dependencies
├── .env.example         ← Environment variables template
├── seed.js              ← Database seeder
│
├── models/
│   ├── TeamMember.js    ← Team member schema
│   ├── Slide.js         ← Slider schema
│   └── Admin.js         ← Admin user schema (with bcrypt)
│
├── routes/
│   ├── team.js          ← /api/team  (CRUD + image upload)
│   ├── slides.js        ← /api/slides (CRUD + image upload)
│   └── auth.js          ← /api/auth  (login, register, me)
│
├── middleware/
│   ├── upload.js        ← Multer config (5MB, images only)
│   └── auth.js          ← JWT protect middleware
│
└── uploads/             ← Saved images (auto-created)
```

---

## ⚡ Setup Steps

### 1. Install dependencies
```bash
npm install
```

### 2. Create .env file
```bash
cp .env.example .env
```
Edit `.env` with your MongoDB URI and a strong JWT secret.

### 3. Seed the database
```bash
npm run seed
```
This creates:
- 6 team members
- 4 slides
- Admin user → `admin@devportfolio.com` / `admin123`

### 4. Start the server
```bash
npm run dev      # development (nodemon)
npm start        # production
```

---

## 🔌 API Reference

### Auth Routes `/api/auth`

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/register` | username, email, password | Register admin |
| POST | `/login` | email, password | Login → returns JWT token |
| GET | `/me` | — (token required) | Get current admin info |
| PUT | `/change-password` | currentPassword, newPassword | Change password |

**Login Response:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "data": { "id": "...", "username": "admin", "email": "admin@devportfolio.com" }
}
```

---

### Team Routes `/api/team`

| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/` | ❌ Public | ?search=&role= | Get all members |
| GET | `/:id` | ❌ Public | — | Get one member |
| POST | `/` | ✅ Token | FormData: name, role, bio, linkedin, github, image(file) | Add member |
| PUT | `/:id` | ✅ Token | FormData (same as POST) | Update member |
| DELETE | `/:id` | ✅ Token | — | Delete member + image |

**Query examples:**
```
GET /api/team
GET /api/team?role=Developer
GET /api/team?search=sara
GET /api/team?search=sara&role=Designer
```

---

### Slides Routes `/api/slides`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ❌ Public | Get all slides |
| GET | `/:id` | ❌ Public | Get one slide |
| POST | `/` | ✅ Token | Add slide (FormData with image) |
| PUT | `/:id` | ✅ Token | Update slide |
| DELETE | `/:id` | ✅ Token | Delete slide |

---

## 🔐 Using Protected Routes (Frontend)

### Step 1: Login
```javascript
const res = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@devportfolio.com', password: 'admin123' })
});
const { token } = await res.json();
localStorage.setItem('token', token);
```

### Step 2: Add team member with image
```javascript
const fd = new FormData();
fd.append('name', 'New Member');
fd.append('role', 'Developer');
fd.append('bio', 'Bio here...');
fd.append('linkedin', 'https://linkedin.com/in/...');
fd.append('github', 'https://github.com/...');
fd.append('image', fileInput.files[0]);   // actual file

const res = await fetch('http://localhost:5000/api/team', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
  body: fd   // NO Content-Type header — multer sets it automatically
});
const data = await res.json();
```

---

## 🌐 Deployment

| Part | Platform |
|------|----------|
| Backend | Railway / Render / Heroku |
| Database | MongoDB Atlas (free tier) |
| Images | Cloudinary (optional, for production) |

---

## 📦 Tech Stack

- **Node.js** + **Express.js** — server
- **MongoDB** + **Mongoose** — database & ORM
- **Multer** — file uploads
- **JWT** — authentication
- **Bcryptjs** — password hashing
