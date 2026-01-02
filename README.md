# Challan Generation System

A comprehensive web application designed for universities to streamline student fee challan generation and email communication processes. The system provides both bulk upload capabilities via CSV files and manual entry options, with automated email delivery through n8n integration.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup and login with JWT-based authentication
- **Bulk Upload**: Import multiple student records simultaneously using CSV files
- **Manual Entry**: Add individual student information through user-friendly forms
- **Email Monitoring**: Track and monitor email delivery status for all communications
- **Automated Challan Generation**: Auto-generate unique challan numbers for each entry
- **n8n Integration**: Seamless workflow automation for email processing

### User Interface
- **Responsive Design**: Modern, mobile-friendly interface built with React and TailwindCSS
- **Intuitive Dashboard**: Clean navigation with three main modules
- **Real-time Notifications**: Toast notifications for user feedback
- **Secure Access**: Protected routes with authentication checks

### Backend Capabilities
- **RESTful API**: FastAPI-powered backend with comprehensive endpoints
- **Database Integration**: MongoDB for user data and session management
- **File Processing**: CSV file upload and processing capabilities
- **Webhook Integration**: Direct integration with n8n automation platform

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB with Motor (async driver)
- **Authentication**: JWT tokens with python-jose
- **Password Hashing**: bcrypt
- **File Upload**: python-multipart
- **HTTP Client**: requests for webhook integration
- **ASGI Server**: Uvicorn

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: TailwindCSS 4.x
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **CAPTCHA**: Google reCAPTCHA
- **Build Tool**: Vite

### DevOps & Tools
- **Package Management**: uv (Python), npm (Node.js)
- **Environment**: python-dotenv
- **Linting**: ESLint
- **Version Control**: Git

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Python 3.12+**
- **Node.js 18+** and npm
- **MongoDB** (local or cloud instance)
- **Git**

### Environment Variables

Create a `.env` file in the `challan_gen_backend` directory with:

```env
MONGO_URL=mongodb://localhost:27017  # or your MongoDB connection string
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd challan-generation-system
```

### 2. Backend Setup

```bash
cd challan_gen_backend

# Install dependencies using uv
uv sync

# Or using pip (if uv not available)
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd challan_generation

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📖 Usage

### 1. Access the Application

Open your browser and navigate to `http://localhost:5173`

### 2. User Registration

- Click on "Sign Up" to create a new account
- Fill in your details and complete the registration process

### 3. Login

- Use your registered credentials to log in
- Upon successful login, you'll be redirected to the dashboard

### 4. Dashboard Overview

The dashboard provides access to three main modules:

#### Bulk Upload
- Upload CSV files containing multiple student records
- The system processes the file and sends data to the n8n webhook
- Supports fields: student_name, roll_number, class_name, email, expiry_date

#### Manual Entry
- Add individual student information manually
- Auto-generates unique challan numbers
- Sends data directly to the n8n webhook for processing

#### Email Monitor
- View the status of sent emails
- Monitor delivery confirmations
- Track communication history

## 🔌 API Endpoints

### Authentication Endpoints
```
POST /auth/signup
POST /auth/login
```

### Challan Generation Endpoints
```
POST /api/send-csv          # Bulk upload CSV files
POST /api/manual-entry      # Manual student entry
```

### General
```
GET /                       # API health check
```

### Request/Response Examples

#### Manual Entry
```json
// Request
{
  "student_name": "John Doe",
  "roll_number": "CS2021001",
  "class_name": "Computer Science",
  "email": "john.doe@university.edu",
  "expiry_date": "2024-12-31"
}

// Response
{
  "status": "Manual student data sent successfully",
  "challan_no": "A1B2C3D4",
  "n8n_response": "..."
}
```

#### CSV Upload
```json
// Response
{
  "status": "CSV data sent to n8n webhook",
  "n8n_response": "..."
}
```

## 📁 Project Structure

```
challan-generation-system/
├── challan_gen_backend/          # Backend application
│   ├── main.py                   # FastAPI application entry point
│   ├── pyproject.toml            # Python dependencies and config
│   ├── uv.lock                   # Dependency lock file
│   ├── Configs/
│   │   ├── db.py                 # MongoDB connection setup
│   │   └── utils.py              # Authentication utilities
│   ├── Routes/
│   │   ├── user_routes.py        # Authentication endpoints
│   │   ├── csv_email_router.py   # CSV upload endpoints
│   │   └── manual_route.py       # Manual entry endpoints
│   └── Schemas/
│       └── schemas.py            # Pydantic models
├── challan_generation/           # Frontend application
│   ├── package.json              # Node.js dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── index.html                # HTML template
│   ├── src/
│   │   ├── App.jsx               # Main React component
│   │   ├── main.jsx              # React entry point
│   │   ├── api/
│   │   │   ├── auth.js           # Authentication API calls
│   │   │   └── axiosClient.js    # Axios configuration
│   │   ├── Components/           # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   └── Dashboard.jsx
│   │   └── pages/                # Page components
│   │       ├── BulkUpload.jsx
│   │       ├── ManualEntry.jsx
│   │       └── EmailMonitor.jsx
│   └── public/                   # Static assets
└── README.md                     # Project documentation
```

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd challan_gen_backend
python -m pytest

# Frontend tests
cd challan_generation
npm test
```

### Building for Production

#### Backend
```bash
cd challan_gen_backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd challan_generation
npm run build
npm run preview
```

### Environment Setup

1. **Development Environment**
   - Use `npm run dev` for frontend hot reloading
   - Use `uvicorn main:app --reload` for backend auto-restart

2. **Production Environment**
   - Build frontend with `npm run build`
   - Serve static files through a web server
   - Run backend with production ASGI server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow PEP 8 for Python code
- Use ESLint configuration for JavaScript/React
- Maintain consistent naming conventions
- Add comments for complex logic

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 🔄 Future Enhancements

- [ ] Email template customization
- [ ] Advanced reporting and analytics
- [ ] Integration with university ERP systems
- [ ] Mobile application development
- [ ] Multi-language support
- [ ] Advanced user role management

---

**Built with ❤️ for educational institutions**
