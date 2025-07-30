#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up ADmyBRAND Insights Dashboard...\n')

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
}

function log(message, color = 'blue') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function error(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`)
}

function success(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`)
}

function info(message) {
  console.log(`${colors.yellow}ℹ️  ${message}${colors.reset}`)
}

try {
  // Check if Node.js is installed
  const nodeVersion = process.version
  log(`Node.js version: ${nodeVersion}`, 'green')

  // Install root dependencies
  log('Installing root dependencies...')
  execSync('npm install', { stdio: 'inherit' })
  success('Root dependencies installed')

  // Install frontend dependencies
  log('Installing frontend dependencies...')
  execSync('cd frontend && npm install', { stdio: 'inherit' })
  success('Frontend dependencies installed')

  // Install backend dependencies
  log('Installing backend dependencies...')
  execSync('cd backend && npm install', { stdio: 'inherit' })
  success('Backend dependencies installed')

  // Create backend .env file if it doesn't exist
  const envPath = path.join(__dirname, 'backend', '.env')
  if (!fs.existsSync(envPath)) {
    log('Creating backend environment file...')
    const envContent = `MONGODB_URI=mongodb+srv://ram:WYAjJEcc2XHOpUCP@cluster9.mcwe12p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster9
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production`
    
    fs.writeFileSync(envPath, envContent)
    success('Environment file created')
  } else {
    info('Environment file already exists')
  }

  // Create temp directory for exports
  const tempDir = path.join(__dirname, 'backend', 'temp')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
    success('Temp directory created for exports')
  }

  console.log('\n🎉 Setup completed successfully!')
  console.log('\n📋 Next steps:')
  console.log('1. Start the development servers:')
  console.log('   npm run dev')
  console.log('\n2. Access the application:')
  console.log('   Frontend: http://localhost:3000')
  console.log('   Backend API: http://localhost:5000')
  console.log('\n3. Check API health:')
  console.log('   http://localhost:5000/api/health')
  console.log('\n📚 For more information, see README.md')

} catch (err) {
  error('Setup failed: ' + err.message)
  console.log('\nPlease try running the setup manually:')
  console.log('1. npm install')
  console.log('2. cd frontend && npm install')
  console.log('3. cd ../backend && npm install')
  console.log('4. Create backend/.env file with your MongoDB URI')
  process.exit(1)
} 