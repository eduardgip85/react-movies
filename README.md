# 🎬 MoviesTMDB

A modern web application to explore movies, discover actors, and manage your personal favorites.

Built as a SPA using **React + TypeScript**, this project integrates with **TMDB API** for movie data and **Supabase** for authentication and user data.

---

## 🚀 Features

### 🔍 Explore Movies

* Browse popular movies
* Search movies by name
* Advanced filters:

  * Genre
  * Rating
  * Year
  * Language
  * Sorting

### 🎥 Movie Details

* Full movie information:

  * Overview
  * Release date
  * Runtime
  * Genres
* Cast list with actor navigation

### 👤 Authentication

* User registration & login (Supabase)
* Persistent session
* Protected routes

### ❤️ Favorites System

* Add/remove movies from favorites
* Quick toggle from movie cards
* Favorites page

### ⭐ Personal Rating

* Rate movies from 1 to 5 stars
* Ratings stored per user
* Editable from movie detail

### 📱 Responsive Design

* Mobile-first approach
* Collapsible navbar
* Optimized layout for all devices

---

## 🛠️ Tech Stack

* **Frontend**

  * React
  * TypeScript
  * Vite
  * TailwindCSS
  * React Router

* **Backend / Services**

  * TMDB API (movie data)
  * Supabase (auth + database)

---

## 📁 Project Structure

```bash
src/
├── router/
├── layout/
├── features/
│   ├── home/
│   ├── movies/
│   ├── favorites/
│   ├── auth/
│   └── profile/
├── shared/
└── main.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/moviesdb.git
cd moviesdb
```

Install dependencies:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

---

## ▶️ Run the project

```bash
npm run dev
```

---

## 🧪 Testing

(If you add tests later)

```bash
npm run test
```

---

## 🌐 Deployment

The project can be deployed using:

* Vercel
* Netlify
* GitHub Pages

---

## 📌 Future Improvements

* Global movie ranking (average user ratings)
* User statistics (favorites count, top rated)
* Better search UX (debounce, suggestions)
* Pagination / infinite scroll
* Dark/light theme toggle

---

## 👨‍💻 Author

Developed by **Eduard Goma**

---

## 📄 License

This project is for educational purposes.
