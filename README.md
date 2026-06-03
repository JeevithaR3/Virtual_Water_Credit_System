# Virtual Water Credit System

A comprehensive platform for trading virtual water credits with integrated payment gateway, transport management, and real-time monitoring.

## 🚀 Features

- **User Authentication**: Secure signup/login with bcrypt password hashing
- **Water Trading**: Buy and sell virtual water credits
- **Cart System**: Add items to cart and checkout
- **Order Management**: Track orders and manage transactions
- **Transport Integration**: Register and manage water transport providers
- **Rewards System**: Coupon and rewards management
- **Payment Gateway**: Razorpay integration for secure payments
- **Real-time Updates**: Live price monitoring and availability

## 📋 Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: bcryptjs for password hashing
- **Validation**: Express validators
- **API**: RESTful API with CORS support

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive styling
- **JavaScript (ES6+)** - Client-side logic
- **EJS** - Templating engine for dynamic pages

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and static file serving
- **MongoDB**: NoSQL database

## 🏗️ Architecture

```
Virtual Water Credit System
├── Backend (Node.js/Express)
│   ├── Authentication Routes
│   ├── Water Listing Routes
│   ├── Order Management
│   └── MongoDB Integration
├── Frontend (HTML/CSS/JS)
│   ├── User Pages (Login, Signup)
│   ├── Water Trading Pages (Buy, Sell)
│   ├── Cart & Checkout
│   └── Transport Management
└── Infrastructure
    ├── Docker Containers
    ├── Nginx Reverse Proxy
    └── MongoDB Database
```

## 📦 Installation

### Prerequisites
- Docker & Docker Compose installed
- Node.js 18+ (for local development)
- MongoDB (included in Docker setup)

### Quick Start with Docker

1. **Clone the repository**
```bash
git clone https://github.com/JeevithasHetty/Virtual_Water_Credit_System.git
cd Virtual_Water_Credit_System
```

2. **Create .env file**
```bash
cp .env.example .env
```

3. **Update environment variables** (optional)
Edit `.env` with your configuration

4. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

5. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost/api
- MongoDB: mongodb://localhost:27017

### Local Development Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start MongoDB locally**
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

3. **Set environment variables**
```bash
cp .env.example .env
# Edit .env with your local settings
```

4. **Start the server**
```bash
npm run dev  # for development with nodemon
npm start    # for production
```

5. **Open in browser**
```
http://localhost:5500
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB
MONGO_URI=mongodb://admin:password123@mongodb:27017/water-credit-db?authSource=admin

# Server
PORT=5500
NODE_ENV=production

# Frontend
FRONTEND_URL=http://localhost

# Payment Gateway
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Water Listings
- `GET /api/water/listings` - Get all available listings
- `POST /api/water/listings` - Create new listing
- `GET /api/water/listings/:id` - Get listing details
- `PUT /api/water/listings/:id` - Update listing

## 🐳 Docker Commands

### Build and run
```bash
docker-compose up -d
```

### Stop containers
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Clean up
```bash
docker-compose down -v  # Remove volumes too
```

## 📁 Project Structure

```
Virtual_Water_Credit_System/
├── models/
│   ├── User.js
│   └── WaterListing.js
├── routes/
│   ├── auth.js
│   └── water.js
├── public/
│   ├── main.html
│   ├── login.html
│   ├── buy.html
│   ├── sell.html
│   └── [other pages]
├── views/
│   ├── login.ejs
│   └── signup.ejs
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── README.md
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ CORS enabled for secure cross-origin requests
- ✅ Environment variables for sensitive data
- ✅ Input validation on both client and server
- ✅ Error handling middleware
- ✅ MongoDB connection with authentication

## 🚀 Performance Optimizations

- Gzip compression for static files
- Database indexing on frequently queried fields
- Nginx caching for static assets
- Connection pooling for MongoDB
- Async/await for non-blocking operations

## 🐛 Troubleshooting

### MongoDB connection failed
- Check if MongoDB container is running: `docker-compose ps`
- Verify credentials in .env file match docker-compose.yml
- Check MongoDB logs: `docker-compose logs mongodb`

### Backend not responding
- Verify backend container is running: `docker-compose ps`
- Check logs: `docker-compose logs backend`
- Ensure port 5500 is not in use

### CORS errors
- Backend CORS is enabled for all origins
- Check that API_URL in script.js matches your backend URL

## 📝 Development Workflow

1. Create a new branch for features
2. Make changes and test locally
3. Rebuild Docker containers: `docker-compose up -d --build`
4. Test all endpoints
5. Commit and push changes
6. Create a Pull Request

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License

## 📧 Support

For support, email support@aquashare.com or create an issue on GitHub.

## 🙏 Acknowledgments

- Razorpay for payment integration
- MongoDB for database
- Express.js community
- Docker for containerization
