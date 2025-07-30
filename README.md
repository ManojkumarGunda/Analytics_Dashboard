# ADmyBRAND Insights - AI-Powered Analytics Dashboard

A modern, visually stunning analytics dashboard for digital marketing agencies built with React, Node.js, and MongoDB.

## 🚀 Features

### Dashboard Features
- **Overview Page** with key metrics cards (Revenue, Users, Conversions, Growth %)
- **Interactive Charts** - Line chart, Bar chart, Pie/Donut chart
- **Data Table** with sorting, filtering, and pagination
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### UI/UX Features
- **Modern Design System** - Consistent colors, typography, spacing
- **Beautiful Visual Hierarchy** - Clear information architecture
- **Smooth Animations** - Micro-interactions, hover effects, loading states
- **Dark/Light Mode Toggle** - Complete theme switching
- **Loading Skeletons** - Beautiful loading states

### Technical Features
- **Real-time Updates** - Simulated with intervals
- **Export Functionality** - PDF, CSV, Excel export
- **Advanced Filters** - Date ranges and custom filters
- **Component Architecture** - Reusable components

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Chakra UI** - Modern component library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Recharts** - Beautiful charts and graphs
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** with Express
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Helmet** - Security headers
- **Morgan** - Logging
- **Rate Limiting** - API protection

### Export Features
- **PDFKit** - PDF generation
- **ExcelJS** - Excel export
- **CSV Writer** - CSV export

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admybrand-insights-dashboard
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb+srv://ram:WYAjJEcc2XHOpUCP@cluster9.mcwe12p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster9
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the development servers**
   ```bash
   # From root directory
   npm run dev
   
   # Or start separately:
   # Frontend (port 3000)
   npm run dev:frontend
   
   # Backend (port 5000)
   npm run dev:backend
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📊 Data & Testing

### Dummy Data Usage
This application uses **dummy/mock data** for demonstration purposes. All analytics, reports, and dashboard metrics are generated dynamically to simulate real-world scenarios:

- **Analytics Data**: Revenue trends, user metrics, conversion rates
- **Traffic Sources**: Organic search, direct traffic, social media, referrals, email
- **Geographic Data**: User distribution across countries
- **Device Analytics**: Desktop, mobile, tablet usage statistics
- **Report Generation**: PDF, CSV, Excel exports with realistic sample data

### Data Features
- **Dynamic Generation**: Data updates every minute to simulate real-time analytics
- **Realistic Values**: Traffic numbers, revenue figures, and percentages reflect typical business metrics
- **Filter Support**: All data responds to date ranges, metrics, and grouping filters
- **Export Ready**: Generated reports contain formatted dummy data for testing

### Testing the Application
You can test all features without any real data:
- Apply filters and see data changes
- Generate reports in different formats
- Export analytics data
- Test responsive design across devices
- Explore all dashboard sections

## 🏗️ Project Structure

```
project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── charts/       # Chart components (Revenue, Traffic, Conversion)
│   │   │   ├── Layout.jsx    # Main layout component
│   │   │   ├── Sidebar.jsx   # Navigation sidebar
│   │   │   ├── MetricCard.jsx # Metric display cards
│   │   │   └── LoadingSkeleton.jsx # Loading states
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx # Main dashboard page
│   │   │   ├── Analytics.jsx # Analytics page with filters
│   │   │   ├── Reports.jsx   # Reports generation page
│   │   │   └── Settings.jsx  # User settings page
│   │   ├── services/         # API services
│   │   │   └── api.js        # API client functions
│   │   ├── theme.js          # Chakra UI theme configuration
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # App entry point
│   ├── index.html            # HTML template
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── backend/                  # Node.js backend application
│   ├── models/               # MongoDB models
│   │   ├── Analytics.js      # Analytics data model
│   │   └── Dashboard.js      # Dashboard data model
│   ├── routes/               # API routes
│   │   ├── analytics.js      # Analytics endpoints
│   │   ├── dashboard.js      # Dashboard endpoints
│   │   ├── reports.js        # Report generation endpoints
│   │   ├── settings.js       # Settings endpoints
│   │   └── export.js         # Export functionality
│   ├── server.js             # Express server setup
│   └── package.json          # Backend dependencies
├── package.json              # Root package.json with scripts
├── setup.js                  # Project setup script
└── README.md                 # Project documentation
```

## 🎯 Key Features

### Dashboard
- **Real-time Metrics**: Revenue, Users, Conversions, Growth tracking
- **Interactive Charts**: Line charts, bar charts, pie/donut charts
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Complete theme switching

### Analytics
- **Advanced Filtering**: Date ranges, metrics, grouping options
- **Real-time Updates**: Data refreshes automatically
- **Multiple Chart Types**: Performance trends, traffic sources, conversion funnels
- **Export Capabilities**: PDF, CSV, Excel reports

### Reports
- **Multiple Formats**: PDF, CSV, Excel generation
- **Customizable Reports**: Filter-based report generation
- **Download Functionality**: Direct file downloads
- **Real-time Data**: Fresh data for each report

### Settings
- **Profile Management**: User profile editing with localStorage
- **Photo Upload**: Profile picture management
- **Responsive Design**: Mobile-friendly settings interface

## 🔧 Development

### Available Scripts
```bash
# Root level scripts
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
npm run setup            # Run project setup

# Frontend scripts (from frontend directory)
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Backend scripts (from backend directory)
npm run dev              # Start development server
npm start                # Start production server
```

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/analytics` - Analytics data
- `POST /api/reports/generate` - Generate reports
- `GET /api/reports/download/:id` - Download reports
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the dist folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm install --production
npm start
# Deploy to your server or cloud platform
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature access with optimal layout
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Mobile-first design with simplified navigation

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: API protection
- **Input Validation**: Data sanitization
- **CORS Configuration**: Cross-origin resource sharing

## 📊 Performance

- **React Query**: Efficient data caching
- **Code Splitting**: Lazy loading of components
- **Optimized Builds**: Production-ready builds
- **CDN Ready**: Static asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using React, Node.js, and MongoDB**
