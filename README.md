# WanderWise

An intelligent **travel assistant application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), integrating **Google Maps API** and **web scraping** to provide a seamless travel planning experience.

## 🚀 Features

- **Interactive Map Integration:** Navigate and explore locations using Google Maps API.
- **Dynamic Travel Routes:** Supports different travel modes (Plane, Bus, etc.).
- **Real-Time Data Fetching:** Fetch live data and travel details.
- **User-Friendly Interface:** Built with React and Flowbite-React for responsive UI.
- **Secure Backend:** Node.js and Express with CORS and Proxy Middleware enabled.
- **Data Management:** MongoDB for scalable and efficient data storage.

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Flowbite-React, React-Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs:** Google Maps API, Web Scraping APIs
- **Deployment:** TBD

## 📂 Project Structure

```
WanderWise/
├── backend/              # Backend services (Node.js, Express.js)
│   ├── controllers/      # API controllers
│   ├── db/              # Database connection
│   ├── emailService/     # Email handling services
│   ├── error/            # Error handling modules
│   ├── middleware/       # Custom middlewares
│   ├── models/           # Database models (MongoDB)
│   ├── routes/           # API routes
│   ├── scripts/          # Scripts and utilities
│   ├── .env             # Environment variables
│   ├── app.js           # Entry point for backend
│
├── client/              # Frontend application (React + Vite)
│   ├── public/           # Public assets
│   │   ├── index.html    # Main HTML file
│   ├── src/
│   │   ├── assets/       # Static assets (images, icons)
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── services/     # API service handlers
│   │   ├── utils/        # Utility functions
│   │   ├── App.tsx       # Main application file
│   │   ├── main.tsx      # Entry point for Vite
│
├── .env                 # Environment variables
├── .gitignore           # Ignored files for Git
├── README.md            # Project documentation
├── package.json         # Project dependencies
├── package-lock.json    # Locked dependency tree
└── vite.config.ts       # Vite configuration file
```

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/WanderWise-Co/WanderWise.git
   ```
2. Install dependencies:
   ```bash
   cd WanderWise
   cd client
   npm i
   cd ..
   cd backend
   npm i
   ```
3. Start the development client:
   ```bash
   npm run dev
   ```
4. Start the development backend:
   ```bash
   npx nodemon
   ```

## 🌍 Environment Variables

Ensure the following environment variables are configured:

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key
NODE_ENV=development
MONGO_URI=your_mongodb_uri
```

## 📚 Usage

1. Enter your source and destination points.
2. Select your travel mode (Bus or Plane).
3. View routes and travel details dynamically.

## 🤝 Contributors

- **Bharath R Sindhe** _(Lead Developer)_
- **Abhiram H R**
- **Charan G S**
- **Aravind SK**

## 🏆 Achievements

- **2nd Place** at Project Open House Panorama 2024-25.

## 📜 License

This project is licensed under the **MIT License**.

## 📞 Contact

For inquiries or collaboration:

- **Email:** your.email@example.com
- **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/your-profile)

**Happy Exploring with WanderWise! ✈️🗺️**
