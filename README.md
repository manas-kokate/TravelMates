🌍 TravelMates

TravelMates is a full-stack MERN social travel platform that helps travelers discover destinations, share travel experiences, and find compatible travel companions based on interests and locations.

The platform combines travel blogging, social networking, and real-time communication to make travel planning collaborative and engaging.

🚀 Features
👤 User Authentication

Secure signup/login

JWT-based authentication

Protected routes

📝 Travel Blogs & Reviews

Share travel experiences

Post reviews and photos

Explore stories from other travelers

🧭 Companion Finder

Discover travel companions

Filter by destination, interests, or preferences

🗺 Interactive Map

Location-based travel posts

Explore destinations using map integration

💬 Real-Time Chat

Instant messaging between matched travelers

Real-time updates using WebSockets

⭐ Community Driven

Ratings and recommendations

User-generated travel insights

🛠 Tech Stack
Frontend

React

Vite

Tailwind CSS

React Router

Axios

Backend

Node.js

Express.js

MongoDB

Mongoose

Authentication

JSON Web Tokens (JWT)

bcrypt

Real-Time Communication

Socket.io

APIs & Services

Google Maps API

Cloud image storage (Cloudinary)

📂 Project Structure
TravelMates
│
├── client
│   ├── components
│   ├── pages
│   ├── services
│   └── context
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── middleware
│
└── README.md
⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/travelmates.git
2️⃣ Install dependencies

Frontend

cd client
npm install

Backend

cd server
npm install
3️⃣ Setup Environment Variables

Create a .env file inside the server folder

Example:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API=your_api_key
4️⃣ Run the project

Backend

npm run dev

Frontend

npm run dev
🌐 Deployment

Frontend will be deployed on Netlify.

Backend can run on a Node server connected to MongoDB Atlas.

📌 Future Improvements

AI based travel recommendations

Smart companion matching algorithm

Travel itinerary planner

Push notifications

Mobile application version

🎯 Project Motivation

Many travelers struggle with:

Finding reliable travel companions

Discovering authentic travel experiences

Getting trusted recommendations

TravelMates solves this by building a social travel ecosystem where travelers connect, share, and explore together.

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a new branch

Commit your changes

Submit a pull request

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Manas Kokate

MCA Student | MERN Stack Developer

⭐ If you like this project, consider giving it a star!