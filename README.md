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

### Backend (.env)

```
PORT=your_port
MONGO_URI=your_mongodb_uri
EMAIL_PASSWORD=your_email_password
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_api_key
GEMENI_API_KEY=your_gemeni_api_key
PYSPARK_PYTHON=your_python_path
```

### Client (.env)

```
VITE_BASE_SERVER_URL=your_base_server_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_CLIENT_URL=your_facebook_client_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📚 Usage

1. **Plan Your Travel with Ease:** Enter your source and destination points.
2. **Flexible Travel Modes:** Choose between Bus or Plane options.
3. **Interactive Maps:** Visualize and explore travel routes dynamically.
4. **Real-Time Updates:** Stay informed with live data on travel details.
5. **Seamless User Experience:** Enjoy a smooth and intuitive interface for all your travel needs.

## 🤝 Contributors

- **Abhiram H R** - [LinkedIn](https://www.linkedin.com/in/abhiramhr1/)
- **Aravind SK** - [LinkedIn](https://www.linkedin.com/in/aravind-sk-6bab89255/)
- **Bharath R Sindhe** - [LinkedIn](https://www.linkedin.com/in/bharathsindhe03/)
- **Charan G S** - [LinkedIn](https://www.linkedin.com/in/charan-g-s-990a39255/)

**Happy Exploring with WanderWise! ✈️🗺️**
