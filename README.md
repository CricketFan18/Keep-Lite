# Keep-Lite

A blazing-fast, lightweight note-taking application built with the MERN stack. 

Keep-Lite is designed for speed and efficiency, focusing on a seamless user experience with instant load times, optimistic UI updates, and robust data-loss prevention.

## Features

* **Secure Authentication:** JWT-based HTTP-only cookie authentication for secure login/registration.
* **Instant Load Times:** Utilizes Stale-While-Revalidate (SWR) caching via `localStorage` to render notes in 0ms.
* **Optimistic UI:** Creates, edits, and deletions are reflected instantly on the screen without waiting for server round-trips.
* **Smart Synchronization:** Warns users and prevents accidental tab closures if data is currently saving to the cloud.
* **Infinite Scaling:** Implemented backend pagination and database indexing to handle thousands of notes without performance degradation.
* **Color Customization:** Color-code your notes for better visual organization.

## Performance Optimizations

This project was built with a strong emphasis on frontend and backend performance:

1. **O(1) Perceived Latency:** By implementing optimistic state updates, the UI reacts immediately to user input while the React app syncs with the Node.js server in the background.
2. **SWR Caching Strategy:** The app caches the first page of user notes locally. On subsequent visits, notes are injected from the cache instantly, bypassing the initial loading spinner, while fresh data is silently fetched and swapped in.
3. **Optimized Network Payloads:** Replaced global re-fetches with targeted state mutations. Modifying a single note no longer requires downloading the entire dataset again.
4. **Database Indexing:** The MongoDB `Note` schema utilizes a `userID` index, drastically reducing query scan times from O(n) to O(1) for user-specific data.
5. **Lightweight Auth Verification:** Protected routes use a dedicated, ultra-fast `/verify` endpoint to check token validity instead of querying the main database, saving bandwidth and server compute.

## Tech Stack

* **Frontend:** React.js, React Router DOM, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Security & Auth:** JSON Web Tokens (JWT), Bcrypt, Cookie-Parser, Zod (Validation)

## 💻 Getting Started

### Prerequisites
- Node.js installed on your local machine
- A MongoDB URI (local or MongoDB Atlas)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/CricketFan18/keep-lite.git
```

2. **Install Backend Dependencies:**

```bash
cd server
npm install
```

3. **Install Frontend Dependencies:**

```bash
cd client
npm install
```

4. **Environment Variables:**

Create a `.env` file in the `server` directory and add the following:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
DOTENV_CONFIG_QUIET=true
```

5. **Run the App:**

Open two terminal windows.

**Terminal 1 (Backend):**

```bash
cd server
npm start
```

**Terminal 2 (Frontend):**

```bash
cd client
npm run dev
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the issues page.